class DomService {
    constructor() {

        this.ul = document.getElementById('article');
        this.signup = document.getElementById('signup');
        this.addnew = document.getElementById('addnew');
        this.addtag = document.getElementById('addtag');
        this.filterauthor = document.getElementById('filterauthor');
        this.filtertag = document.getElementById('filtertag');
        this.selecttags = document.getElementById('selecttags');
        this.startdate = document.getElementById('startdate');
        this.enddate = document.getElementById('enddate');
        this.editid = document.getElementById('editid');
        this.edittitle = document.getElementById('edittitle');
        this.editsummary = document.getElementById('editsummary');
        this.editcontent = document.getElementById('editcontent');
        this.tagsForEdit = document.getElementById('tags-for-edit');
        this.articlesForPage = 12;
    }

    displayNews(articles) {

        articles.forEach((item) => {
            const li = document.createElement('li');
            const h2 = document.createElement('h2');
            const p = document.createElement('p');
            const span = document.createElement('span');
            const span1 = span.cloneNode(true);
            const span2 = span.cloneNode(true);
            const a = document.createElement('a');
            const a1 = a.cloneNode(true);
            const button = document.createElement('button');
            const img = document.createElement('img');
            img.style.width = '100%';
            img.height = 200;


            li.setAttribute('data-id', item.id);

            const link = articlesService.getImage(item.id);
            link ? img.src = link.image : img.style.display = 'none';
            h2.innerHTML = item.title;
            p.innerHTML = item.summary;
            span.innerHTML = item.createdAt.toDateString();
            span.setAttribute('class', 'datearticle');
            span1.innerHTML = 'Author: ' + item.author;
            span1.setAttribute('class', 'authorclass');
            span2.innerHTML = 'Tags: ' + item.tags;
            span2.setAttribute('class', 'settags')
            a.innerHTML = 'Read';
            a.setAttribute('class', 'readnew')
            a.href = '#readnew';
            a1.setAttribute('class', 'edit ed');

            a1.innerHTML = 'Edit';
            a1.href = '#editnew';
            button.setAttribute('class', 'delete del');
            button.id = 'deletearticle'
            button.innerHTML = 'Delete';

            li.appendChild(img);
            li.appendChild(h2);
            li.appendChild(p);
            li.appendChild(span);
            li.appendChild(span1);
            li.appendChild(span2);
            li.appendChild(a);
            li.appendChild(a1);
            li.appendChild(button);
            this.ul.appendChild(li);
        });
    }

    removeNew(id) {
        articlesService.removeArticle(id);

        const li = this.ul.getElementsByTagName('li');
        const newLi = [...li];

        newLi.forEach((item) => {
            if (id === item.getAttribute('data-id')) {
                this.ul.removeChild(item);
            }
        });
    }

    readNew() {
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
        const img = document.getElementsByClassName('readimage')[0];

        h2.innerHTML = article.title;
        const link = articlesService.getImage(id);
        link ? img.src = link.image : img.style.display = 'none';
        p.innerHTML = article.content;
        author.innerHTML = 'Author: ' + article.author;
        date.innerHTML = article.createdAt;
        tags.innerHTML = 'Tags: ' + article.tags.join(',');
    }

    showEditNew() {
        if (event.target.innerHTML !== 'Edit') {
           return;
        }

        const articleNode = event.target.parentElement;
        const id = articleNode.getAttribute('data-id');
        const article = articlesService.getArticle(id);

        const tags = articlesService.getTags();

        const selected = [...this.tagsForEdit.querySelectorAll('option')];

        selected.forEach((item) =>{
            this.tagsForEdit.removeChild(item);
        });

        tags.forEach((item) => {
            const option = document.createElement('option');
            option.innerHTML = item;

            if (article.tags.indexOf(item) !== -1) {
                option.setAttribute('selected', 'selected');
            }

            this.tagsForEdit.appendChild(option);
        });

        this.editid.value = article.id;
        this.edittitle.value = article.title;
        this.editsummary.value = article.summary;
        this.editcontent.value = article.content;
    }

