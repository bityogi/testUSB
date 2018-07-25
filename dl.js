const drivelist = require('drivelist');
const _ = require('lodash');
const Q = require('q');

let tries = 0;

function getMountPoint() {
    let deferred = Q.defer();

    drivelist.list((error, drives) => {
        if (error) {
            console.error('Error getting the drives');
        } else {
            console.log('drives found: ', drives.length);
    
            _.map(drives, d => {
                if (d.isUSB) {
                    console.log('found a USB drive', d);
                    deferred.resolve(d.mountpoints);
                }
            })
        }
    });

    return deferred.promise;
}

function getMountWithLoop() {

    getMountPoint()
        .then(mountPoint => {
            tries++;
            if ((mountPoint.length > 0) && (!_.isEmpty(mountPoint[0].path))) {
                console.log('Got mountpoint in %s tries!', tries);
                console.log('mountPoint = ', mountPoint);
            } else {
                if (tries < 10) {
                    console.log('No moutpoint found. Tries so far: %s. Trying again!', tries);
                    console.log('-----------------------------------------')
                    getMountWithLoop();
                } else {
                    console.log('Tried %s tries. No luck');
                }
            }
            
        })
        .catch(error => {
            tries++;
            console.error('Error getting mountpoint: ', error);
        });
}

getMountWithLoop();






