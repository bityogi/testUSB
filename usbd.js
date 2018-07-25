const usbDetect = require('usb-detection');

usbDetect.find((err, devices) => {
    if (err) {
        console.error('Error finding usb devices with usb-detection: ', err)
    } else {
        console.log('devices found: ', devices.length);
        console.log('devices: ', devices);
    }
})