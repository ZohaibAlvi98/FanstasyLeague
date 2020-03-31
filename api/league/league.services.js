
var LeagueModel = require("./league.model")

exports.findById = function(leagueId){
    return new Promise(function(resolve,reject){
        //console.log(" services here")
        LeagueModel.findById(leagueId,function(err,league){
           // console.log(" services here")
            if(err){
                
                reject(err);
            }else{
                
                resolve(league);
            }
        })
        
    })
}

exports.findByIdAndUpdate = function(leagueId,userId){
    return new Promise(function(resolve,reject){
        LeagueModel.findByIdAndUpdate(leagueId, { $addToSet: {user : userId } },
          function(err,league){
            if(err){
                reject(err);
            }else{
               
                resolve(league);
                
            }
        })
    //     LeagueModel.findById(leagueId,function(err,league){
    //         // console.log(" services here")
    //          if(err){
                 
    //              reject(err);
    //          }else{
    //             console.log(" services here")
    //              resolve(league);
    //          }
    //      })
    })
}


exports.update = function(leagueId,userId){
    return new Promise(function(resolve,reject){
        // console.log("here")
        // console.log(leagueId)
        // console.log(userId)
        let league
        LeagueModel.updateOne({leagueId,  $addToSet: {user : userId } },
          function(err,league){
            if(err){
                console.log(err)
                reject(err);
            }else{
              
                // if(league.nModified == 0){
                //     league = LeagueModel.find({_id:leagueId})
                //     if(league.user.indexOf(userId)){

                //     }
                // }
                resolve(league);
                
            }
        })
    })
}
