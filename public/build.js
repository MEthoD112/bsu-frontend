/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "public/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.portal = exports.images = exports.user = exports.domService = exports.articlesService = undefined;

var _articleservice = __webpack_require__(1);

var _articleservice2 = _interopRequireDefault(_articleservice);

var _domservice = __webpack_require__(2);

var _domservice2 = _interopRequireDefault(_domservice);

var _user = __webpack_require__(5);

var _user2 = _interopRequireDefault(_user);

var _images = __webpack_require__(3);

var _images2 = _interopRequireDefault(_images);

var _portal = __webpack_require__(4);

var _portal2 = _interopRequireDefault(_portal);

var _watch = __webpack_require__(6);

var _watch2 = _interopRequireDefault(_watch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clock = new _watch2.default();
clock.update();

var articlesService = new _articleservice2.default();

var domService = new _domservice2.default();

var user = new _user2.default();

var images = new _images2.default();

var portal = new _portal2.default();

exports.articlesService = articlesService;
exports.domService = domService;
exports.user = user;
exports.images = images;
exports.portal = portal;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _app = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArticlesService = function () {
    function ArticlesService() {
        var _this = this;

        _classCallCheck(this, ArticlesService);

        document.addEventListener('DOMContentLoaded', function () {
            var promiseArticle = new Promise(function (resolve, reject) {
                var oReq = new XMLHttpRequest();

                oReq.open('GET', '/articles');

                oReq.addEventListener('load', function () {
                    resolve(oReq.responseText);
                });

                oReq.send();
            });
            promiseArticle.then(function (result) {
                return _this.articles = JSON.parse(result, function (key, value) {
                    if (key == 'createdAt') {
                        return new Date(value);
                    }
                    return value;
                });
            });
        });

        document.addEventListener('DOMContentLoaded', function () {
            var promiseImage = new Promise(function (resolve, reject) {
                var oReq = new XMLHttpRequest();

                oReq.open('GET', '/images');

                oReq.addEventListener('load', function () {
                    resolve(_this.images = JSON.parse(oReq.responseText));
                });

                oReq.send();
            });
            promiseImage.then(function (result) {
                return _app.portal.initApp();
            });
        });

        document.addEventListener('DOMContentLoaded', function () {
            var promiseTag = new Promise(function (resolve, reject) {
                var oReq = new XMLHttpRequest();

                oReq.open('GET', '/tags');

                oReq.addEventListener('load', function () {

                    var tags = JSON.parse(oReq.responseText)[0].tags;
                    tags = tags.join(',');
                    tags = tags.split(',');
                    resolve(tags);
                });

                oReq.send();
            });
            promiseTag.then(function (result) {
                return _this.tags = result;
            });
        });
    }

    _createClass(ArticlesService, [{
        key: 'getArticles',
        value: function getArticles(skip, top, filterConfig) {
            var _this2 = this;

            skip = skip || 0;
            top = top || this.articles.length;
            var arr = [];

            this.articles.sort(function (a, b) {
                if (a.createdAt > b.createdAt) {
                    return -1;
                }
                if (a.createdAt < b.createdAt) {
                    return 1;
                }
            });

            if (filterConfig) {

                if (filterConfig.author) {

                    arr = this.articles.filter(function (item) {
                        return item.author === filterConfig.author;
                    });

                    return arr.splice(skip, top);
                }

                if (filterConfig.tags) {
                    var _loop = function _loop(j) {

                        var arrNew = _this2.articles.filter(function (item) {
                            return item.tags.indexOf(filterConfig.tags[j]) !== -1 && arr.indexOf(item) === -1;
                        });

                        arr = arr.concat(arrNew);
                    };

                    for (var j = 0; j < filterConfig.tags.length; j++) {
                        _loop(j);
                    }
                    return arr.splice(skip, top);
                }
            }
            return this.articles.slice(skip, top);
        }
    }, {
        key: 'getArticle',
        value: function getArticle(id) {
            var _this3 = this;

            this.articles.forEach(function (item) {
                if (item.id === id) {
                    _this3.article = item;
                }
            });
            return this.article;
        }
    }, {
        key: 'getImage',
        value: function getImage(id) {
            for (var i = 0; i < this.images.length; i++) {
                if (this.images[i].id == id) {
                    return this.images[i];
                }
            }
        }
    }, {
        key: 'validateArticle',
        value: function validateArticle(article, targetClassName) {
            if (!article) {
                return false;
            }

            if (this.articles.some(function (item) {
                return item.id == article.id;
            }) && targetClassName === 'newbutton') {
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

            if (typeof article.title === 'string' && typeof article.summary === 'string' && typeof article.author === 'string' && typeof article.content === 'string' && article.createdAt instanceof Date && article.tags instanceof Array) {

                return true;
            }
        }
    }, {
        key: 'validateImage',
        value: function validateImage(article, targetClassName) {
            if (!article) {
                return false;
            }

            if (this.articles.some(function (item) {
                return item.id == article.id;
            }) && targetClassName === 'newbutton') {
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

            if (typeof article.title === 'string' && typeof article.summary === 'string' && typeof article.author === 'string' && typeof article.content === 'string' && article.createdAt instanceof Date && article.tags instanceof Array) {

                return true;
            }
        }
    }, {
        key: 'addArticle',
        value: function addArticle(article) {
            this.articles.push(article);
            return true;
        }
    }, {
        key: 'removeArticle',
        value: function removeArticle(id) {
            var _this4 = this;

            this.articles.forEach(function (item, i) {
                if (item.id === id) {

                    _this4.articles.splice(i, 1);
                    return true;
                }
            });
            return false;
        }
    }, {
        key: 'removeTag',
        value: function removeTag(tag, id) {
            var _this5 = this;

            if (this.tags.indexOf(tag) === -1) {
                throw new Error('Unacceptable tag');
            }

            var bool = false;

            this.getArticle(id).tags.forEach(function (item, i) {
                if (item === tag) {

                    bool = true;
                    _this5.getArticle(id).tags.splice(i, 1);
                }
            });
            return bool;
        }
    }, {
        key: 'getAuthors',
        value: function getAuthors() {
            var arr = [];

            this.articles.forEach(function (item) {

                if (arr.indexOf(item.author) === -1) {
                    arr.push(item.author);
                }
            });
            return arr;
        }
    }, {
        key: 'getTags',
        value: function getTags() {
            return this.tags;
        }
    }, {
        key: 'sortArticlesByDate',
        value: function sortArticlesByDate(start, end) {
            var arr = [];

            this.articles.map(function (item) {
                if (start <= item.createdAt && end >= item.createdAt) {
                    return arr.push(item);
                }
            });
            return arr;
        }
    }]);

    return ArticlesService;
}();

exports.default = ArticlesService;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _app = __webpack_require__(0);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomService = function () {
    function DomService() {
        _classCallCheck(this, DomService);

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

    _createClass(DomService, [{
        key: 'displayNews',
        value: function displayNews(articles) {
            var _this = this;

            articles.forEach(function (item) {
                var link = _app.articlesService.getImage(item.id);
                var linkImage = link ? link.image : '#';
                var date = item.createdAt.toDateString();
                var author = 'Author: ' + item.author;
                var tags = 'Tags: ' + item.tags.join(', ').slice(0, 50) + '...';

                var domString = '<li data-id="' + item.id + '">' + ('<a href="#readnew" class="link" data-id="' + item.id + '">') + ('<div data-id="' + item.id + '">') + ('<img src="' + linkImage + '" alt="Here must be image">') + '</div>' + ('<h2>' + item.title + '</h2>') + ('<p>' + item.summary + '</p>') + '</a>' + ('<span class="datearticle">' + date + '</span>') + ('<span class="authorclass">' + author + '</span>') + ('<span class="settags">' + tags + '</span>') + '<a href="#readnew" class="readnew">Read</a>' + '<a href="#editnew" class="edit ed">Edit</a>' + '<button id="deletearticle" class="delete del">Delete</button>' + '</li>';

                _this.ul.insertAdjacentHTML('beforeend', domString);
            });
        }
    }, {
        key: 'removeNew',
        value: function removeNew(id) {
            var _this2 = this;

            _app.articlesService.removeArticle(id);

            var li = this.ul.getElementsByTagName('li');
            var newLi = [].concat(_toConsumableArray(li));

            newLi.forEach(function (item) {
                if (id === item.getAttribute('data-id')) {
                    _this2.ul.removeChild(item);
                }
            });
        }
    }, {
        key: 'readNew',
        value: function readNew() {
            if (event.target.innerHTML === 'Read' || event.target.tagName === 'IMG' || event.target.tagName === 'P' || event.target.tagName === 'H2') {

                var articleNode = event.target.parentElement;
                var id = articleNode.getAttribute('data-id');

                var article = _app.articlesService.getArticle(id);

                var h2 = document.getElementsByClassName('readtitle')[0];
                var p = document.getElementsByClassName('readcontent')[0];
                var author = document.getElementsByClassName('newauthor')[0];
                var date = document.getElementsByClassName('newdate')[0];
                var tags = document.getElementsByClassName('newtags')[0];
                var img = document.getElementsByClassName('readimage')[0];

                h2.innerHTML = article.title;
                var link = _app.articlesService.getImage(id);
                link ? img.src = link.image : img.style.display = 'none';
                p.innerHTML = article.content;
                author.innerHTML = '<strong>' + 'Author:  ' + '</strong>' + article.author;

                var options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long',
                    timezone: 'UTC',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                };
                date.innerHTML = '<strong>' + 'Date:  ' + '</strong>' + article.createdAt.toLocaleString("en-US", options);
                tags.innerHTML = '<strong>' + 'Tags:  ' + '</strong>' + article.tags.join(', ').slice(0, 50) + '...';
            }
        }
    }, {
        key: 'clearAddNewWindow',
        value: function clearAddNewWindow() {
            document.getElementById('newid').value = '';
            document.getElementById('newtitle').value = '';
            document.getElementById('newsummary').value = '';
            document.getElementById('newcontent').value = '';

            var selecttags = document.getElementById('selecttags');
            this.clearSelection(selecttags);
        }
    }, {
        key: 'showEditNew',
        value: function showEditNew() {
            var _this3 = this;

            if (event.target.innerHTML !== 'Edit') {
                return;
            }

            var articleNode = event.target.parentElement;
            var id = articleNode.getAttribute('data-id');
            var article = _app.articlesService.getArticle(id);

            var tags = _app.articlesService.getTags();

            var selected = [].concat(_toConsumableArray(this.tagsForEdit.querySelectorAll('option')));

            selected.forEach(function (item) {
                _this3.tagsForEdit.removeChild(item);
            });

            tags.forEach(function (item) {
                var option = document.createElement('option');
                option.innerHTML = item;

                if (article.tags.indexOf(item) !== -1) {
                    option.setAttribute('selected', 'selected');
                }

                _this3.tagsForEdit.appendChild(option);
            });

            this.editid.value = article.id;
            this.edittitle.value = article.title;
            this.editsummary.value = article.summary;
            this.editcontent.value = article.content;
        }
    }, {
        key: 'editNew',
        value: function editNew(article) {
            var Article = _app.articlesService.getArticle(article.id);

            var li = [].concat(_toConsumableArray(this.ul.getElementsByTagName('li')));
            var selected = this.getSelection(this.tagsForEdit);

            li.forEach(function (item) {
                if (item.getAttribute('data-id') === article.id) {

                    var h2 = item.getElementsByTagName('h2')[0];
                    var p = item.getElementsByTagName('p')[0];
                    var span = item.getElementsByTagName('span')[2];
                    var img = item.getElementsByTagName('img')[0];

                    var link = _app.articlesService.getImage(article.id);
                    if (link) {
                        img.src = link.image;
                        img.style.display = 'block';
                    } else {
                        img.style.display = 'none';
                    }
                    h2.innerHTML = article.title;
                    p.innerHTML = article.summary;
                    span.innerHTML = 'Tags :' + article.tags.join(', ').slice(0, 50) + '...';

                    Article.title = article.title;
                    Article.summary = article.summary;
                    Article.content = article.content;
                    Article.tags = article.tags;
                }
            });
        }
    }, {
        key: 'showUserItems',
        value: function showUserItems(user) {
            var edit = this.ul.getElementsByClassName('ed');
            var del = this.ul.getElementsByClassName('del');

            var newEdit = [].concat(_toConsumableArray(edit));
            var newDel = [].concat(_toConsumableArray(del));

            if (user) {

                this.signup.innerHTML = user;
                this.addnew.style.display = 'block';
                this.addtag.style.display = 'block';

                newEdit.forEach(function (item) {
                    item.classList.remove('edit');
                });

                newDel.forEach(function (item) {
                    item.classList.remove('delete');
                });
            }

            if (!user) {
                newEdit = newEdit || [];
                newDel = newDel || [];
                this.addnew.style.display = 'none';
                this.addtag.style.display = 'none';

                newEdit.forEach(function (item) {
                    item.classList.add('edit');
                });

                newDel.forEach(function (item) {
                    item.classList.add('delete');
                });
            }
        }
    }, {
        key: 'showFilterAuthor',
        value: function showFilterAuthor() {
            var _this4 = this;

            var opt = this.filterauthor.getElementsByTagName('option');
            var newOpt = [].concat(_toConsumableArray(opt));

            newOpt.forEach(function (item) {
                _this4.filterauthor.removeChild(item);
            });

            var arr = _app.articlesService.getAuthors();

            arr.forEach(function (item) {
                var option = document.createElement('option');
                option.innerHTML = item;
                _this4.filterauthor.appendChild(option);
            });
        }
    }, {
        key: 'showFilterTag',
        value: function showFilterTag() {
            var _this5 = this;

            var arr = _app.articlesService.getTags();

            arr.forEach(function (item) {
                var option = document.createElement('option');
                option.innerHTML = item;
                _this5.filtertag.appendChild(option);
            });

            arr.forEach(function (item) {
                var option = document.createElement('option');
                option.innerHTML = item;
                _this5.selecttags.appendChild(option);
            });
        }
    }, {
        key: 'getFilterAuthor',
        value: function getFilterAuthor() {
            var selectedAuthor = this.filterauthor.value;
            this.articlesForPage = 12;
            return selectedAuthor;
        }
    }, {
        key: 'getFilterTags',
        value: function getFilterTags() {
            var tags = this.getSelection(this.filtertag);
            this.articlesForPage = 12;
            return tags;
        }
    }, {
        key: 'getFilterDates',
        value: function getFilterDates() {
            var start = this.startdate.value;
            var end = this.enddate.value;

            var arr = [];
            arr[0] = Date.parse(start);
            arr[1] = Date.parse(end);

            this.articlesForPage = 12;

            return arr;
        }
    }, {
        key: 'clearNews',
        value: function clearNews() {
            var _this6 = this;

            var li = this.ul.getElementsByTagName('li');
            var newLi = [].concat(_toConsumableArray(li));

            newLi.forEach(function (item) {
                _this6.ul.removeChild(item);
            });
        }
    }, {
        key: 'getSelection',
        value: function getSelection(o) {
            if (!o.options) return [];

            var selectedOptions = [];

            for (var i = 0; i < o.options.length; i++) {

                if (o.options[i].selected) {
                    selectedOptions.push(o.options[i].value);
                }
            }
            return selectedOptions;
        }
    }, {
        key: 'clearSelection',
        value: function clearSelection(o) {
            for (var i = 0; i < o.options.length; i++) {
                o.options[i].selected = false;
            }
        }
    }, {
        key: 'showPaginationButton',
        value: function showPaginationButton(articles) {
            var newsCount = document.getElementById('article').querySelectorAll('li').length;
            var pagin = document.getElementById('pagination');
            var length = void 0;

            if (_app.articlesService.articlesStorage) {
                articles = articles || _app.articlesService.articlesStorage;
                length = _app.articlesService.articlesStorage.length;
            } else {
                articles = articles || _app.articlesService.getArticles();
                length = _app.articlesService.getArticles().length;
            }
            if (articles.length < 6 || newsCount === length) {
                pagin.classList.add('pagination-view');
                return;
            }
            if (articles.length >= 6) {
                pagin.classList.remove('pagination-view');
            }
        }
    }, {
        key: 'paginatNews',
        value: function paginatNews() {
            var newsCount = document.getElementById('article').querySelectorAll('li').length;
            var articles = _app.articlesService.getArticles();
            var news = _app.articlesService.getArticles(newsCount, this.articlesForPage);

            if (_app.articlesService.articlesStorage) {
                var _storage = _app.articlesService.articlesStorage;
                var newsFromStorage = _storage.slice(newsCount, this.articlesForPage);
                this.displayNews(newsFromStorage);
            } else {
                this.displayNews(news);
            }
            this.articlesForPage += 6;

            this.showPaginationButton();

            if (_app.articlesService.articlesStorage && newsCount + 6 >= storage.length) {
                _app.articlesService.articlesStorage = null;
            }
        }
    }]);

    return DomService;
}();

exports.default = DomService;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});

var _app = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Images = function Images() {
				_classCallCheck(this, Images);

				document.getElementById('newbutton').addEventListener('click', function () {
								var promiseImage = new Promise(function (resolve, reject) {
												var article = _app.portal.createNew();

												if (!_app.articlesService.validateImage(article, event.target.className)) {
																return;
												}

												var oReq = new XMLHttpRequest();

												oReq.open('POST', '/addfoto');

												oReq.addEventListener('load', function () {
																resolve(oReq.responseText);
												});

												oReq.setRequestHeader('content-type', 'application/json');

												var file = document.getElementById('image').files[0];

												var img = document.createElement('img');
												img.width = 370;
												img.height = 200;

												var reader = new FileReader();
												reader.onload = function (event) {
																img.src = event.target.result;
																var link = event.target.result;
																var idString = document.getElementById('newid').value;

																var dataurl = { image: link, id: idString };

																_app.articlesService.images.push(dataurl);

																var string = JSON.stringify(dataurl);

																oReq.send(string);
												};
												file ? reader.readAsDataURL(file) : file;
								});
				});

				document.getElementById('editbutton').addEventListener('click', function () {
								var promiseImage = new Promise(function (resolve, reject) {
												var article = _app.portal.createEditedNew();

												if (!_app.articlesService.validateImage(article, event.target.className)) {
																return;
												}

												var oReq = new XMLHttpRequest();

												oReq.open('PUT', '/editfoto');

												oReq.addEventListener('load', function () {
																oReq.responseText;
												});

												oReq.setRequestHeader('content-type', 'application/json');

												var file = document.getElementById('imageforedit').files[0];

												var editimage = document.createElement('img');
												editimage.width = 370;
												editimage.height = 200;

												var reader = new FileReader();
												reader.onload = function (event) {
																editimage.src = event.target.result;
																var link = event.target.result;
																var idString = document.getElementById('editid').value;

																var dataurl = { image: link, id: idString };

																var articleImage = _app.articlesService.getImage(idString);

																var index = _app.articlesService.images.indexOf(articleImage);

																index >= 0 ? _app.articlesService.images.splice(index, 1) : index;

																_app.articlesService.images.push(dataurl);

																var string = JSON.stringify(dataurl);

																oReq.send(string);
												};
												file ? reader.readAsDataURL(file) : file;
								});
				});
};

exports.default = Images;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _app = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Portal = function () {
	function Portal() {
		var _this = this;

		_classCallCheck(this, Portal);

		var that = this;

		this.buttonAddTag = document.getElementById('addtag');
		this.buttonAddTag.addEventListener('click', function () {
			document.getElementById('tag').style.display = 'block';
		});

		this.tagClose = document.getElementById('closetag');
		this.tagWindow = document.getElementById('tag');
		this.tagWindow.style.display = 'none';
		this.tagClose.addEventListener('click', function () {
			_this.tagWindow.style.display = 'none';
		});

		this.buttonTag = document.getElementById('tagbutton');
		this.buttonTag.addEventListener('click', function () {
			var promiseAddTag = new Promise(function (resolve, reject) {

				var Tag = document.getElementById('tagvalue').value;

				var inputtag = { tag: Tag };

				var tags = _app.articlesService.getTags();

				var oReq = new XMLHttpRequest();

				if (tags.indexOf(Tag) !== -1) {
					alert('This tag is also exist');
					return;
				}

				oReq.open('POST', '/posttags');

				oReq.addEventListener('load', function () {

					var tags = JSON.parse(oReq.responseText).tags;
					tags = tags.join(',');
					tags = tags.split(',');
					resolve(tags);
				});

				// we should tell what kind of body we send
				oReq.setRequestHeader('content-type', 'application/json');

				// transform object to string
				var tagString = JSON.stringify(inputtag);

				// sent request body here as a string
				oReq.send(tagString);
			});
			promiseAddTag.then(function (result) {
				return _this.addTag(result);
			});
		});

		this.addNewButton = document.getElementById('addnew');
		this.addNewButton.addEventListener('click', function () {
			_this.newWindow.style.display = 'block';
		});
		this.newWindow = document.getElementById('new');
		this.newWindow.style.display = 'none';
		this.newClose = document.getElementById('closenew');
		this.newClose.addEventListener('click', function () {
			_this.newWindow.style.display = 'none';
		});

		this.buttonNew = document.getElementById('newbutton');
		this.buttonNew.addEventListener('click', function () {
			var promiseAddNew = new Promise(function (resolve, reject) {

				var article = that.createNew();

				if (!_app.articlesService.validateArticle(article, event.target.className)) {
					return;
				}

				var oReq = new XMLHttpRequest();

				oReq.open('POST', '/articles');

				oReq.addEventListener('load', function () {
					resolve(oReq.responseText);
				});

				// very important!!! we should tell what kind of body we send
				oReq.setRequestHeader('content-type', 'application/json');

				// transform object to string
				var articleString = JSON.stringify(article);

				// sent request body here as a string
				oReq.send(articleString);
			});
			promiseAddNew.then(function (result) {
				return _this.addNew(JSON.parse(result, function (key, value) {
					if (key == 'createdAt') {
						return new Date(value);
					}
					return value;
				})[0]);
			});
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
		this.articleId.addEventListener('click', function () {
			if (event.target.tagName !== 'BUTTON') {
				return;
			}
			var promiseDeleteNew = new Promise(function (resolve, reject) {

				var articleNodeToDelete = event.target.parentElement;
				var idString = articleNodeToDelete.getAttribute('data-id');

				var oReq = new XMLHttpRequest();

				var idObj = { id: idString };

				oReq.open('DELETE', '/deletearticle');

				oReq.addEventListener('load', function () {
					resolve(oReq.responseText);
				});

				// very important!!! we should tell what kind of body we send
				oReq.setRequestHeader('content-type', 'application/json');

				// transform object to string
				idString = JSON.stringify(idObj);

				// sent request body here as a string
				oReq.send(idString);
			});
			promiseDeleteNew.then(function (result) {
				return _this.deleteNew(JSON.parse(result).id);
			});
		});
		this.articleId.addEventListener('click', function () {
			if (event.target.className !== 'ed') {
				return;
			}
			_this.editWindow.style.display = 'block';
		});

		this.editWindow = document.getElementById('editnew');
		this.editWindow.style.display = 'none';
		this.closeEdit = document.getElementById('closeedit');
		this.closeEdit.addEventListener('click', function () {
			_this.editWindow.style.display = 'none';
		});
		this.editButton = document.getElementById('editbutton');
		this.editButton.addEventListener('click', function () {
			var article = _this.createEditedNew();
			var promiseEditNew = new Promise(function (resolve, reject) {
				if (!_app.articlesService.validateArticle(article, event.target.className)) {
					return;
				}

				var oReq = new XMLHttpRequest();

				oReq.open('PUT', '/editarticle');

				oReq.addEventListener('load', function () {
					resolve(oReq.responseText);
				});

				// very important!!! we should tell what kind of body we send
				oReq.setRequestHeader('content-type', 'application/json');

				// transform object to string
				var articleString = JSON.stringify(article);

				// sent request body here as a string
				oReq.send(articleString);
			});
			promiseEditNew.then(function (result) {
				return _this.editArticle(JSON.parse(result));
			});
		});

		this.pagination = document.getElementById('pagination');
		this.pagination.addEventListener('click', this.paginatNews);

		this.cancelfilter = document.getElementById('cancelfilter');
		this.cancelfilter.addEventListener('click', this.cancelFilter);
	}

	_createClass(Portal, [{
		key: 'createNew',
		value: function createNew() {
			var id = document.getElementById('newid').value;
			var title = document.getElementById('newtitle').value;
			var summary = document.getElementById('newsummary').value;
			var content = document.getElementById('newcontent').value;
			var tags = document.getElementById('selecttags');

			var article = {};
			article.id = id;
			article.title = title;
			article.summary = summary;
			article.content = content;
			article.tags = _app.domService.getSelection(tags);
			article.createdAt = new Date();
			article.author = _app.user.user;
			return article;
		}
	}, {
		key: 'createEditedNew',
		value: function createEditedNew() {
			var editid = document.getElementById('editid');
			var id = editid.value;
			var edittitle = document.getElementById('edittitle');
			var editsummary = document.getElementById('editsummary');
			var editcontent = document.getElementById('editcontent');
			var tagsForEdit = document.getElementById('tags-for-edit');
			var selected = _app.domService.getSelection(tagsForEdit);

			var article = _app.articlesService.getArticle(id);

			article.title = edittitle.value;
			article.summary = editsummary.value;
			article.content = editcontent.value;
			article.tags = selected;
			return article;
		}
	}, {
		key: 'paginatNews',
		value: function paginatNews() {
			_app.domService.paginatNews();
			_app.domService.showUserItems(_app.user.user);
		}
	}, {
		key: 'addTag',
		value: function addTag(tagsArray) {
			var inputtag = tagsArray[tagsArray.length - 1];

			var tags = _app.articlesService.getTags();
			var tagWindow = document.getElementById('tag');

			tags.push(inputtag);

			var option = document.createElement('option');
			var option1 = document.createElement('option');
			option.innerHTML = inputtag;
			option1.innerHTML = inputtag;
			_app.domService.filtertag.appendChild(option);
			_app.domService.selecttags.appendChild(option1);
			tagWindow.style.display = 'none';
		}
	}, {
		key: 'addNew',
		value: function addNew(article) {
			this.newWindow.style.display = 'none';
			_app.articlesService.addArticle(article);
			var articles = _app.articlesService.getArticles(0, 6);
			_app.domService.clearNews();
			_app.domService.clearAddNewWindow();
			_app.domService.displayNews(articles);
			_app.domService.showUserItems(_app.user.user);
			_app.domService.showFilterAuthor();
			_app.domService.showPaginationButton();
		}
	}, {
		key: 'deleteNew',
		value: function deleteNew(id) {
			_app.domService.removeNew(id);
			var articles = _app.articlesService.getArticles(0, 6);
			_app.domService.clearNews();
			_app.domService.displayNews(articles);
			_app.domService.showUserItems(_app.user.user);
			_app.domService.showFilterAuthor();
			_app.domService.showPaginationButton();
		}
	}, {
		key: 'readNew',
		value: function readNew() {
			_app.domService.readNew();
		}
	}, {
		key: 'showEditNew',
		value: function showEditNew() {
			_app.domService.showEditNew();
		}
	}, {
		key: 'filterAuthor',
		value: function filterAuthor() {
			var author = _app.domService.getFilterAuthor();
			var obj = {};
			obj.author = author;
			_app.domService.clearNews();
			_app.articlesService.articlesStorage = _app.articlesService.getArticles(0, null, obj);
			_app.domService.displayNews(_app.articlesService.articlesStorage.slice(0, 6));
			_app.domService.showUserItems(_app.user.user);
			_app.domService.showPaginationButton();
		}
	}, {
		key: 'filterTags',
		value: function filterTags() {
			var tags = _app.domService.getFilterTags();
			_app.domService.clearNews();
			var obj = {};
			obj.tags = tags;
			_app.articlesService.articlesStorage = _app.articlesService.getArticles(0, null, obj);
			_app.domService.displayNews(_app.articlesService.articlesStorage.slice(0, 6));
			_app.domService.showUserItems(_app.user.user);
			_app.domService.showPaginationButton();
		}
	}, {
		key: 'filterDate',
		value: function filterDate() {
			var arr = _app.domService.getFilterDates();

			if (!arr[0] && !arr[1]) {
				_app.domService.clearNews();
				var articles = _app.articlesService.getArticles(0, 6);
				_app.domService.displayNews(articles);
				_app.domService.showUserItems(_app.user.user);
				_app.domService.showPaginationButton();
				return;
			}

			arr[0] = arr[0] || 0;
			arr[1] = arr[1] || Date.parse(new Date());

			_app.domService.clearNews();
			_app.articlesService.articlesStorage = _app.articlesService.sortArticlesByDate(arr[0], arr[1]);
			_app.domService.displayNews(_app.articlesService.articlesStorage.slice(0, 6));
			_app.domService.showUserItems(_app.user.user);
			_app.domService.showPaginationButton();
		}
	}, {
		key: 'editArticle',
		value: function editArticle(article) {
			_app.domService.editNew(article);
			this.editWindow.style.display = 'none';
		}
	}, {
		key: 'cancelFilter',
		value: function cancelFilter() {
			var filtertag = document.getElementById('filtertag');
			_app.articlesService.articlesStorage = null;
			_app.domService.clearNews();
			_app.domService.clearSelection(filtertag);
			var articles = _app.articlesService.getArticles(0, 6);
			_app.domService.displayNews(articles);
			_app.domService.showUserItems(_app.user.user);
			_app.domService.showPaginationButton();
		}
	}, {
		key: 'initApp',
		value: function initApp() {
			var articles = _app.articlesService.getArticles(0, 6);
			_app.domService.displayNews(articles);
			_app.domService.showPaginationButton();
			_app.domService.showFilterAuthor();
			_app.domService.showFilterTag();
			_app.domService.showUserItems(_app.user.user);
			_app.domService.showPaginationButton();
		}
	}]);

	return Portal;
}();

exports.default = Portal;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User() {
    _classCallCheck(this, User);

    var that = this;

    var user = document.getElementById('signup').innerHTML;

    var promise = new Promise(function (resolve, reject) {

        var oReq = new XMLHttpRequest();

        oReq.open('POST', '/login');

        oReq.addEventListener('load', function () {
            if (oReq.status === 200 && user !== 'SignUp/SignIn') {
                resolve(that.user = user);
            } else {
                that.user = null;
                resolve(user = 'SignUp/SignIn');
            }
        });
        oReq.send();
    });
    promise.then(function (result) {
        return _app.domService.showUserItems(that.user);
    });
};

exports.default = User;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Clock = function () {
    function Clock() {
        _classCallCheck(this, Clock);
    }

    _createClass(Clock, [{
        key: 'update',
        value: function update() {
            var clock = new Clock(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
            var dateElement = document.getElementById('date');
            var options = {
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            };
            var date = new Date().toLocaleString("en-US", options);
            dateElement.innerHTML = date;
            return setTimeout(clock.update, 1000);
        }
    }]);

    return Clock;
}();

exports.default = Clock;

/***/ })
/******/ ]);