$(function () {
    //on page load
    hljs.initHighlighting();
    displayBatteryInfos();
    getNetworkInfo();
    generateIndex();
    detectVisibility();
    //Hide manifest part with JS to keep the display block after
    $('#manifest').hide();
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
function getManifest() {
    $.get($('link[rel="manifest"]').attr('href'), function (data) {
        $('#manifest code').html(data);
        hljs.highlightBlock($('#manifest')[0]);
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
 * Creates a listener which triggers an event when the visibility of the page is changed.
 * @event visibilitychange#triggered when the page is hidden (switch tab) or displayed (return to tab).
 * 
 */
function detectVisibility() {
    $('.originalV8yState').text(document.visibilityState);
    $(document).on('visibilitychange', function (event) {
        $('.v8y .content').append(
            '<p>Visibility has changed (' +
            document.visibilityState +
            ')!</p>'
        );
    });
}



/**
 * Tries to retrieve the user's location.
 */
function triggerGeolocation() {
    navigator.geolocation.getCurrentPosition(function (location) {
        //Success
        $('.long').html(location.coords.longitude)
        $('.lat').html(location.coords.latitude)
        $('.geoloc .content').append('<a href="http://maps.google.com/maps?&z=15&q=' + location.coords.latitude + '+' + location.coords.longitude + '&ll=' + location.coords.latitude + '+' + location.coords.longitude + '" target="_blank">Open in Google Maps.</a>')
    }, function (error) {
        //Error
        $('.geoloc .content').html(error.message);
    });
}


function getNetworkInfo() {
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
        $('.networkinfo').html(connection);
    } else {
        $('.network').remove();
    }
}

/**
 * Displays your device battery information
 * @since Available since Firefox 43
 */
function displayBatteryInfos() {
    navigator.getBattery().then(function (battery) {
        $('.status').html(battery.level * 100);
        $('.charging').html("" + battery.charging + "");
    });
}


/**
 * Makes your device vibrate
 */
function triggerVibration() {
    navigator.vibrate($('.vibrationDuration').val());
}

function requestFullScreen() {
    var element = document.getElementById('makemefullscreen');
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}