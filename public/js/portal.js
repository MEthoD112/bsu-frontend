class Portal {
    constructor() {

    	this.buttonAddTag = document.getElementById('addtag');
    	this.buttonAddTag.addEventListener('click', () => {
    		document.getElementById('tag').style.display = 'block';
    	});

    	this.tagClose = document.getElementById('closetag');
    	this.tagWindow = document.getElementById('tag');
    	this.tagClose.addEventListener('click', () => {
			this.tagWindow.style.display = 'none';
		});

    	this.buttonTag = document.getElementById('tagbutton');
		this.buttonTag.addEventListener('click', () => {
			const promiseAddTag = new Promise((resolve, reject) => {

				const Tag = document.getElementById('tagvalue').value;

		        const inputtag = { tag: Tag };

		        const tags = articlesService.getTags();

			    const oReq = new XMLHttpRequest();

			    if (tags.indexOf(Tag) !== -1) {
		        	alert('This tag is also exist');
	        		return;
				}

		        oReq.open('POST', '/posttags');

		        oReq.addEventListener('load', () => {
		        	resolve(oReq.responseText);
                    
                });

		        // we should tell what kind of body we send
		        oReq.setRequestHeader('content-type', 'application/json');

		        // transform object to string
		        const tagString = JSON.stringify(inputtag);

		        // sent request body here as a string
		        oReq.send(tagString);

		    });
		    promiseAddTag.then(result => this.addTag(JSON.parse(result)));
		});

		this.addNewButton = document.getElementById('addnew');
		this.addNewButton.addEventListener('click', () => {
			this.newWindow.style.display = 'block';
		});
		this.newWindow = document.getElementById('new');
		this.newClose = document.getElementById('closenew');
		this.newClose.addEventListener('click', () => {
			this.newWindow.style.display = 'none';
		});

		this.buttonNew = document.getElementById('newbutton');
		this.buttonNew.addEventListener('click', () => {
			const promiseAddNew = new Promise((resolve, reject) => {
		        const id = document.getElementById('newid').value;
		        const title = document.getElementById('newtitle').value;
		        const summary = document.getElementById('newsummary').value;
		        const content = document.getElementById('newcontent').value;
		        const tags = document.getElementById('selecttags');

		        const article = {};
		        article.id = id;
		        article.title = title;
		        article.summary = summary;
		        article.content = content;
		        article.tags = domService.getSelection(tags);
		        article.createdAt = new Date();
		        article.author = user.user;

		        const oReq = new XMLHttpRequest();

		        if (!articlesService.validateArticle(article)) {
			        alert('your article is not valid');
			        return;
			    }

			    oReq.open('POST', '/articles');

			    oReq.addEventListener('load', () => {
		        	resolve(oReq.responseText);
                    
                });

		        // very important!!! we should tell what kind of body we send
		        oReq.setRequestHeader('content-type', 'application/json');

		        // transform object to string
		        const articleString = JSON.stringify(article);

		        // sent request body here as a string
		        oReq.send(articleString);
		        this.newWindow.style.display = 'none';
		    });
		    promiseAddNew.then(result => this.addNew(JSON.parse(result, (key, value) => {
                        if (key == 'createdAt') { return new Date(value); }
                        return value;
            })[0]));
		});

		this.applayAuthor = document.getElementById('applayauthor');
		this.applayAuthor.addEventListener('click', this.filterAuthor);

		this.applayTag = document.getElementById('applaytag');
		this.applayTag.addEventListener('click', this.filterTags);

		this.applayDate = document.getElementById('applaydate');
		this.applayDate.addEventListener('click', this.filterDate);

		this.articleId = document.getElementById('article');
		this.articleId.addEventListener('click', this.readNew);
		this.articleId.addEventListener('click', this.showEditNew);
		this.articleId.addEventListener('click', () => {
		    if (event.target.tagName !== 'BUTTON') {
		       return;
		    }
			const promiseDeleteNew = new Promise((resolve, reject) => {

			    const articleNodeToDelete = event.target.parentElement;
			    let idString = articleNodeToDelete.getAttribute('data-id');

			    const oReq = new XMLHttpRequest();

			    const idObj = { id: idString };

			    oReq.open('POST', '/deletearticle');

			    oReq.addEventListener('load', () => {
		        	resolve(oReq.responseText);
                    
                });

			    // very important!!! we should tell what kind of body we send
			    oReq.setRequestHeader('content-type', 'application/json');

			    // transform object to string
			    idString = JSON.stringify(idObj);

			    // sent request body here as a string
			    oReq.send(idString);
			});
			promiseDeleteNew.then(result => this.deleteNew(JSON.parse(result).id));
		});
		this.articleId.addEventListener('click', () => {
		    if (event.target.className !== 'ed') {
		       return;
		    }
			this.editWindow.style.display = 'block';
		});		

		this.editWindow = document.getElementById('editnew');
		this.closeEdit = document.getElementById('closeedit');
		this.closeEdit.addEventListener('click', () => {
			this.editWindow.style.display = 'none';
		});
		this.editButton = document.getElementById('editbutton');
		this.editButton.addEventListener('click', () => {
		    const editid = document.getElementById('editid');
		    const id = editid.value;
		    const edittitle = document.getElementById('edittitle');
		    const editsummary = document.getElementById('editsummary');
		    const editcontent = document.getElementById('editcontent');
		    const tagsForEdit = document.getElementById('tags-for-edit');
		    const selected = domService.getSelection(tagsForEdit);

		    const article = articlesService.getArticle(id);

		    if (!edittitle.value || !editsummary.value || !editcontent.value || selected.length < 1) {
		        alert('Unacceptable editions');
		        return;
		    }

		    article.title = edittitle.value;
		    article.summary = editsummary.value;
		    article.content = editcontent.value;
		    article.tags = selected;
		    const promiseEditNew = new Promise((resolve, reject) => {
			    const oReq = new XMLHttpRequest();

			    oReq.open('POST', '/editarticle');

			    oReq.addEventListener('load', () => {
		    		resolve(oReq.responseText);
                });

			    // very important!!! we should tell what kind of body we send
			    oReq.setRequestHeader('content-type', 'application/json');

			    // transform object to string
			    const articleString = JSON.stringify(article);

			    // sent request body here as a string
			    oReq.send(articleString);
			    this.editWindow.style.display = 'none';
			});
			promiseEditNew.then(result => this.editArticle(JSON.parse(result, (key, value) => {
                        if (key == 'createdAt') { return new Date(value); }
                        return value;
            })[0]));
		});

		this.pagination = document.getElementById('pagination');
		this.pagination.addEventListener('click', this.paginatNews);
    }
    paginatNews() {
	    domService.paginatNews();
	    domService.showUserItems(user.user);
	}

	addTag(tagsArray) {
	    const inputtag = tagsArray[tagsArray.length - 1];
	    const tags = articlesService.getTags();
	    const tagWindow = document.getElementById('tag');

	    tags.push(inputtag);

	    const option = document.createElement('option');
	    const option1 = document.createElement('option');
	    option.innerHTML = inputtag;
	    option1.innerHTML = inputtag;
	    domService.filtertag.appendChild(option);
	    domService.selecttags.appendChild(option1);
	    tagWindow.style.display = 'none';
	}

	addNew(article) {
	    const newsCount = document.querySelectorAll('li').length;

	    const articles = articlesService.addArticle(article);

	    if (newsCount < 10) {
	        domService.addNew(article);
	        domService.showUserItems(user.user);
	        domService.showFilterAuthor();
	        domService.showPaginationButton();
	    }

	    //if (newsCount === articlesService.getArticles().length - 1) {
	        domService.addNew(article);
	        domService.showUserItems(user.user);
	        domService.showFilterAuthor();
	        domService.showPaginationButton();
	    //}
	}

	deleteNew(id) {
	    domService.removeNew(id);
	    domService.showPaginationButton();
	}

	readNew() {
	    domService.readNew();
	}

	showEditNew() {
	    domService.showEditNew();
	}

	filterAuthor() {
	    const author = domService.getFilterAuthor();

	    if (author === 'No filter by author') {
	        domService.clearNews();
	        const articles = articlesService.getArticles(0, 10);
	        domService.displayNews(articles);
	        domService.showUserItems(user.user);
	        domService.showPaginationButton();
	        return;
	    }

	    const obj = {};
	    obj.author = author;
	    domService.clearNews();
	    const articles = articlesService.getArticles(0, null, obj);
	    domService.displayNews(articles);
	    domService.showUserItems(user.user);
	    domService.showPaginationButton(articles);
	}

	filterTags() {
	    const tags = domService.getFilterTags();

	    if (tags[0] === 'No filter') {
	        domService.clearNews();
	        const articles = articlesService.getArticles(0, 10);
	        domService.displayNews(articles);
	        domService.showUserItems(user.user);
	        domService.showPaginationButton();
	        return;
	    }

	    domService.clearNews();
	    const obj = {};
	    obj.tags = tags;
	    const articles = articlesService.getArticles(0, 10, obj);
	    domService.displayNews(articles);
	    domService.showUserItems(user.user);
	    domService.showPaginationButton(articles);
	}

	filterDate() {
	    const arr = domService.getFilterDates();

	    if (!arr[0] && !arr[1]) {
	        domService.clearNews();
	        const articles = articlesService.getArticles(0, 10);
	        domService.displayNews(articles);
	        domService.showUserItems(user.user);
	        domService.showPaginationButton();
	        return;
	    }

	    arr[0] = arr[0] || 0;
	    arr[1] = arr[1] || Date.parse(new Date());

	    domService.clearNews();
	    const articles = articlesService.sortArticlesByDate(arr[0], arr[1]);
	    domService.displayNews(articles);
	    domService.showUserItems(user.user);
	    domService.showPaginationButton(articles);
	}

	editArticle(article) {
	    domService.editNew(article);
	}

	initApp() {
	    const articles = articlesService.getArticles(0, 10);
	    domService.displayNews(articles);
	    domService.showPaginationButton();
	    domService.showFilterAuthor();
	    domService.showFilterTag();
	    domService.showUserItems(user.user);
	    domService.showPaginationButton();
	}
}