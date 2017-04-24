class Images {
	constructor() {
		document.getElementById("newbutton").addEventListener('click', () => {
			const promiseImage = new Promise((resolve, reject) => {
				const oReq = new XMLHttpRequest();

				oReq.open('POST', '/addfoto');

				oReq.addEventListener('load', () => {
					resolve(oReq.responseText);
					
				});

				oReq.setRequestHeader('content-type', 'application/json');

				const file = document.getElementById('image').files[0];

				const img = document.createElement("img");
				img.width = 370;
				img.height = 200;

				const reader = new FileReader();
				reader.onload = function(event) {
					img.src = event.target.result;
					const link = event.target.result;
					const idString = document.getElementById('newid').value;

					const dataurl = { image : link, id : idString };

					articlesService.images.push(dataurl);

			  		const string = JSON.stringify(dataurl);

					oReq.send(string);
				}
				file ? reader.readAsDataURL(file) : file;
			});
		});

		document.getElementById("editbutton").addEventListener('click', () => {
			const promiseImage = new Promise((resolve, reject) => {
				const oReq = new XMLHttpRequest();

				oReq.open('PUT', '/editfoto');

				oReq.addEventListener('load', () => {
					oReq.responseText;
					
				});

				oReq.setRequestHeader('content-type', 'application/json');

				const file = document.getElementById('imageforedit').files[0];

				const editimage = document.createElement("img");
				editimage.width = 370;
				editimage.height = 200;

				const reader = new FileReader();
				reader.onload = function(event) {
					editimage.src = event.target.result;
					const link = event.target.result;
					const idString = document.getElementById('editid').value;

					const dataurl = { image : link, id : idString };

					const articleImage = articlesService.getImage(idString);

					const index = articlesService.images.indexOf(articleImage);

					index >= 0 ? articlesService.images.splice(index, 1) : index;

					articlesService.images.push(dataurl);

			  		const string = JSON.stringify(dataurl);

					oReq.send(string);
				}
				file ? reader.readAsDataURL(file) : file;
			});
		});
	}
}
