var express = require('express');
var router = express.Router();
const con = require('../config/key');
var order = function (id, address, customerName, orderName, sumMoney, status, create) {
   this.id = id;
   this.address = address;
   this.customerName = customerName;
   this.orderName = orderName;
   this.sumMoney = sumMoney;
   this.status = status;
   this.create = create;
}
router.getIndex = (req,res,next) =>{
   con.query('Select * from demo', function(err,rows,fields)
   {
      if (err) throw err
      else{
         console.log(rows);
         ordersAll=[];
         rows.forEach(element => {
            var x = new order(element.name, element.grade, element.phone, element.a, element.sum_money, 2);
            ordersAll.push(x);
          });
          console.log(ordersAll);
          res.render('index',{orders: ordersAll});
      }
   })
   
}
router.login = (req,res,next) =>{
   var message = "bs";
   res.render('login/login', {message: message});
}
router.postLogin = (req,res,next) =>
{
   res.redirect('/');
}
module.exports =router;