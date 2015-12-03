$(function () {
    //on page load
    hljs.initHighlighting();
    displayBatteryInfos();
    generateIndex();
});

function generateIndex() {
    $('#index').html('');
    $('.api').each(function (i, e) {
        $('#index').append('<li><a href="#' + $(e).attr('id') + '">' + $(e).attr('id') + '</a></li>');
    });
}

/**
 * Displays the currently used manifest.json
 */
function getManifest(){
    $.get($('link[rel="manifest"]').attr('href'), function(data) {
        $('#manifest').hide().html(data);
        hljs.highlightBlock($('#manifest').get(0));
        $('#manifest').show();
    }, "text")
}


/**
 * Pops a notification on your device
 */
function triggerNotification() {

    if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        createNotification();
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                createNotification();
            }
        });
    }

    function createNotification() {
        var notif = {
            body: $('.notificationText').val(),
            icon: 'img/html5api-3x.png'
        }
        var notification = new Notification($('.notificationTitle').val(), notif);

    }
}




/**
 * Makes your device vibrate
 */
function triggerVibration() {
    navigator.vibrate($('.vibrationDuration').val());
}

/**
 * Displays your device battery information
 */
function displayBatteryInfos() {
    /* @since FF43 */
    navigator.getBattery().then(function (battery) {
        $('.status').html(battery.level * 100);
        $('.charging').html(""+battery.charging+"");
    });
}