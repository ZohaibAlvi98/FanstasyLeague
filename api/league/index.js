'use strict';

var express = require('express');
var controller = require('./league.controller');
var auth = require('../../auth/auth.service');


var router = express.Router();

router.post("/create-league",auth.isAdmin(),controller.create);

router.get("/league-by-ids",controller.ids)

router.get("/find-user-team/:leagueId",auth.isAuthenticated(),controller.userTeam)

router.get("/edit-team/:teamId/:leagueId",auth.isAuthenticated(),controller.editTeam)

router.post("/edit-update/:leagueId",auth.isAuthenticated(),controller.update)

router.get("/points-table/:leagueId",auth.isAuthenticated(),controller.pointsTable)

module.exports = router;