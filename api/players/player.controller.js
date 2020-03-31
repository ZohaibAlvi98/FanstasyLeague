var PlayerModel = require('./player.model')
var LeagueModel = require("../league/league.model")

exports.create = async (req,res) =>{
    
         PlayerModel.create(req.body,async(err,players)=>{
            if(err){
                res.send({
                    success: false,
                    message: err.message
                })
            }
            else{
            
            players.league.forEach(league => {
                LeagueModel.findById({_id: league._id},async(err,updLeague)=>{
                    if(err){
                        res.send({
                            success: false,
                            message: err.message
                        })
                    }
                else{
                   // console.log(players.name)
                    updLeague.Player.push({"name": players.name, "_id": players._id})
                    updLeague.save();
                     res.send({
                         success: true,
                         players,
                         updLeague,
                         message: "SuccessFully Created A Player" 
                     })
                 }
             })
             
            })
                  
        }
     })
       
}