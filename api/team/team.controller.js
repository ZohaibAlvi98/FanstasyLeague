const UserSessionModel = require('../userSession/userSession.model');
const UserModel = require('../user/user.model');
var LeagueModel = require("../league/league.model")
const LeagueService = require("../league/league.services")
const teamModel = require("./team.model")
const teamServices = require("./team.services");


const duplicateError = require("mongoose-extract-duplicate-field")



exports.create = async function(req,res){
    try{
      //  console.log("here")
        req.body.user = req.user._id;
        req.body.league = req.params.leagueId
     //  console.log(req.body) 
            // LeagueService.update(req.params.leagueId,req.body.user)
            // .then( async function(upd){
                let league =  await LeagueModel.findById({_id:req.body.league})
              //  console.log("here")
               
                    if(league.user.indexOf(req.body.user) != -1){
                       
                        res.send({
                            success: false,
                            message: "You Have Already Created A Team In This League"
                        })
                     }
                 else{
                        teamServices.create(req.body)
                        .then( async function(createdTeam){
                           
                          
                            // createdTeam['player'].players.push({"_id": req.body.player1},{"_id": req.body.player2},{"_id":req.body.player3},
                            //  {"_id":req.body.player4},{"_id":req.body.player5},{"_id":req.body.player6},{"_id":req.body.player7},{"_id":req.body.player8}
                            //  ,{"_id":req.body.player9},{"_id":req.body.player10},{"_id":req.body.player11})
                            //  createdTeam.save()  
                            var check=0,
                            checkPlayer=0;
                            var playersArr = []
                
                            // For duplicate players or limit exceeding from 11 not allowed 
                
                            createdTeam.player.forEach(async (player) => {
                                checkPlayer++;
                                player = JSON.stringify(player._id)
                              
                                 if(playersArr.indexOf(player) != -1 || checkPlayer > 11){
                                
                                     check++;
                                     
                                //      teamModel.remove({_id: createdTeam.id}).then(  
                                //         res.send({
                                //         success: false,
                                //         message: "You Cannot Use Player Twice Or Your Amount Of Player Excceded The Limit Of 11"
                                //   }))
                                      
                             }
                             playersArr.push(player)
                            })
                            if(check == 0){
                                // league.user.push({_id: req.body.user})
                                // league.user.save()
                               // await LeagueModel.update({id:req.params.leagueId, $set: {team : createdTeam.id, user:req.body.user}}).then(
                                   league.user.push({"_id":req.body.user})
                                   league.team.push({"_id":createdTeam._id})
                                   league.save();
                                res.send({
                                    success: true,
                                    createdTeam,
                                    message: "You have successfully created team."
                                })
                            }
                                
                        }).catch( async function(error){
                            if(error && error.code == 11000){
                                var dupErr = duplicateError(error);
                              // await LeagueModel.remove({user: req.user._id})
                                 
                                if(dupErr == "name")res.status(422).send(['This team name is already be in use'])
                                if(dupErr == "user")res.status(422).send(['You have already created a team. You cannot create more'])
                            }
                            else{
                                res.send({
                                    success: false,
                                    
                                    message: error.message
                              })
                        }
                    })
                    
                    }
                    
                //    }).catch( function(error){
                //      res.send({
                //          success: false,
                         
                //          message: error.message
                //          })   
                //     })
                
        
        
    } catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
  
    
    
}
