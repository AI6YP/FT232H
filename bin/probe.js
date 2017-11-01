#!/usr/bin/env node

const usb = require('usb');

const vendor = {
    idVendor: 0x0403,
    idProduct: 0x8a99
};

const list1 = usb.getDeviceList();

const list2 = list1.map(e => (
    (e.deviceDescriptor.idVendor === vendor.idVendor) ? '+' : '-')
).join('');

console.log(list2);

const theDevice = usb.findByIds(vendor.idVendor, vendor.idProduct);

// console.log(theDevice);

theDevice.open();
theDevice.reset(err => {
    if (err) { throw err; }
    console.log(theDevice);
});
