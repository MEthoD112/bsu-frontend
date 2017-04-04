const articlesService = (function () {
    let articles;
    let tags;

    document.addEventListener('DOMContentLoaded', () => {
        const oReq = new XMLHttpRequest();

        function cleanUp() {
            oReq.removeEventListener('load', handler);
        }

        function handler() {
            articles = JSON.parse(this.responseText, (key, value) => {
                if (key == 'createdAt') { return new Date(value); }
                return value;
            });

            cleanUp();
        }

        oReq.addEventListener('load', handler);
        oReq.open('GET', '/articles');
        oReq.send();
    });

    document.addEventListener('DOMContentLoaded', () => {
        const oReq = new XMLHttpRequest();

        function handler() {
            tags = JSON.parse(this.responseText);

            setTimeout(initApp, 30);

            cleanUp();
        }

        function cleanUp() {
            oReq.removeEventListener('load', handler);
        }

        oReq.addEventListener('load', handler);
        oReq.open('GET', '/tags');
        oReq.send();
    });

    function getArticles(skip, top, filterConfig) {
        skip = skip || 0;
        top = top || articles.length;
        let arr = [];

        articles.sort((a, b) => {
            if (a.createdAt > b.createdAt) { return 1; }
            if (a.createdAt < b.createdAt) { return -1; }
        });

        if (filterConfig) {

            if (filterConfig.author) {

                arr = articles.filter((item, i, arr) => {
                    return item.author === filterConfig.author;
                });

                return arr.splice(skip, top);
            }

            if (filterConfig.tags) {
                for (let j = 0; j < filterConfig.tags.length; j++) {

                    const arrNew = articles.filter((item) => {
                        return (item.tags.indexOf(filterConfig.tags[j]) !== -1 &&
                                                        arr.indexOf(item) === -1);
                    });

                    arr = arr.concat(arrNew);
                }
                return arr.splice(skip, top);
            }
        }
        return articles.slice(skip, top);
    }

    function getArticle(id) {
        let article;
        articles.forEach((item) => {
            if (item.id === id) {
                 article = item;
            }
        });
        return article;
    }

    function validateArticle(article) {
        if (!article) {
            return false;
        }

        if (articles.some((item) => { return item.id === article.id; })) {
            return false;
        }

        if (article.tags.every((item) => { return tags.indexOf(item) === -1; })) {
            return false;
        }

        if (typeof article.id === 'string' &&
            !isNaN(+article.id) &&
            article.id !== '' &&
            typeof article.title === 'string' &&
            typeof article.summary === 'string' &&
            typeof article.author === 'string' &&
            typeof article.content === 'string' &&
            (article.createdAt instanceof Date) &&
            (article.tags instanceof Array) &&
            article.tags.length >= 1) {

            return true;
        }
        return false;
    }

    function addArticle(article) {
        if (validateArticle(article)) {

            articles.push(article);
            return true;
        }
        return false;
    }

    function removeArticle(id) {
        articles.forEach((item, i) => {
            if (item.id === id) {

                articles.splice(i, 1);
                return true;
            }
        });
        return false;
    }

    function removeTag(tag, id) {
        if (tags.indexOf(tag) === -1) {
            throw new Error('Unacceptable tag');
        }

        const arc = getArticle(id);
        let bool = false;

        arc.tags.forEach((item, i) => {
            if (item === tag) {

                bool = true;
                arc.tags.splice(i, 1);
            }
        });
        return bool;
    }

    function getAuthors() {
        const arr = [];

        articles.forEach((item) => {

            if (arr.indexOf(item.author) === -1) {
                arr.push(item.author);
            }
        });
        return arr;
    }

    function getTags() {
        return tags;
    }

    function sortArticlesByDate(start, end) {
        const articles = getArticles();
        const arr = [];

        articles.map((item) => {
            if (start <= item.createdAt && end >= item.createdAt) {
                return arr.push(item);
            }
        });
        return arr;
    }

    return {
        getArticles: getArticles,
        getArticle: getArticle,
        validateArticle: validateArticle,
        addArticle: addArticle,
        editArticle: editArticle,
        removeArticle: removeArticle,
        addTag: addTag,
        removeTag: removeTag,
        getAuthors: getAuthors,
        getTags: getTags,
        sortArticlesByDate: sortArticlesByDate
    };
}());

