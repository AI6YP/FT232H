#!/usr/bin/env node

const ftdi = require('ftdi');

const TUMPA = { vid: 0x0403, pid: 0x8a99 };

const vendor = TUMPA;

ftdi.find(vendor.vid, vendor.pid, (err, devices) => {
    if (err) { throw err; }
    console.log(devices);
    const device = new ftdi.FtdiDevice(devices[0]);
    device.on('error', err => { throw err; });
    device.open({
        baudrate: 115200,
        databits: 8,
        stopbits: 1,
        parity: 'none',
        bitmode: 0x02,
        bitmask: 0xff
    }, err => {
        if (err) { throw err; }
        device.on('data', data => console.log(data));

        // device.write([0xAB], err => { if (err) { throw err; } });
        // console.log('0xAB ->');

        let i = 256;
        function iter (err) {
            if (err) { throw err; }
            if (i-- > 0) {
                device.write([0x8, i, 0xff], iter);
            }
        }
        iter();

        console.log('ADBUS output ->');

    });
});
