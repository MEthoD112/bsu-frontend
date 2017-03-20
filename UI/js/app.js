'use strict'

let articlesService = (function () {
    let articles = [
      {
        id: '1',
        title: 'Минское «Динамо» обыграло ярославский «Локомотив»',
        summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
        createdAt: new Date('2017-02-27T23:00:00'),
        author: 'Иванов Иван',
        content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.',
        tags: ['sport']
       },
       {
        id: '2',
        title: 'Что изменится с 1 марта',
        summary: 'Что изменится с 1 марта: подорожают сигареты и звонки со стационарных телефонов',
        createdAt: new Date('2017-01-27T23:01:08'),
        author: 'Петров Петр',
        content: 'С 1 марта вырастут цены на некоторые марки белорусских сигарет. В частности, подорожает продукция Гродненской табачной фабрики «Неман» — на 2−9 копеек за пачку. Некоторые виды Oscar станут дороже на 2 копейки, Pall Mall Red — на 5 копеек, а некоторые виды Cooper — на 9 копеек.',
        tags: ['social','economic']
       },
       {
        id: '3',
        title: 'Газпром" повысит стоимость газа для Евросоюза',
        summary: 'Экспортная стоимость газа для Евросоюза в текущем году может составить 180−190 долларов за тысячу кубометров.',
        createdAt: new Date('2017-02-14T11:11:11'),
        author: 'Сидоров Сидр',
        content: 'Он отметил, что в 2016-м европейские страны платили за топливо меньше — порядка 167 долларов за тысячу кубометров. «Европа была, есть и остается приоритетным рынком для „Газпрома“», — добавил представитель российской компании.',
        tags : ['economic']
       },
       {
        id: '4',
        title: 'Беларусь продолжит взаимодействие с ЕС.',
        summary: 'МИД: Беларусь продолжит взаимодействие с ЕС для полной отмены санкций.',
        createdAt: new Date('2017-01-14T15:10:10'),
        author: 'Иванов Иван',
        content: 'Белорусская сторона продолжит взаимодействие с ЕС в целях полной отмены санкций, заявили в МИД Беларуси, комментируя решение Евросоюза продлить на год оружейное эмбарго в отношении нашей страны и санкции в отношении четырех чиновников.',
        tags: ['politics']
       },
       {
        id: '5',
        title: 'Суд над бывшим и.о. начальника ГАИ Барановичей',
        summary: 'Бывший и.о. начальника ГАИ Барановичей, обвиняемый в смертельном ДТП, признал вину полностью',
        createdAt: new Date('2017-02-02T08:00:00'),
        author: 'Петров Петр',
        content: 'Суд Ляховичского района 28 февраля начал рассмотрение уголовного дела по обвинению бывшего временно исполняющего обязанности начальника ОГАИ Барановичского ГОВД Андрея Волковыцкого в ДТП, которое унесло жизнь 36-летней женщины.',
        tags: ['criminals']
       },
       {
        id: '6',
        title: 'В Минске пройдет женский забег',
        summary: 'Две тысячи девушек и перекрытый проспект. В Минске пройдет массовый женский забег',
        createdAt: new Date('2017-02-22T13:20:00'),
        author: 'Сидоров Сидр',
        content: 'Восьмого марта в центре Минска пройдет большой забег Beauty Run, в котором примут участие исключительно девушки. В федерации легкой атлетики рассказали, как организуют мероприятие и чем оно будет интересно также мужчинам.',
        tags: ['social']
       },
       {
        id: '7',
        title: 'Строительство "БелБиограда"',
        summary: 'Жильцы домов по Скорины собирают подписи против строительства "БелБиограда"',
        createdAt: new Date('2017-02-02T13:00:40'),
        author: 'Иванов Иван',
        content: 'Жильцы домов на улице Скорины собирают подписи против строительства научно-технологического парка «БелБиоград». Проект входит в план детального планирования застройки района, который сейчас обсуждают в Первомайском районе.',
        tags: ['social']
       },
       {
        id: '8',
        title: 'В Минске за сутки горели шесть автомобилей',
        summary: 'За прошедшие сутки в Минске спасатели получили 4 сообщения о загорании автомобилей.',
        createdAt: new Date('2017-02-05T17:00:00'),
        author: 'Петров Петр',
        content: 'Первый пожар произошел утром 27 февраля напротив здания № 10 по улице Толстого — горел Peugeot 307. Спасатели установили, что пожар произошел в моторном отсеке автомобиля.',
        tags: ['accident']
       },
       {
        id: '9',
        title: 'В Минске троллейбус сбил 86-летнего пенсионера',
        summary: 'Наезд произошел днем 27 февраля на столичной улице Ванеева.',
        createdAt: new Date('2017-01-21T13:00:00'),
        author: 'Сидоров Сидр',
        content: 'По предварительной информации, 86-летний мужчина начал переходить дорогу вне пешеходного перехода и попал под троллейбус, который отъезжал от остановочного пункта.',
        tags: ['accident']
       },
       {
        id: '10',
        title: 'Митинг в Куропатах',
        summary: 'Возле стройки в Куропатах гражданские активисты провели очередной митинг.',
        createdAt: new Date('2017-02-10T16:00:00'),
        author: 'Иванов Иван',
        content: 'Сегодня оппозиция снова призвала всех собраться на акцию протеста в Куропатах против возведения бизнес-центра в бывшей охранной зоне.',
        tags: ['social']
       },
       {
        id: '11',
        title: 'Беларусь в IT',
        summary: 'Беларусь: IT-чудо или небольшой региональный игрок с сотыми долями процента рынка',
        createdAt: new Date('2017-01-31T03:00:00'),
        author: 'Петров Петр',
        content: 'Оборот отрасли разработки ПО в Беларуси превысил 1 млрд долларов и вырос в 20 раз за 10 лет.',
        tags: ['economic']
       },
       {
        id: '12',
        title: 'Силовики и бизнес',
        summary: 'Как девальвируются отношения бизнеса и силовиков',
        createdAt: new Date('2017-02-20T20:00:00'),
        author: 'Сидоров Сидр',
        content: 'В последнее время в информационном пространстве прослеживались два потока новостей, которые вызывали дискуссии.',
        tags: ['bisness','goverment']
       },
       {
        id: '13',
        title: 'Оружейное эмбарго против Минска»',
        summary: 'ЕС продлил на год оружейное эмбарго против Минска, исключив из него ружья для биатлона',
        createdAt: new Date('2017-01-21T13:00:00'),
        author: 'Иванов Иван',
        content: 'Евросоюз продлил на год оружейное эмбарго в отношении Беларуси и санкции в отношении четырех чиновников, которых Брюссель подозревает в причастности к громким исчезновениям 1999−2000 годов.',
        tags: ['politics','economic']
       },
       {
        id: '14',
        title: 'Суд над Казакевичем',
        summary: 'Прокурор попросил для Казакевича 15 лет. Обвиняемый: "Еще вернусь, чтобы закончить начатое"',
        createdAt: new Date('2017-02-14T14:00:00'),
        author: 'Петров Петр',
        content: 'Во время суда 18-летний Влад Казакевич полностью признал свою вину, но не раскаялся. Он пожалел лишь о том, что жертв было мало.',
        tags: ['criminals']
       },
       {
        id: '15',
        title: 'Убийство брата Ким Чен Ина.',
        summary: 'Корейские СМИ: убийцы старшего брата Ким Чен Ына бежали через Россию',
        createdAt: new Date('2016-02-17T17:00:00'),
        author: 'Сидоров Сидр',
        content: ' По данным южнокорейских СМИ, предполагаемые убийцы брата диктатора скрылись через Москву и Владивосток, при этом российская сторона отказалась их задерживать, несмотря на просьбу корейских коллег.',
        tags: ['criminals']
       },
       {
        id: '16',
        title: 'Утечка информации из Белого Дома',
        summary: 'Трамп: за утечкой информации, дискредитирующей Белый дом, стоит Обама и его люди',
        createdAt: new Date('2017-02-28T21:00:00'),
        author: 'Иванов Иван',
        content: 'Трамп: за утечкой информации, дискредитирующей Белый дом, стоит Обама и его люди.',
        tags: ['politics']
       },
       {
        id: '17',
        title: 'Гибель людей в Литве',
        summary: 'В Литве зафиксирована гибель лебедей от крайне опасного штамма птичьего гриппа.',
        createdAt: new Date('2017-02-22T22:00:00'),
        author: 'Петров Петр',
        content: 'В Литве констатирован птичий грипп: случай гибели шести лебедей-шипунов от крайне опасного варианта птичьего гриппа — штамма H5N8 — зарегистрирован в Каунасе у реки Неман.',
        tags: ['accident']
       },
       {
        id: '18',
        title: 'США увеличило оборонные расходы.',
        summary: '"Не для новой гонки вооружений". Трамп хочет увеличить оборонные расходы на 54 млрд долларов',
        createdAt: new Date('2017-02-19T19:00:00'),
        author: 'Сидоров Сидр',
        content: 'Увеличение оборонного бюджета, которое планирует запросить у Конгресса администрация президента США Дональда Трампа, не направлено на запуск новой гонки вооружений.',
        tags: ['politics','economic']
       },
       {
        id: '19',
        title: 'Министр - милиардер',
        summary: 'Сенат США утвердил на посту министра торговли 79-летнего миллиардера',
        createdAt: new Date('2017-01-31T23:00:00'),
        author: 'Иванов Иван',
        content: 'Сенат США проголосовал за назначение миллиардера Уилбора Росса министром торговли Соединенных Штатов.',
        tags: ['politics']
       },
       {
        id: '20',
        title: 'Падение самолета в Калифорнии',
        summary: 'В Калифорнии легкий самолет упал на жилые дома. Есть жертвы.',
        createdAt: new Date('2017-02-26T12:12:00'),
        author: 'Петров Петр',
        content: 'Четыре человека погибли, еще два получили ранения в понедельник после того, как небольшой самолет упал на жилые дома в американском городе Риверсайд (штат Калифорния).',
        tags: ['accident']
       },
    ];
    let article = {
        id: '21',
        title: 'Падение самолета в Калифорнии',
        summary: 'В Калифорнии легкий самолет упал на жилые дома. Есть жертвы.',
        createdAt: new Date('2017-02-26T12:12:00'),
        author: 'Петров Петр',
        content: 'Четыре человека погибли, еще два получили ранения в понедельник после того, как небольшой самолет упал на жилые дома в американском городе Риверсайд (штат Калифорния).',
        tags: ['accident']
       };
    let tags = ['sport','politics','economic','criminals','social','accident','goverment','bisness'];
      
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
            return true;
        }
        return false;
    }

    function editArticle(id,article){

        let artic = getArticle(id);

        if (artic.id === id){
            article.title ? artic.title = article.title: article.title;
            article.summary ? artic.summary = article.summary: article.summary;
            article.content ? artic.content = article.content: article.content;
            return true;
        }
        return false;
    }

    function removeArticle(id){
        articles.forEach(function(item,i){
            if (item.id === id){
                articles.splice(i,1);
                return true;
            }
        })
        return false;
    }

    function addTag(tag,id) {
        if (tags.indexOf(tag) === -1){
            throw new Error('Unacceptable tag');
        }

        let art = getArticle(id);

        if (art){
            art.tags.push(tag);
            return true;
        }
        return false;
    }

    function removeTag(tag,id) {
        if (tags.indexOf(tag) === -1){
            throw new Error('Unacceptable tag');
        }

        let arc = getArticle(id);
        var bool = false;

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
    sortArticlesByDate: sortArticlesByDate
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

        let h2 = document.getElementsByClassName('newtitle')[0];
        let p = document.getElementsByClassName('newcontent')[0];
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

        let editid = document.getElementById('editid');
        let edittitle = document.getElementById('edittitle');
        let editsummary = document.getElementById('editsummary');
        let editcontent = document.getElementById('editcontent');
        let tagsvalue = document.getElementsByClassName('tagsvalue')[0];

        editid.value = article.id;
        edittitle.value = article.title;
        editsummary.value = article.summary;
        editcontent.value = article.content;
        tagsvalue.innerHTML = article.tags.join(',');


    }
    function editNew(id,article){
        let li = ul.getElementsByTagName('li');
        for (let i = 0; i < li.length; i++) {
            if (li[i].getAttribute('data-id') === id){

                let h2 = li[i].getElementsByTagName('h2')[0];
                let p = li[i].getElementsByTagName('p')[0];
                let span = li[i].getElementsByTagName('span')[2];
                
                article.title ? h2.innerHTML = article.title: article.title;
                article.summary ? p.innerHTML = article.summary: article.summary;
                article.tags ? span.innerHTML = article.tags: article.tags;
            }
        }
    }
    function showUserItems(user) {
        var edit = ul.getElementsByClassName('ed');
        var del = ul.getElementsByClassName('del');

        var newEdit = Array.prototype.slice.call(edit);
        var newDel = Array.prototype.slice.call(del);

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
        var newOpt = Array.prototype.slice.call(opt);

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

        for (var i = 0; i < arr.length; i++) {
            let option = document.createElement('option');
            option.innerHTML = arr[i];
            filtertag.appendChild(option);
        }
        for (var i = 0; i < arr.length; i++) {
            let option = document.createElement('option');
            option.innerHTML = arr[i];
            selecttags.appendChild(option);
        }
    }   
    function getFilterAuthor() {
        var selectedAuthor = filterauthor.value;
        return selectedAuthor;
    } 
    function getFilterTags(){
        let tags = getSelection(filtertag);
        return tags;
    }
    function getFilterDates() {
        let start = startdate.value;
        let end = enddate.value;
        let arr = [];
        arr[0] = Date.parse(start);
        arr[1] = Date.parse(end);
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
        var selectedOptions = [];
        for (var i = 0; i < o.options.length; i++) 
            if (o.options[i].selected) 
                selectedOptions.push(o.options[i].value);
        return selectedOptions;
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
        showEditNew: showEditNew
        };
  
}());   

