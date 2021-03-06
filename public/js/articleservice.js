import { portal } from './app';

export default class ArticlesService {
    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            const promiseArticle = new Promise((resolve, reject) => {
                const oReq = new XMLHttpRequest();

                oReq.open('GET', '/articles');

                oReq.addEventListener('load', () => {
                    resolve(oReq.responseText);
                });

                oReq.send();
            });
            promiseArticle.then(result => this.articles = JSON.parse(result, (key, value) => {
                if (key == 'createdAt') {
                    return new Date(value); }
                return value;
            }));
        });

        document.addEventListener('DOMContentLoaded', () => {
            const promiseImage = new Promise((resolve, reject) => {
                const oReq = new XMLHttpRequest();

                oReq.open('GET', '/images');

                oReq.addEventListener('load', () => {
                    resolve(this.images = JSON.parse(oReq.responseText));
                });

                oReq.send();
            });
            promiseImage.then(result => portal.initApp());
        });

        document.addEventListener('DOMContentLoaded', () => {
            const promiseTag = new Promise((resolve, reject) => {
                const oReq = new XMLHttpRequest();

                oReq.open('GET', '/tags');

                oReq.addEventListener('load', () => {

                    let tags = JSON.parse(oReq.responseText)[0].tags;
                    tags = tags.join(',');
                    tags = tags.split(',');
                    resolve(tags);

                });

                oReq.send();
            });
            promiseTag.then(result => this.tags = result);
        });
    }

    getArticles(skip, top, filterConfig) {
        skip = skip || 0;
        top = top || this.articles.length;
        let arr = [];

        this.articles.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1; }
            if (a.createdAt < b.createdAt) {
                return 1; }
        });

        if (filterConfig) {

            if (filterConfig.author) {

                arr = this.articles.filter((item) => {
                    return item.author === filterConfig.author;
                });

                return arr.splice(skip, top);
            }

            if (filterConfig.tags) {
                for (let j = 0; j < filterConfig.tags.length; j++) {

                    const arrNew = this.articles.filter((item) => {
                        return (item.tags.indexOf(filterConfig.tags[j]) !== -1 &&
                            arr.indexOf(item) === -1);
                    });

                    arr = arr.concat(arrNew);
                }
                return arr.splice(skip, top);
            }
        }
        return this.articles.slice(skip, top);
    }

    getArticle(id) {
        this.articles.forEach((item) => {
            if (item.id === id) {
                this.article = item;
            }
        });
        return this.article;
    }

    getImage(id) {
        for (let i = 0; i < this.images.length; i++) {
            if (this.images[i].id == id) {
                return this.images[i];
            }
        }
    }

    validateArticle(article, targetClassName) {
        if (!article) {
            return false;
        }

        if (this.articles.some((item) => {
                 return item.id == article.id; }) &&
                 targetClassName === 'newbutton') {
            alert('Such Id already exist');
            return false;
        }

        if (isNaN(+article.id) || article.id === '') {
            alert('Id must be a number');
            return false;
        }

        if (article.title === '') {
            alert('Title can not be empty');
            return false;
        }

        if (article.summary === '') {
            alert('Summary can not be empty');
            return false;
        }

        if (article.content === '') {
            alert('Content can not be empty');
            return false;
        }

        if (article.tags.length <= 0) {
            alert('At least one tag must be selected');
            return false;
        }

        if (typeof article.title === 'string' &&
            typeof article.summary === 'string' &&
            typeof article.author === 'string' &&
            typeof article.content === 'string' &&
            (article.createdAt instanceof Date) &&
            (article.tags instanceof Array)) {

            return true;
        }
    }

    validateImage(article, targetClassName) {
        if (!article) {
            return false;
        }

        if (this.articles.some((item) => {
                 return item.id == article.id; }) &&
                 targetClassName === 'newbutton') {
            return false;
        }

        if (isNaN(+article.id) || article.id === '') {
            return false;
        }

        if (article.title === '') {
            return false;
        }

        if (article.summary === '') {
            return false;
        }

        if (article.content === '') {
            return false;
        }

        if (article.tags.length <= 0) {
            return false;
        }

        if (typeof article.title === 'string' &&
            typeof article.summary === 'string' &&
            typeof article.author === 'string' &&
            typeof article.content === 'string' &&
            (article.createdAt instanceof Date) &&
            (article.tags instanceof Array)) {

            return true;
        }
    }

    addArticle(article) {
            this.articles.push(article);
            return true;
    }

    removeArticle(id) {
        this.articles.forEach((item, i) => {
            if (item.id === id) {

                this.articles.splice(i, 1);
                return true;
            }
        });
        return false;
    }

    removeTag(tag, id) {
        if (this.tags.indexOf(tag) === -1) {
            throw new Error('Unacceptable tag');
        }

        let bool = false;

        this.getArticle(id).tags.forEach((item, i) => {
            if (item === tag) {

                bool = true;
                this.getArticle(id).tags.splice(i, 1);
            }
        });
        return bool;
    }

    getAuthors() {
        const arr = [];

        this.articles.forEach((item) => {

            if (arr.indexOf(item.author) === -1) {
                arr.push(item.author);
            }
        });
        return arr;
    }

    getTags() {
        return this.tags;
    }

    sortArticlesByDate(start, end) {
        const arr = [];

        this.articles.map((item) => {
            if (start <= item.createdAt && end >= item.createdAt) {
                return arr.push(item);
            }
        });
        return arr;
    }
}
