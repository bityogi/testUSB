const drivelist = require('drivelist');
const _ = require('lodash');

drivelist.list((error, drives) => {
    if (error) {
        console.error('Error getting the drives');
    } else {
        console.log('drives found: ', drives.length);

        _.map(drives, d => {
            if (d.isUSB) {
                console.log('found a USB drive', d);
                console.log('mountpoints: ', d.mountpoints);
            }
        })
    }
});