let article = {
        id: '21',
        title: 'Падение самолета в Калифорнии',
        summary: 'В Калифорнии легкий самолет упал на жилые дома. Есть жертвы.',
        createdAt: new Date('2017-02-26T12:12:00'),
        author: 'Петров Петр',
        content: 'Четыре человека погибли, еще два получили ранения в понедельник после того, как небольшой самолет упал на жилые дома в американском городе Риверсайд (штат Калифорния).',
        tags: ['accident']
       };
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

function signUser() {
    let inputname = document.getElementById('sign');
    user = inputname.value;
    domService.showUserItems(user);
}
function signOut() {
    user = null;
    domService.showUserItems(user);
}
function getArticles(skip,top,filterConfig){
    domService.displayNews(articlesService.getArticles(skip,top,filterConfig));
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

    if (articlesService.validateArticle(article)){
        articlesService.addArticle(article);
        domService.addNew(article);
        domService.showUserItems(user);
        domService.showFilterAuthor();
        return article;
    }
    alert('your article is not valid');
}
function deleteNew(){
    domService.removeNew();
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
        domService.displayNews(articlesService.getArticles());
        domService.showUserItems(user);
        return;
    }
    let obj = {};
    obj.author = author;
    domService.clearNews();
    domService.displayNews(articlesService.getArticles(0,10,obj));
    domService.showUserItems(user);
}
function filterTags() {
    let tags = domService.getFilterTags();
    if (tags[0] === 'No filter'){
        domService.clearNews();
        domService.displayNews(articlesService.getArticles());
        domService.showUserItems(user);
        return;
    }
    domService.clearNews();
    let obj = {};
    obj.tags = tags;
    domService.displayNews(articlesService.getArticles(0,10,obj));
    domService.showUserItems(user);
}
function filterDate() {
    let arr = domService.getFilterDates();
    if (!arr[0] && !arr[1]){
        alert('Choose the start or end date');
        return;
    }
    arr[0] = arr[0] || 0;
    arr[1] = arr[1] || Date.parse(new Date('2117-02-26T12:12:00'));

    domService.clearNews();
    domService.displayNews(articlesService.sortArticlesByDate(arr[0],arr[1]));
    domService.showUserItems(user);
}
function editArticle(id,article) {
    if (articlesService.editArticle(id,article)){
        domService.editNew(id,article);
    }
}

document.addEventListener("DOMContentLoaded", domService);
getArticles(0,10);
domService.showFilterAuthor();
domService.showFilterTag();
domService.showUserItems(user);