const domService = (function () {

    const ul = document.getElementById('article');
    const signup = document.getElementById('signup');
    const addnew = document.getElementById('addnew');
    const addtag = document.getElementById('addtag');
    const filterauthor = document.getElementById('filterauthor');
    const filtertag = document.getElementById('filtertag');
    const selecttags = document.getElementById('selecttags');
    const startdate = document.getElementById('startdate');
    const enddate = document.getElementById('enddate');
    const editid = document.getElementById('editid');
    const edittitle = document.getElementById('edittitle');
    const editsummary = document.getElementById('editsummary');
    const editcontent = document.getElementById('editcontent');
    const tagsForEdit = document.getElementById('tags-for-edit');
    let articlesForPage = 20;

    function displayNews(articles) {

        for (let i = 0; i < articles.length; i++) {

            const li = document.createElement('li');
            const h2 = document.createElement('h2');
            const p = document.createElement('p');
            const span = document.createElement('span');
            const span1 = span.cloneNode(true);
            const span2 = span.cloneNode(true);
            const a = document.createElement('a');
            const a1 = a.cloneNode(true);
            const button = document.createElement('button');

            li.setAttribute('data-id', articles[i].id);
            h2.innerHTML = articles[i].title;
            p.innerHTML = articles[i].summary;
            span.innerHTML = articles[i].createdAt.toDateString();
            span1.innerHTML = articles[i].author;
            span2.innerHTML = articles[i].tags;
            a.innerHTML = 'Read';
            a.href = '#readnew';
            a1.setAttribute('class', 'edit ed');

            a1.innerHTML = 'Edit';
            a1.href = '#editnew';
            button.setAttribute('class', 'delete del');

            button.innerHTML = 'Delete';

            li.appendChild(h2);
            li.appendChild(p);
            li.appendChild(span);
            li.appendChild(span1);
            li.appendChild(span2);
            li.appendChild(a);
            li.appendChild(a1);
            li.appendChild(button);
            ul.appendChild(li);
        }
    }

    function addNew(article) {
            const li = document.createElement('li');
            const h2 = document.createElement('h2');
            const p = document.createElement('p');
            const span = document.createElement('span');
            const span1 = span.cloneNode(true);
            const span2 = span.cloneNode(true);
            const a = document.createElement('a');
            const a1 = a.cloneNode(true);
            const button = document.createElement('button');

            li.setAttribute('data-id', article.id);
            h2.innerHTML = article.title;
            p.innerHTML = article.summary;
            span.innerHTML = article.createdAt.toDateString();
            span1.innerHTML = article.author;
            span2.innerHTML = article.tags;

            a.innerHTML = 'Read';
            a.href = '#readnew';
            a1.setAttribute('class', 'ed');
            a1.innerHTML = 'Edit';
            a1.href = '#editnew';

            button.setAttribute('class', 'del');
            button.innerHTML = 'Delete';

            li.appendChild(h2);
            li.appendChild(p);
            li.appendChild(span);
            li.appendChild(span1);
            li.appendChild(span2);
            li.appendChild(a);
            li.appendChild(a1);
            li.appendChild(button);
            ul.appendChild(li);
    }

    function removeNew() {
        if (event.target.tagName !== 'BUTTON') {
           return;
        }

        const articleNodeToDelete = event.target.parentElement;
        const idString = articleNodeToDelete.getAttribute('data-id');

        articlesService.removeArticle(idString);
        ul.removeChild(articleNodeToDelete);
    }

    function readNew() {
        if (event.target.innerHTML !== 'Read') {
           return;
        }
        const articleNode = event.target.parentElement;
        const id = articleNode.getAttribute('data-id');

        const article = articlesService.getArticle(id);

        const h2 = document.getElementsByClassName('readtitle')[0];
        const p = document.getElementsByClassName('readcontent')[0];
        const author = document.getElementsByClassName('newauthor')[0];
        const date = document.getElementsByClassName('newdate')[0];
        const tags = document.getElementsByClassName('newtags')[0];

        h2.innerHTML = article.title;
        p.innerHTML = article.content;
        author.innerHTML = article.author;
        date.innerHTML = article.createdAt;
        tags.innerHTML = article.tags.join(',');
    }

    function showEditNew() {
        if (event.target.innerHTML !== 'Edit') {
           return;
        }

        const articleNode = event.target.parentElement;
        const id = articleNode.getAttribute('data-id');
        const article = articlesService.getArticle(id);

        const tags = articlesService.getTags();

        const selected = tagsForEdit.querySelectorAll('option');

        for (let i = 0; i < selected.length; i++) {
            tagsForEdit.removeChild(selected[i]);
        }

        for (let i = 0; i < tags.length; i++) {
            const option = document.createElement('option');
            option.innerHTML = tags[i];

            if (article.tags.indexOf(tags[i]) !== -1) {
                option.setAttribute('selected', 'selected');
            }

            tagsForEdit.appendChild(option);
        }

        editid.value = article.id;
        edittitle.value = article.title;
        editsummary.value = article.summary;
        editcontent.value = article.content;
    }

    function editNew() {
        const id = editid.value;
        const article = articlesService.getArticle(id);

        const li = ul.getElementsByTagName('li');
        const selected = getSelection(tagsForEdit);

        if (!edittitle.value || !editsummary.value || !editcontent.value || selected.length < 1) {
            alert('Unacceptable editions');
            return;
        }

        for (let i = 0; i < li.length; i++) {
            if (li[i].getAttribute('data-id') === id) {

                const h2 = li[i].getElementsByTagName('h2')[0];
                const p = li[i].getElementsByTagName('p')[0];
                const span = li[i].getElementsByTagName('span')[2];
                h2.innerHTML = edittitle.value;
                p.innerHTML = editcontent.value;
                span.innerHTML = selected.join(',');

                article.title = edittitle.value;
                article.summary = editsummary.value;
                article.content = editcontent.value;
                article.tags = selected;
            }
        }
    }

    function showUserItems(user) {
        const edit = ul.getElementsByClassName('ed');
        const del = ul.getElementsByClassName('del');

        let newEdit = Array.prototype.slice.call(edit);
        let newDel = Array.prototype.slice.call(del);

        if (user) {

            signup.innerHTML = user;
            addnew.style.display = 'inline-block';
            addtag.style.display = 'inline-block';

            for (let i = 0; i < newEdit.length; i++) {
                newEdit[i].classList.remove('edit');
            }

            for (let j = 0; j < newDel.length; j++) {
                newDel[j].classList.remove('delete');
            }
        }

        if (!user) {
            newEdit = newEdit || [];
            newDel = newDel || [];
            signup.innerHTML = 'SignUp';
            addnew.style.display = 'none';
            addtag.style.display = 'none';

            for (let i = 0; i < newEdit.length; i++) {
                newEdit[i].classList.add('edit');
            }

            for (let j = 0; j < newDel.length; j++) {
                newDel[j].classList.add('delete');
            }
        }
    }

    function showFilterAuthor() {
        const opt = filterauthor.getElementsByTagName('option');
        const newOpt = Array.prototype.slice.call(opt);

        for (let i = 1; i < newOpt.length; i++) {
            filterauthor.removeChild(newOpt[i]);
        }

        const arr = articlesService.getAuthors();

        for (let i = 0; i < arr.length; i++) {
            const option = document.createElement('option');
            option.innerHTML = arr[i];
            filterauthor.appendChild(option);
        }
    }

    function showFilterTag() {
        const arr = articlesService.getTags();

        for (let i = 0; i < arr.length; i++) {
            const option = document.createElement('option');
            option.innerHTML = arr[i];
            filtertag.appendChild(option);
        }

        for (let i = 0; i < arr.length; i++) {
            const option = document.createElement('option');
            option.innerHTML = arr[i];
            selecttags.appendChild(option);
        }
    }

    function getFilterAuthor() {
        const selectedAuthor = filterauthor.value;
        articlesForPage = 20;
        return selectedAuthor;
    }

    function getFilterTags() {
        const tags = getSelection(filtertag);
        articlesForPage = 20;
        return tags;
    }

    function getFilterDates() {
        const start = startdate.value;
        const end = enddate.value;

        const arr = [];
        arr[0] = Date.parse(start);
        arr[1] = Date.parse(end);

        articlesForPage = 20;

        return arr;
    }

    function clearNews() {
        const li = ul.getElementsByTagName('li');
        const newLi = Array.prototype.slice.call(li);

        for (let i = 0; i < newLi.length; i++) {
            ul.removeChild(newLi[i]);
        }
    }

    function getSelection(o) {
        if (!o.options) return [];

        const selectedOptions = [];

        for (let i = 0; i < o.options.length; i++) {

            if (o.options[i].selected) {
                selectedOptions.push(o.options[i].value);
            }
        }
        return selectedOptions;
    }

    function showPaginationButton(articles) {
        const newsCount = document.getElementById('article').querySelectorAll('li').length;
        const pagin = document.getElementById('pagination');

        articles = articles || articlesService.getArticles();

        (newsCount === articles.length) ? pagin.classList.add('pagination-view') :
                                       pagin.classList.remove('pagination-view');   
    }

    function paginatNews() {
        const newsCount = document.getElementById('article').querySelectorAll('li').length;
        const articles = articlesService.getArticles();

        displayNews(articlesService.getArticles(newsCount, articlesForPage));

        articlesForPage += 10;

        showPaginationButton();
    }

    return {
        displayNews: displayNews,
        addNew: addNew,
        removeNew: removeNew,
        editNew: editNew,
        showUserItems: showUserItems,
        showFilterAuthor: showFilterAuthor,
        showFilterTag: showFilterTag,
        getFilterAuthor: getFilterAuthor,
        clearNews: clearNews,
        getSelection: getSelection,
        getFilterTags: getFilterTags,
        getFilterDates: getFilterDates,
        readNew: readNew,
        showEditNew: showEditNew,
        showPaginationButton: showPaginationButton,
        paginatNews: paginatNews
    };
}());

