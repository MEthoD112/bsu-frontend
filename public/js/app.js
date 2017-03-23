'use strict'

let articlesService = (function () {

    let articlesString = localStorage.getItem("articles");
    let articles = JSON.parse(articlesString,function(key, value) {
                      if (key == 'createdAt') return new Date(value);
                      return value;
                    });

    let tagsString = localStorage.getItem("tags");
    let tags = JSON.parse(tagsString);

    function putToLocalStorageArt(articles){
        localStorage.removeItem("articles")
        let articlesString = JSON.stringify(articles);
        localStorage.setItem("articles", articlesString);
    }
    function putToLocalStorageTag(tags){
        localStorage.removeItem("tags")
        let tagsString = JSON.stringify(tags);
        localStorage.setItem("tags", tagsString);
    }
    function getArticles(skip,top,filterConfig){
        skip = skip || 0;
        top = top || articles.length;
        let arr = [];
        articles.sort(function(a, b) {
            if (a.createdAt > b.createdAt) return 1;
            if (a.createdAt < b.createdAt) return -1;
        });
        if (filterConfig){
            if (filterConfig.author){
                arr = articles.filter(function(item,i,arr){
                    return item.author === filterConfig.author;
                })
                return arr.splice(skip,top);
            }

            if (filterConfig.tags){
                for (let j = 0; j < filterConfig.tags.length; j++) {
                    let arrNew = articles.filter(function(item){
                        return (item.tags.indexOf(filterConfig.tags[j]) !== -1 && arr.indexOf(item) === -1);
                    })
                    arr = arr.concat(arrNew);
                }
                return arr.splice(skip,top);
            }
        }    
        return articles.slice(skip,top);
    }
    function getArticle(id){
        let article;
        articles.forEach(function(item){
            if(item.id === id){
                 article = item;
            }
        })
        return article;
    }
    function validateArticle(article){
        if (!article){
            return false;
        }
        if(articles.some(function(item){ return item.id === article.id})){
            return false;
        }
        if(article.tags.every(function(item){return tags.indexOf(item) === -1})){
            return false;
        }
       
        if (typeof article.id === 'string' && 
            !isNaN(+article.id) &&
            article.id !== '' &&
            typeof article.title === 'string' &&
            typeof article.summary === 'string' &&
            typeof article.author === 'string'  &&
            typeof article.content === 'string' &&
            (article.createdAt instanceof Date) &&
            (article.tags instanceof Array) &&
            article.tags.length >= 1){
            return true;
        }
        return false;
    }
    function addArticle(article){
        if (validateArticle(article)){
            articles.push(article);
            putToLocalStorageArt(articles)
            return true;
        }
        return false;
    }
    function removeArticle(id){
        articles.forEach(function(item,i){
            if (item.id === id){
                articles.splice(i,1);
                putToLocalStorageArt(articles);
                return true;
            }
        })
        return false;
    }
    function removeTag(tag,id) {
        if (tags.indexOf(tag) === -1){
            throw new Error('Unacceptable tag');
        }
        let arc = getArticle(id);
        let bool = false;

        arc.tags.forEach(function(item,i){
            if (item === tag){
                bool = true;
                arc.tags.splice(i,1);
            }
        })
        return bool;
    }
    function getAuthors(){
        let arr = [];
        articles.forEach(function(item,i){
            if (arr.indexOf(item.author) === -1){
                arr.push(item.author)
            }
        })
        return arr;
    }
    function getTags(){
        return tags;
    }
    function sortArticlesByDate(start,end){
        let articles = getArticles();
        let arr = [];

        articles.map(function(item){
            if(start <= item.createdAt && end >= item.createdAt){
                return arr.push(item);
            }
        })
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
    sortArticlesByDate: sortArticlesByDate,
    putToLocalStorageArt: putToLocalStorageArt,
    putToLocalStorageTag: putToLocalStorageTag
    };
  
}());

