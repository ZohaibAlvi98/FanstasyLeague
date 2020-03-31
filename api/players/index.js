'use strict';

var express = require('express');
var controller = require('./player.controller.js');
var auth = require('../../auth/auth.service');



var router = express.Router();

router.post("/create-player", auth.isAdmin(), controller.create)



// function isLoggedIn(req,res,next){

//   if(req.isAuthenticated()){
//     return next();
//   }
//   res.send({
//       success: "failed",
//       message: "not logged in"
//   })
// }


module.exports = router;
