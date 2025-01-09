$('a[href="#"]').click(function (e) {
    e.preventDefault()
})

$('img').each(function () {
    var img = $(this)
    var imgSrc = img.attr('src')
    var imgFile = imgSrc.substring(imgSrc.lastIndexOf('/') + 1, imgSrc.lastIndexOf('.'))
    var imgAlt = img.attr('alt')

    if (!imgAlt) {
        img.attr('alt', imgFile)
    }
})

// FORM
$('.form-control.auto-height').on('input', function () {
    this.style.height = 'auto'
    this.style.height = (this.scrollHeight > 48 ? this.scrollHeight : 48) + 'px'
}).trigger('input')

$('.floating-label .form-control + label').removeAttr('for')
$('.floating-label').each(function () {
    var floatingLabel = $(this)
    floatingLabel.find('.form-control').after(floatingLabel.find('label').clone().addClass('clone'))
    floatingLabel.find('label:not([class])').insertAfter(floatingLabel.find('.form-control'))
})

// NAVTABS
$('.navtabs[tab-id]').each(function () {
    var navtabs = $(this)
    var tabsId = navtabs.attr('tab-id')
    var content = $('.navtabs-content[tab-id=' + tabsId + ']')

    navtabs.find('a').click(function (e) {
        e.preventDefault()
        var targetId = $(this).attr('href').substring(1)

        if ($(this).hasClass('btn')) {
            navtabs.find('a.btn').removeClass('btn-primary').addClass('btn-default')
            $(this).removeClass('btn-default').addClass('btn-primary')
        } else {
            navtabs.find('a').removeAttr('active')
            $(this).attr('active', 'true')
        }

        content.find('*[id]').removeAttr('active').hide()
        $('#' + targetId).attr('active', 'true').show()
    })

    navtabs.find('a[active=true], a.btn-primary').click()
})

// COLLAPSE
$('[collapse-id]').not('.collapse').on('click', function () {
    var collapseId = $(this).attr('collapse-id')
    var collapse = $('.collapse[collapse-id=' + collapseId + ']')

    if (collapse.hasClass('expand')) {
        collapse.css('max-height', '0').removeClass('expand')
    } else {
        var scrollHeight = collapse[0].scrollHeight
        collapse.css('max-height', scrollHeight + 'px').addClass('expand')
    }
})

// ACCORDION
$('.accordion').each(function () {
    var accordion = $(this)
    accordion.find('[accordion=content].expand').each(function () {
        var content = $(this)
        var scrollHeight = content[0].scrollHeight
        var icon = content.prev('[accordion=toggle]').find('.material-symbol')

        content.css('max-height', scrollHeight + 'px')
        if (icon.text() === 'keyboard_arrow_down') {
            icon.text('keyboard_arrow_up')
        } else if (icon.text() === 'add') {
            icon.text('remove')
        }
    })

    accordion.find('[accordion=toggle]').on('click', function () {
        var content = $(this).next('[accordion=content]')
        var icon = $(this).find('.material-symbol')

        if (content.hasClass('expand')) {
            content.css('max-height', '0').removeClass('expand')
            if (icon.text() === 'keyboard_arrow_up') {
                icon.text('keyboard_arrow_down')
            } else if (icon.text() === 'remove') {
                icon.text('add')
            }
        } else {
            var scrollHeight = content[0].scrollHeight

            content.css('max-height', scrollHeight + 'px').addClass('expand')
            if (icon.text() === 'keyboard_arrow_down') {
                icon.text('keyboard_arrow_up')
            } else if (icon.text() === 'add') {
                icon.text('remove')
            }
        }

        accordion.find('[accordion=content]').not(content).css('max-height', '0').removeClass('expand')
        accordion.find('[accordion=toggle]').not(this).find('.material-symbol').each(function () {
            var otherIcon = $(this).text()

            if (otherIcon === 'keyboard_arrow_up') {
                $(this).text('keyboard_arrow_down')
            } else if (otherIcon === 'remove') {
                $(this).text('add')
            }
        })
    })
})

// POPUP
$('.popup').prepend('<div pop-action="close-overlay"></div>')
$('[pop-id]').not('.popup').on('click', function () {
    var popId = $(this).attr('pop-id')
    $('.popup[pop-id=' + popId + ']').addClass('open')
})

$('[pop-action=close],[pop-action=close-overlay]').on('click', function () {
    $('.popup').removeClass('open')
})

// TOOLTIP
$('[tooltip]').each(function () {
    var tooltip = $(this)

    tooltip.hover(
        function () {
            var tooltipText = tooltip.attr('tooltip')
            var tooltipWrapper = $('<div class="tooltip-text">' + tooltipText + '</div>')

            tooltip.append(tooltipWrapper)
            setTimeout(function () {
                tooltipWrapper.addClass('show')
            }, 100)
        },
        function () {
            var tooltipWrapper = tooltip.find('.tooltip-text')

            if ($(this).text().indexOf('Copied') !== -1) {
                return
            }

            tooltipWrapper.removeClass('show')
            setTimeout(function () {
                tooltipWrapper.remove()
            }, 150)
        }
    )
})

// DROPDOWN
$('[dropdown=toggle]').click(function (event) {
    event.preventDefault()
    var content = $(this).next('[dropdown=content]')
    $('[dropdown=content]').not(content).removeClass('open')
    content.toggleClass('open')
})

$(document).click(function (event) {
    if (!$(event.target).closest('.dropdown').length) {
        $('[dropdown=content]').removeClass('open')
    }
})

// COPY BTN
$('.copyBtn').each(function () {
    var copyBtn = $(this)
    var copyBtnText = copyBtn.attr('copy-content') || ''

    copyBtn.on('click', function () {
        navigator.clipboard.writeText(copyBtnText).then(() => {
            var tooltip = copyBtn.find('.tooltip-text')

            if (tooltip.length) {
                tooltip.text('Copied' + (copyBtn.hasClass('text-copied') ? ' : ' + copyBtnText : ''))
            }

            tooltip.addClass('show')

            setTimeout(() => {
                tooltip.removeClass('show')
                setTimeout(() => {
                    tooltip.remove()
                }, 300)
            }, 2000)
        })
    })
})

// COPY GROUP
$('.copyGroup a[copy="trigger"]').each(function () {
    var copyTrigger = $(this)

    copyTrigger.on('click', function () {
        var inputField = $(this).closest('.copyGroup').find('[copy="content"]')
        var textToCopy

        if (inputField.is('input') || inputField.is('textarea')) {
            textToCopy = inputField.val()
        } else {
            textToCopy = inputField.text()
        }

        navigator.clipboard.writeText(textToCopy).then(() => {
            var copyNotification = $('<div class="copy-notif"><span class="material-symbol fill text-success">check_circle</span><span>Copied to Clipboard</span></div>')

            $('body').append(copyNotification)
            setTimeout(function () {
                copyNotification.addClass('show')
            }, 100)

            setTimeout(function () {
                copyNotification.removeClass('show')
                setTimeout(function () {
                    copyNotification.remove()
                }, 500)
            }, 2000)

            if (inputField.is('input') || inputField.is('textarea')) {
                inputField.trigger('focus').select()
            }
        })
    })
})

// ESC KEYDOWN
$(document).keydown(function (e) {
    if (e.keyCode == 27) {
        $('.popup').removeClass('open')
        $('[dropdown=content]').removeClass('open')
    }
})

// UPUP
$('.upup').on('click', function () {
    $('body,html').animate({
        scrollTop: 0
    }, 0)
})