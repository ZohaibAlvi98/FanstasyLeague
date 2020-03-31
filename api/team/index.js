'use strict';

var express = require('express');
var controller = require('./team.controller');
var auth = require('../../auth/auth.service');



var router = express.Router();

router.post("/create/:leagueId",auth.isAuthenticated(),controller.create)

// function isLoggedIn(req,res,next){

//   if(req.authenticate()){
//     return next();
//   }
//   res.send({
//       success: "failed",
//       message: "not logged in"
//   })
// }


module.exports = router;
