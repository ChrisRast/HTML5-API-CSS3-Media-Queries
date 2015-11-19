jQuery(function () {
    console.log("Battery API: " + Modernizr.batteryapi); //true
    //    if (Modernizr.batteryapi) {
    //    /* @since FF43 */
    //        navigator.getBattery().then(function (battery) {
    //            console.log(battery);
    //            console.log('battery');
    //            insertInto('.status', battery);
    //        });
    //    } else {
    var oldbattery = navigator.battery || navigator.webkitBattery || navigator.mozBattery || navigator.msBattery;
    if (oldbattery) {
        displayInfoBattery(oldbattery);
    }
    //    } //Else
    console.log("Vibration API: " + Modernizr.vibrate); //true
    if (Modernizr.vibrate) {
        toggleSuccess('vibrate');
        $('.triggerVibration').on('click', function () {
            navigator.vibrate($('.vibrationDuration').val());
        })
    }

    console.log("Notification API: " + Modernizr.notification); //true
    if (Modernizr.notification) {
        toggleSuccess('notify');
        $('.triggerNotification').on('click', function () {

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
                    body: $('.notificationText').val()
                }
                var notification = new Notification($('.notificationTitle').val(), notif);

            }
        })
    }


    function toggleSuccess(className) {
        $('.' + className + ' .error, .' + className + ' .success').toggle();

    }

    function displayInfoBattery(battery) {
        toggleSuccess('battery-api');
        $('.status').html(battery.level * 100);
        $('.charging').html(battery.charging);
    }
})