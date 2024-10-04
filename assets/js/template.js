// ACTIVE MENU
$('.navbar nav>ul>li>a,.navbar nav .dropdown ul li a').each(function () {
    var currentHref = $(this).prop('href');

    if (currentHref === window.location.href) {
        $(this).addClass('active');
        $(this).parents('li').addClass('active');
    }
});