'use strict';
let user = 'Vasya Pupkin';

const button = document.getElementById('signbutton');
button.addEventListener('click', signUser);

const buttonsignout = document.getElementById('signoutbutton');
buttonsignout.addEventListener("click", signOut);

const buttontag = document.getElementById('tagbutton');
buttontag.addEventListener('click', addTag);
buttontag.addEventListener('click', () => {
        const inputtag = { tag: document.getElementById('tagvalue').value };

        const oReq = new XMLHttpRequest();

        oReq.open('POST', '/posttags');

        // very important!!! we should tell what kind of body we send
        oReq.setRequestHeader('content-type', 'application/json');

        // transform object to string
        const tagString = JSON.stringify(inputtag);

        // sent request body here as a string
        oReq.send(tagString);

    });

const buttonnew = document.getElementById('newbutton');
buttonnew.addEventListener('click', addNew);
buttonnew.addEventListener('click', () => {
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
        article.author = user;

        const oReq = new XMLHttpRequest();

        oReq.open('POST', '/articles');

        // very important!!! we should tell what kind of body we send
        oReq.setRequestHeader('content-type', 'application/json');

        // transform object to string
        const articleString = JSON.stringify(article);

        // sent request body here as a string
        oReq.send(articleString);

    });

const applayauthor = document.getElementById('applayauthor');
applayauthor.addEventListener('click', filterAuthor);

