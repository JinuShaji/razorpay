var express = require('express');
const async = require('hbs/lib/async');
var Razorpay = require('../razorpay/razorpay')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',);
});
router.post('/payment',(req,res)=>{
  var amount = req.body.amount;
  var options = {
    amount: amount*100,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  Razorpay.orders.create(options, function(err, order) {
    console.log(order);
    res.render('payment',{order})
  });
})
router.post('/paymentverify',async(req,res)=>{
  var crypto = require('crypto');
  console.log("payment verifed");
  console.log(req.body);
  var data = req.body;
  const order_id= data['response[razorpay_order_id]'];
  const payment_id=data['response[razorpay_payment_id]'];
  const razorpay_signature= data['response[razorpay_signature]'];
  const key_secret = 'kX1W7Yf6GFWiBKaH5QmnXGBh';

  let hmac = crypto.createHmac('sha256', key_secret); 
 await hmac.update(order_id + "|" + payment_id);
  const generated_signature = hmac.digest('hex');

  if(razorpay_signature===generated_signature){
    console.log("payment success")  
      } else
    console.log("payment falied")  

})
module.exports = router;
