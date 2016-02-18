
//**************************************************************************************************

window.addEventListener("scroll", asideFix, false);
window.addEventListener("resize", asideFix, false);

//**************************************************************************************************

function asideFix() {

    var aside = document.getElementById("aside");
    var article = document.getElementById("article");
    var footer = document.getElementById("footer");

    // Высота окна браузера
    var clientHeight = document.documentElement.clientHeight;
    // Высота элемента article
    var articleHeight = article.offsetHeight;
    // Высота элемента aside
    var asideHeight = aside.offsetHeight;
    // Текущая прокрутка сверху
    var pageYOffset = window.pageYOffset;
    // Видимая высота footer'а
    var footerHeight = clientHeight - footer.getBoundingClientRect().top;
    if ( footerHeight < 0 ) { footerHeight = 0; }
    // Ширина родительского элемента ( wrapper )
    var offsetWidth = aside.parentNode.offsetWidth;

    // Нет необходимости фиксировать aside
    if ( asideHeight >= articleHeight ) {
        setUnFix();
        return;
    }

    // Высота плавающего элемента(с отступами)
    // меньше высоты окна браузера
    if ( 50 + 20 + asideHeight + 20 + footerHeight < clientHeight ) {
        setFixTop();
        return;
    }

    // Прокрутка увеличивается, а элемент дальше не двигается
    if ( 50 + 20 + (asideHeight-clientHeight) + 20 + footerHeight <= pageYOffset ) {
        setFixBottom();
    }
    else {
        setUnFix();
    }

    //----------------------------------------------------------------------------------------------

    function setFixTop() {
        // Фиксируем плавающий элемент сверху
        aside.style.position = "fixed";
        aside.style.top = 50 + 20 + "px";
        aside.style.bottom = "auto";
        aside.style.marginLeft = ( offsetWidth - 300 - 10 ) + "px";
    }

    function setFixBottom() {
        // Фиксируем плавающий элемент снизу
        aside.style.position = "fixed";
        aside.style.top = "auto";
        aside.style.bottom = footerHeight + 20 + "px";
        aside.style.marginLeft = ( offsetWidth - 300 - 10 ) + "px";
    }

    function setUnFix() {
        // Отпускаем плавающий элемент
        aside.style.position = "static";
        aside.style.top = "auto";
        aside.style.bottom = "auto";
        aside.style.marginLeft = "calc( 100% - 300px - 10px )";
    }

}

//**************************************************************************************************