const applaytag = document.getElementById('applaytag');
applaytag.addEventListener('click', filterTags);

const applaydate = document.getElementById('applaydate');
applaydate.addEventListener('click', filterDate);

const articleId = document.getElementById('article');

articleId.addEventListener('click', deleteNew);
articleId.addEventListener('click', readNew);
articleId.addEventListener('click', showEditNew);
articleId.addEventListener('click', () => {
    if (event.target.tagName !== 'BUTTON') {
       return;
    }
    const articleNodeToDelete = event.target.parentElement;
    let idString = articleNodeToDelete.getAttribute('data-id');

    const oReq = new XMLHttpRequest();

    const idObj = { id: idString };
    oReq.open('POST', '/deletearticle');

    // very important!!! we should tell what kind of body we send
    oReq.setRequestHeader('content-type', 'application/json');

    // transform object to string
    idString = JSON.stringify(idObj);

    // sent request body here as a string
    oReq.send(idString);

    });

const editbutton = document.getElementById('editbutton');
editbutton.addEventListener('click', editArticle);

editbutton.addEventListener('click', () => {
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

        const oReq = new XMLHttpRequest();

        oReq.open('POST', '/editarticle');

        // very important!!! we should tell what kind of body we send
        oReq.setRequestHeader('content-type', 'application/json');

        // transform object to string
        const articleString = JSON.stringify(article);

        // sent request body here as a string
        oReq.send(articleString);

});

