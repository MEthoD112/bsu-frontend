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
        top = top || 10;
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
                arr = articles.filter(function(item,i,arr){
                    return item.tags.indexOf(filterConfig.tags[0]) !== -1;
                })
                return arr.splice(skip,top);
            }
        }    
        return articles.slice(skip,top);
    }

    function getArticle(id){
        for (let i = 0; i < articles.length; i++){
            if (articles[i].id === id){
                 return articles[i];
            }
        }
    }

    function validateArticle(article){
        if (!article){
            return false;
        }
        for (let i = 0; i < articles.length; i++){
             if (articles[i].id === article.id){
                 return false;
             }
        }
        for (let i = 0; i < article.tags.length; i++){
            if (tags.indexOf(article.tags[i]) === -1){
                return false;
            }
        }

        if (typeof article.id === 'string' && 
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
        for (let i = 0; i < articles.length; i++){
            if (articles[i].id === id){
                 article.title ? articles[i].title = article.title: article.title;
                 article.summary ? articles[i].summary = article.summary: article.summary;
                 article.content ? articles[i].content = article.content: article.content;
                 return true;
            }
        }
        return false;
    }

    function removeArticle(id){
        for (let i = 0; i < articles.length; i++){
            if (articles[i].id === id){
                articles.splice(i,1);
                return true;
            }
        }
        return false;
    }

    function addTag(tag,id) {
        if (tags.indexOf(tag) === -1){
            throw new Error('Unacceptable tag');
        }
        for (let i = 0; i < articles.length; i++){
            if (articles[i].id === id){
                articles[i].tags.push(tag);
                return true;
            }
        }
        return false;
    }

    function removeTag(tag,id) {
        if (tags.indexOf(tag) === -1){
            throw new Error('Unacceptable tag');
        }
        for (let i = 0; i < articles.length; i++){
            if (articles[i].id === id && articles[i].tags.indexOf(tag) !== -1){
                articles[i].tags.splice(articles[i].tags.indexOf(tag),1);
                return true;
            }
        }
        return false;
    }

    function getAuthors(){
        let arr = [];
        for (let i = 0; i < articles.length; i++){
            if (arr.indexOf(articles[i].author) === -1){
                arr.push(articles[i].author)
            }
        }
        return arr;
    }
    function getTags(){
        return tags;
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
    getTags: getTags
    };
  
}());


let domService = (function () {

    let ul = document.getElementById('article');
    let signup = document.getElementById('signup');
    let addnew = document.getElementById('addnew');
    let addtag = document.getElementById('addtag');
    let filterauthor = document.getElementById('filterauthor');
    let filtertag = document.getElementById('filtertag');
    let user = null;
    var newEdit;
    var newDel;

    function displayNews(articles) {

        for (let i = 0; i < articles.length; i++){

            let li = document.createElement('li');
            let h2 = document.createElement('h2');
            let p = document.createElement('p');
            let span = document.createElement('span');
            let span1 = span.cloneNode(true);
            let span2 = span.cloneNode(true);
            let button = document.createElement('button')
            let button1 = button.cloneNode(true);
            let button2 = button.cloneNode(true);

            li.setAttribute('data-id',articles[i].id)
            h2.innerHTML = articles[i].title;
            p.innerHTML = articles[i].summary;
            span.innerHTML = articles[i].createdAt.toDateString();
            span1.innerHTML = articles[i].author;
            span2.innerHTML = articles[i].tags;
            button.innerHTML = 'Read';
            button1.setAttribute('class','edit');
            button1.innerHTML = 'Edit';
            button2.setAttribute('class','delete');
            button2.innerHTML = 'Delete';

            li.appendChild(h2);
            li.appendChild(p);
            li.appendChild(span);
            li.appendChild(span1);
            li.appendChild(span2);
            li.appendChild(button);
            li.appendChild(button1);
            li.appendChild(button2);
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
            let button = document.createElement('button')
            let button1 = button.cloneNode(true);
            let button2 = button.cloneNode(true);

            li.setAttribute('data-id',article.id)
            h2.innerHTML = article.title;
            p.innerHTML = article.summary;
            span.innerHTML = article.createdAt.toDateString();
            span1.innerHTML = article.author;
            span2.innerHTML = article.tags;
            button.innerHTML = 'Read';
            button1.setAttribute('class','edit');
            button1.innerHTML = 'Edit';
            button2.setAttribute('class','delete');
            button2.innerHTML = 'Delete';

            li.appendChild(h2);
            li.appendChild(p);
            li.appendChild(span);
            li.appendChild(span1);
            li.appendChild(span2);
            li.appendChild(button);
            li.appendChild(button1);
            li.appendChild(button2);
            ul.appendChild(li); 
    }

    function removeNew(id){
        let li = ul.getElementsByTagName('li');
        for (let i = 0; i < li.length; i++) {
            if (li[i].getAttribute('data-id') === id){
                ul.removeChild(li[i]);
            }
        }
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
    
    function showUserItems() {
        var edit = ul.getElementsByClassName('edit');
        var del = ul.getElementsByClassName('delete');
        if (user){
            newEdit = Array.prototype.slice.call(edit);
            newDel = Array.prototype.slice.call(del);

            signup.innerHTML = user;
            addnew.style.display = 'inline-block';
            addtag.style.display = 'inline-block';
           
            for (let i = 0; i < edit.length; i++) {
                edit[i].removeAttribute('class');
                i--;
            }
            for (let j = 0; j < del.length; j++) {
                del[j].removeAttribute('class');
                j--;
            } 
        }    
        if (!user){
            newEdit = newEdit || [];
            newDel = newDel || [];
            signup.innerHTML = 'SignUp';
            addnew.style.display = 'none';
            addtag.style.display = 'none';

            for (let i = 0; i < newEdit.length; i++) {
                newEdit[i].setAttribute('class','edit');
            }
            for (let j = 0; j < newDel.length; j++) {
                newDel[j].setAttribute('class','delete');
            } 
        }
    }

    function showFilterAuthor(){
        let arr = getAuthors();
        for (var i = 0; i < arr.length; i++) {
            let option = document.createElement('option');
            option.innerHTML = arr[i];
            filterauthor.appendChild(option);
        }
    }

    function showFilterTag(){
        let arr = getTags();
        for (var i = 0; i < arr.length; i++) {
            let option = document.createElement('option');
            option.innerHTML = arr[i];
            filtertag.appendChild(option);
        }
    }     
    return {
        displayNews: displayNews,
        addNew: addNew,
        removeNew: removeNew,
        editNew: editNew,
        showUserItems: showUserItems,
        showFilterAuthor: showFilterAuthor,
        showFilterTag: showFilterTag
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

function addArticle(article) {
    if (articlesService.addArticle(article)){
        domService.addNew(article);
    }
}

function getArticles(skip,top,filterConfig){
    domService.displayNews(articlesService.getArticles(skip,top,filterConfig));

}

function removeArticle(id) {
    if (articlesService.removeArticle(id)){
        domService.removeNew(id);
    }
}

function editArticle(id,article) {
    if (articlesService.editArticle(id,article)){
        domService.editNew(id,article);
    }
}