let domService = (function () {

    let ul = document.getElementById('article');
    let signup = document.getElementById('signup');
    let addnew = document.getElementById('addnew');
    let addtag = document.getElementById('addtag');
    let filterauthor = document.getElementById('filterauthor');
    let filtertag = document.getElementById('filtertag');
    let selecttags = document.getElementById('selecttags');
    let startdate = document.getElementById('startdate');
    let enddate = document.getElementById('enddate');
    let editid = document.getElementById('editid');
    let edittitle = document.getElementById('edittitle');
    let editsummary = document.getElementById('editsummary');
    let editcontent = document.getElementById('editcontent');
    let tagsForEdit = document.getElementById('tags-for-edit');
    let k = 20;

    function displayNews(articles) {

        for (let i = 0; i < articles.length; i++){

            let li = document.createElement('li');
            let h2 = document.createElement('h2');
            let p = document.createElement('p');
            let span = document.createElement('span');
            let span1 = span.cloneNode(true);
            let span2 = span.cloneNode(true);
            let a = document.createElement('a');
            let a1 = a.cloneNode(true);
            let button = document.createElement('button');

            li.setAttribute('data-id',articles[i].id)
            h2.innerHTML = articles[i].title;
            p.innerHTML = articles[i].summary;
            span.innerHTML = articles[i].createdAt.toDateString();
            span1.innerHTML = articles[i].author;
            span2.innerHTML = articles[i].tags;
            a.innerHTML = 'Read';
            a.href = '#readnew'
            a1.setAttribute('class','edit ed');

            a1.innerHTML = 'Edit';
            a1.href = '#editnew';
            button.setAttribute('class','delete del');

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
    function addNew(article){
            let li = document.createElement('li');
            let h2 = document.createElement('h2');
            let p = document.createElement('p');
            let span = document.createElement('span');
            let span1 = span.cloneNode(true);
            let span2 = span.cloneNode(true);
            let a = document.createElement('a');
            let a1 = a.cloneNode(true);
            let button = document.createElement('button');

            li.setAttribute('data-id',article.id)
            h2.innerHTML = article.title;
            p.innerHTML = article.summary;
            span.innerHTML = article.createdAt.toDateString();
            span1.innerHTML = article.author;
            span2.innerHTML = article.tags;

            a.innerHTML = 'Read';
            a.href = '#readnew'
            a1.setAttribute('class','ed');
            a1.innerHTML = 'Edit';
            a1.href = '#editnew';

            button.setAttribute('class','del');
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
    function removeNew(){
        if (event.target.tagName !== 'BUTTON') {
           return;
        }
        let articleNodeToDelete = event.target.parentElement;
        let id = articleNodeToDelete.getAttribute('data-id');
        articlesService.removeArticle(id);
        ul.removeChild(articleNodeToDelete);
    }
    function readNew() {
        if (event.target.innerHTML !== 'Read') {
           return;
        }
        let articleNode = event.target.parentElement;
        let id = articleNode.getAttribute('data-id');

        let article = articlesService.getArticle(id);

        let h2 = document.getElementsByClassName('readtitle')[0];
        let p = document.getElementsByClassName('readcontent')[0];
        let author = document.getElementsByClassName('newauthor')[0];
        let date = document.getElementsByClassName('newdate')[0];
        let tags = document.getElementsByClassName('newtags')[0];

        h2.innerHTML = article.title;
        p.innerHTML = article.content;
        author.innerHTML = article.author;
        date.innerHTML = article.createdAt;
        tags.innerHTML = article.tags.join(',');
    }
    function showEditNew(){
        if (event.target.innerHTML !== 'Edit') {
           return;
        }
        let articleNode = event.target.parentElement;
        let id = articleNode.getAttribute('data-id');
        let article = articlesService.getArticle(id);

        let tags = articlesService.getTags();

        let selected = tagsForEdit.querySelectorAll('option');

        for (let i = 0; i < selected.length; i++) {
            tagsForEdit.removeChild(selected[i]);
        }

        for (let i = 0; i < tags.length; i++) {
            let option = document.createElement('option');
            option.innerHTML = tags[i];
            if (article.tags.indexOf(tags[i]) !== -1){
                option.setAttribute('selected','selected');
            }
            tagsForEdit.appendChild(option);
        }

        editid.value = article.id;
        edittitle.value = article.title;
        editsummary.value = article.summary;
        editcontent.value = article.content;
    }
    function editNew(){
        let id = editid.value;
        let article = articlesService.getArticle(id);
        let articles = articlesService.getArticles();

        let li = ul.getElementsByTagName('li');
        let selected = getSelection(tagsForEdit);

        if (!edittitle.value || !editsummary.value || !editcontent.value || selected.length < 1) {
            alert('Unacceptable editions');
            return;
        }

        for (let i = 0; i < li.length; i++) {
            if (li[i].getAttribute('data-id') === id){

                let h2 = li[i].getElementsByTagName('h2')[0];
                let p = li[i].getElementsByTagName('p')[0];
                let span = li[i].getElementsByTagName('span')[2];
                h2.innerHTML = edittitle.value;
                p.innerHTML = editcontent.value;
                span.innerHTML = selected.join(',');

                article.title = edittitle.value;
                article.summary = editsummary.value;
                article.content = editcontent.value;
                article.tags = selected;
            }
        }
        articlesService.putToLocalStorageArt(articles);
    }
    function showUserItems(user) {
        let edit = ul.getElementsByClassName('ed');
        let del = ul.getElementsByClassName('del');

        let newEdit = Array.prototype.slice.call(edit);
        let newDel = Array.prototype.slice.call(del);

        if (user){
            
            signup.innerHTML = user;
            addnew.style.display = 'inline-block';
            addtag.style.display = 'inline-block';
           
            for (let i = 0; i < newEdit.length; i++) {
                newEdit[i].classList.remove("edit");
            }
            for (let j = 0; j < newDel.length; j++) {
                newDel[j].classList.remove("delete");
            } 
        }    
        if (!user){
            newEdit = newEdit || [];
            newDel = newDel || [];
            signup.innerHTML = 'SignUp';
            addnew.style.display = 'none';
            addtag.style.display = 'none';

            for (let i = 0; i < newEdit.length; i++) {
                newEdit[i].classList.add("edit");
            }
            for (let j = 0; j < newDel.length; j++) {
                newDel[j].classList.add("delete");
            } 
        }
    }
    function showFilterAuthor(){
        let opt = filterauthor.getElementsByTagName('option');
        let newOpt = Array.prototype.slice.call(opt);

        for (let i = 1; i < newOpt.length; i++) {
            filterauthor.removeChild(newOpt[i]);  
        }

        let arr = articlesService.getAuthors();

        for (let i = 0; i < arr.length; i++) {
            let option = document.createElement('option');
            option.innerHTML = arr[i];
            filterauthor.appendChild(option);
        }
    }
    function showFilterTag(){
        let arr = articlesService.getTags();

        for (let i = 0; i < arr.length; i++) {
            let option = document.createElement('option');
            option.innerHTML = arr[i];
            filtertag.appendChild(option);
        }
        for (let i = 0; i < arr.length; i++) {
            let option = document.createElement('option');
            option.innerHTML = arr[i];
            selecttags.appendChild(option);
        }
    }   
    function getFilterAuthor() {
        let selectedAuthor = filterauthor.value;
        k = 20;
        return selectedAuthor;
    } 
    function getFilterTags(){
        let tags = getSelection(filtertag);
        k = 20;
        return tags;
    }
    function getFilterDates() {
        let start = startdate.value;
        let end = enddate.value;
        let arr = [];
        arr[0] = Date.parse(start);
        arr[1] = Date.parse(end);
        k = 20;
        return  arr;
    }
    function clearNews() {
        let li = ul.getElementsByTagName('li');
        let newLi = Array.prototype.slice.call(li);
        for (let i = 0; i < newLi.length; i++) {
            ul.removeChild(newLi[i]);  
        }
    } 
    function getSelection(o){
        if (!o.options) return [];
        let selectedOptions = [];
        for (let i = 0; i < o.options.length; i++) 
            if (o.options[i].selected) 
                selectedOptions.push(o.options[i].value);
        return selectedOptions;
    }
    function showPaginationButton(articles){
        let newsCount = document.getElementById('article').querySelectorAll('li').length;
        let pagin = document.getElementById('pagination');
        articles = articles || articlesService.getArticles();

        (newsCount === articles.length)?pagin.classList.add('pagination-view'):
                                        pagin.classList.remove('pagination-view');   
    }
    function paginatNews() {
        let newsCount = document.getElementById('article').querySelectorAll('li').length;
          let articles = articlesService.getArticles();
        displayNews(articlesService.getArticles(newsCount,k));
        k +=10;
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

let user = 'Vasya Pupkin';

let button = document.getElementById('signbutton');
button.addEventListener("click",signUser);
let buttonsignout = document.getElementById('signoutbutton');
buttonsignout.addEventListener("click",signOut);

let buttontag = document.getElementById('tagbutton');
buttontag.addEventListener("click",addTag);

let buttonnew = document.getElementById('newbutton');
buttonnew.addEventListener("click",addNew);

let applayauthor = document.getElementById('applayauthor');
applayauthor.addEventListener("click",filterAuthor);

let applaytag = document.getElementById('applaytag');
applaytag.addEventListener("click",filterTags);

let applaydate = document.getElementById('applaydate');
applaydate.addEventListener("click",filterDate);

let articleId = document.getElementById('article');
articleId.addEventListener("click",deleteNew);

articleId.addEventListener("click",readNew);
articleId.addEventListener("click",showEditNew);

let editbutton = document.getElementById('editbutton');
editbutton.addEventListener("click",editArticle);

let pagination = document.getElementById('pagination');
pagination.addEventListener("click",paginatNews);

function signUser() {
    let inputname = document.getElementById('sign');
    user = inputname.value;
    domService.showUserItems(user);
}
function signOut() {
    user = null;
    domService.showUserItems(user);
}
function displayNews(skip,top){
    let articles = articlesService.getArticles(skip,top);
    domService.displayNews(articles);
    domService.showPaginationButton();
}
function addTag() {
    let inputtag = document.getElementById('tagvalue');
    let tags = articlesService.getTags();
    if (tags.indexOf(inputtag.value) !== -1){
        alert('This tag is also exist');
        return;
    }
    tags.push(inputtag.value);
    alert('Tag adds succesfully');

    let filtertag = document.getElementById('filtertag');
    let selecttags = document.getElementById('selecttags');

    let option = document.createElement('option');
    let option1 = document.createElement('option');
    option.innerHTML = inputtag.value;
    option1.innerHTML = inputtag.value;
    filtertag.appendChild(option);
    selecttags.appendChild(option1);
    articlesService.putToLocalStorageTag(tags);
}
function addNew() {
    let id = document.getElementById('newid').value;
    let title = document.getElementById('newtitle').value;
    let summary = document.getElementById('newsummary').value;
    let content = document.getElementById('newcontent').value;
    let tags = document.getElementById('selecttags');

    let article = {};
    article.id = id;
    article.title = title;
    article.summary = summary;
    article.content = content;
    article.tags = domService.getSelection(tags);
    article.createdAt = new Date();
    article.author = user;

    let newsCount = document.querySelectorAll('li').length;

    if (articlesService.validateArticle(article)){
        articlesService.addArticle(article);
    } else {
        alert('your article is not valid');
        return;
    }
    if (newsCount < 10){  
        domService.addNew(article);
        domService.showUserItems(user);
        domService.showFilterAuthor();
        domService.showPaginationButton();
    }
    if (newsCount === articlesService.getArticles().length-1){    
        domService.addNew(article);
        domService.showUserItems(user);
        domService.showFilterAuthor();
        domService.showPaginationButton();
    }
}
function deleteNew(){
    domService.removeNew();
    domService.showPaginationButton();
}
function readNew(){
    domService.readNew();
}
function showEditNew() {
    domService.showEditNew();
}
function filterAuthor() {
    let author = domService.getFilterAuthor();
    if (author === 'No filter by author'){
        domService.clearNews();
        let articles = articlesService.getArticles(0,10);
        domService.displayNews(articles);
        domService.showUserItems(user);
        domService.showPaginationButton();
        return;
    }
    let obj = {};
    obj.author = author;
    domService.clearNews();
    let articles = articlesService.getArticles(0,null,obj)
    domService.displayNews(articles);
    domService.showUserItems(user);
    domService.showPaginationButton(articles);
}
function filterTags() {
    let tags = domService.getFilterTags();
    if (tags[0] === 'No filter'){
        domService.clearNews();
        let articles = articlesService.getArticles(0,10);
        domService.displayNews(articles);
        domService.showUserItems(user);
        domService.showPaginationButton();
        return;
    }
    domService.clearNews();
    let obj = {};
    obj.tags = tags;
    let articles = articlesService.getArticles(0,10,obj);
    domService.displayNews(articles);
    domService.showUserItems(user);
    domService.showPaginationButton(articles);
}
function filterDate() {
    let arr = domService.getFilterDates();
    if (!arr[0] && !arr[1]){
        domService.clearNews();
        let articles = articlesService.getArticles(0,10);
        domService.displayNews(articles);
        domService.showUserItems(user);
        domService.showPaginationButton();
        return;
    }
    arr[0] = arr[0] || 0;
    arr[1] = arr[1] || Date.parse(new Date('2117-02-26T12:12:00'));

    domService.clearNews();
    let articles = articlesService.sortArticlesByDate(arr[0],arr[1]);
    domService.displayNews(articles);
    domService.showUserItems(user);
    domService.showPaginationButton(articles);
}
function editArticle() {
    domService.editNew();
}
function paginatNews() {
    domService.paginatNews();
    domService.showUserItems(user);
}
function initApp() {
    displayNews(0,10);
    domService.showFilterAuthor();
    domService.showFilterTag();
    domService.showUserItems(user);
    domService.showPaginationButton();
}

document.addEventListener('DOMContentLoaded', initApp)