    editNew(article) {
        const Article = articlesService.getArticle(article.id);

        const li = [...this.ul.getElementsByTagName('li')];
        const selected = this.getSelection(this.tagsForEdit);
        
        li.forEach((item) => {
            if (item.getAttribute('data-id') === article.id) {

                const h2 = item.getElementsByTagName('h2')[0];
                const p = item.getElementsByTagName('p')[0];
                const span = item.getElementsByTagName('span')[2];
                const img = item.getElementsByTagName('img')[0];

                const link = articlesService.getImage(article.id);
                if (link) {
                    img.src = link.image;
                    img.style.display = 'block';
                } else {
                    img.style.display = 'none';
                } 

                h2.innerHTML = article.title;
                p.innerHTML = article.summary;
                span.innerHTML = 'Tags :' + article.tags.join(',');

                Article.title = article.title;
                Article.summary = article.summary;
                Article.content = article.content;
                Article.tags = article.tags;
            }
        });
    }

    showUserItems(user) {
        const edit = this.ul.getElementsByClassName('ed');
        const del = this.ul.getElementsByClassName('del');

        let newEdit =[...edit];
        let newDel = [...del];

        if (user) {

            this.signup.innerHTML = user;
            this.addnew.style.visibility = 'visible';
            this.addtag.style.visibility = 'visible';

            newEdit.forEach((item) => {
                item.classList.remove('edit');
            });

            newDel.forEach((item) => {
                item.classList.remove('delete');
            });
        }

        if (!user) {
            newEdit = newEdit || [];
            newDel = newDel || [];
            this.addnew.style.visibility = 'hidden';
            this.addtag.style.visibility = 'hidden';

            newEdit.forEach((item) => {
                item.classList.add('edit');
            });

            newDel.forEach((item) => {
                item.classList.add('delete');
            });
        }
    }

    showFilterAuthor() {
        const opt = this.filterauthor.getElementsByTagName('option');
        const newOpt = [...opt];

        newOpt.forEach((item) => {
            this.filterauthor.removeChild(item);
        });

        const arr = articlesService.getAuthors();

        arr.forEach((item) => {
            const option = document.createElement('option');
            option.innerHTML = item;
            this.filterauthor.appendChild(option);
        });
    }

    showFilterTag() {
        const arr = articlesService.getTags();

        arr.forEach((item) => {
            const option = document.createElement('option');
            option.innerHTML = item;
            this.filtertag.appendChild(option);
        });

        arr.forEach((item) => {
            const option = document.createElement('option');
            option.innerHTML = item;
            this.selecttags.appendChild(option);
        });
    }

    getFilterAuthor() {
        const selectedAuthor = this.filterauthor.value;
        this.articlesForPage = 12;
        return selectedAuthor;
    }

    getFilterTags() {
        const tags = this.getSelection(this.filtertag);
        this.articlesForPage = 12;
        return tags;
    }

    getFilterDates() {
        const start = this.startdate.value;
        const end = this.enddate.value;

        const arr = [];
        arr[0] = Date.parse(start);
        arr[1] = Date.parse(end);

        this.articlesForPage = 12;

        return arr;
    }

    clearNews() {
        const li = this.ul.getElementsByTagName('li');
        const newLi = [...li];

        newLi.forEach((item) => {
            this.ul.removeChild(item);
        });
    }

    getSelection(o) {
        if (!o.options) return [];

        const selectedOptions = [];

        for (let i = 0; i < o.options.length; i++) {

            if (o.options[i].selected) {
                selectedOptions.push(o.options[i].value);
            }
        }
        return selectedOptions;
    }

    showPaginationButton(articles) {
        const newsCount = document.getElementById('article').querySelectorAll('li').length;
        const pagin = document.getElementById('pagination');
        let length;

        if (articlesService.articlesStorage) {
            articles = articles || articlesService.articlesStorage;
            length = articlesService.articlesStorage.length;
        } else {
            articles = articles || articlesService.getArticles();
            length = articlesService.getArticles().length;
        }
        

        if (articles.length < 6 || newsCount === length) {
            pagin.classList.add('pagination-view');
            return;
        }
        if (articles.length >= 6) {
            pagin.classList.remove('pagination-view');
        }
    }

    paginatNews() {
        const newsCount = document.getElementById('article').querySelectorAll('li').length;
        const articles = articlesService.getArticles();
        if (articlesService.articlesStorage) {
            this.displayNews(articlesService.articlesStorage.slice(newsCount, this.articlesForPage));
        } else {
            this.displayNews(articlesService.getArticles(newsCount, this.articlesForPage));
        }
        this.articlesForPage += 6;

        this.showPaginationButton();

        if (articlesService.articlesStorage && newsCount + 6 >= articlesService.articlesStorage.length) {
            articlesService.articlesStorage = null;
        }
    }
}