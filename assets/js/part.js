$('.side-navbar').html(`
    <ul class="list-group flex-v gap-8">
        <li class="list-group-item"><a href="/index.html">Home</a></li>
        <li class="divider"></li>
        <li class="list-group-item"><a href="/alert.html">Alert</a></li>
        <li class="list-group-item"><a href="/button.html">Buttons</a></li>
        <li class="list-group-item"><a href="/card.html">Card Set</a></li>
        <li class="list-group-item"><a href="/form.html">Form</a></li>
        <li class="list-group-item"><a href="/formatting.html">Formatting</a></li>
        <li class="list-group-item"><a href="/table.html">Table</a></li>
        <li class="divider"></li>
        <li class="list-group-item"><a href="/collapsible.html">Collapsible</a></li>
        <li class="list-group-item"><a href="/nav.html">Nav</a></li>
        <li class="list-group-item"><a href="/popup.html">Popup</a></li>
        <li class="list-group-item"><a href="/copy.html">Copy Content</a></li>
    </ul>
`);

// ACTIVE MENU
$('.side-navbar ul li a').each(function () {
    if ($(this).prop('href') == window.location.href) {
        $(this).addClass('active');
        $(this).parents('li').addClass('active');
    }
});