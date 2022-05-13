var Razorpay = require('razorpay');
var express = require('express');

var instance = new Razorpay({ 
     key_id: 'rzp_test_IDwOmiq4ODFVSi', 
 key_secret: 'kX1W7Yf6GFWiBKaH5QmnXGBh',
});

console.log("connected")

module.exports = instance;