function paginatNews() {
    domService.paginatNews();
    domService.showUserItems(user);
}

const pagination = document.getElementById('pagination');
pagination.addEventListener('click', paginatNews);

function signUser() {
    const inputname = document.getElementById('sign');
    user = inputname.value;
    domService.showUserItems(user);
}

function signOut() {
    user = null;
    domService.showUserItems(user);
}

function displayNews(skip, top) {
    const articles = articlesService.getArticles(skip, top);
    domService.displayNews(articles);
    domService.showPaginationButton();
}

function addTag() {
    const inputtag = document.getElementById('tagvalue');
    const tags = articlesService.getTags();

    if (tags.indexOf(inputtag.value) !== -1) {
        alert('This tag is also exist');
        return;
    }

    tags.push(inputtag.value);
    alert('Tag adds succesfully');

    const filtertag = document.getElementById('filtertag');
    const selecttags = document.getElementById('selecttags');

    const option = document.createElement('option');
    const option1 = document.createElement('option');
    option.innerHTML = inputtag.value;
    option1.innerHTML = inputtag.value;
    filtertag.appendChild(option);
    selecttags.appendChild(option1);
}

function addNew() {
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
    article.author = user;

    const newsCount = document.querySelectorAll('li').length;

    if (articlesService.validateArticle(article)) {
        articlesService.addArticle(article);
    } else {
        alert('your article is not valid');
        return;
    }

    if (newsCount < 10) {
        domService.addNew(article);
        domService.showUserItems(user);
        domService.showFilterAuthor();
        domService.showPaginationButton();
    }

    if (newsCount === articlesService.getArticles().length - 1) {
        domService.addNew(article);
        domService.showUserItems(user);
        domService.showFilterAuthor();
        domService.showPaginationButton();
    }
}

function deleteNew() {
    domService.removeNew();
    domService.showPaginationButton();
}

function readNew() {
    domService.readNew();
}

function showEditNew() {
    domService.showEditNew();
}

function filterAuthor() {
    const author = domService.getFilterAuthor();

    if (author === 'No filter by author') {
        domService.clearNews();
        const articles = articlesService.getArticles(0, 10);
        domService.displayNews(articles);
        domService.showUserItems(user);
        domService.showPaginationButton();
        return;
    }

    const obj = {};
    obj.author = author;
    domService.clearNews();
    const articles = articlesService.getArticles(0, null, obj);
    domService.displayNews(articles);
    domService.showUserItems(user);
    domService.showPaginationButton(articles);
}

function filterTags() {
    const tags = domService.getFilterTags();

    if (tags[0] === 'No filter') {
        domService.clearNews();
        const articles = articlesService.getArticles(0, 10);
        domService.displayNews(articles);
        domService.showUserItems(user);
        domService.showPaginationButton();
        return;
    }

    domService.clearNews();
    const obj = {};
    obj.tags = tags;
    const articles = articlesService.getArticles(0, 10, obj);
    domService.displayNews(articles);
    domService.showUserItems(user);
    domService.showPaginationButton(articles);
}

function filterDate() {
    const arr = domService.getFilterDates();

    if (!arr[0] && !arr[1]) {
        domService.clearNews();
        const articles = articlesService.getArticles(0, 10);
        domService.displayNews(articles);
        domService.showUserItems(user);
        domService.showPaginationButton();
        return;
    }

    arr[0] = arr[0] || 0;
    arr[1] = arr[1] || Date.parse(new Date('2117-02-26T12:12:00'));

    domService.clearNews();
    const articles = articlesService.sortArticlesByDate(arr[0], arr[1]);
    domService.displayNews(articles);
    domService.showUserItems(user);
    domService.showPaginationButton(articles);
}

function editArticle() {
    domService.editNew();
}

function initApp() {
    displayNews(0, 10);
    domService.showFilterAuthor();
    domService.showFilterTag();
    domService.showUserItems(user);
    domService.showPaginationButton();
}
