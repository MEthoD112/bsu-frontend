class User {
    constructor() {
    	const that = this;
    	
		let user = document.getElementById('signup').innerHTML;

		const oReq = new XMLHttpRequest();

		oReq.open('POST', '/login');

		oReq.addEventListener('load', () => {
                    if(oReq.status === 200 && user !== 'SignUp/SignIn') {
                    	that.user = user;
                    } else {
                    	that.user = null;
                    	user = 'SignUp/SignIn';
                    }
                });
		oReq.send();

		
	}
}