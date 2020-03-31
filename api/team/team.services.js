
var team = require("./team.model")

exports.create = function(TeamData){
    return new Promise(function(resolve,reject){
        team.create(TeamData,function(err,team){
          
            if(err){
              
                reject(err);
            }else{
                
                resolve(team);
            }
        })
        
    })
}

exports.findById = function(teamId){
    return new Promise(function(resolve,reject){
        team.findById(teamId,function(err,team){
            if(err){
                reject(err);
            }else if(!team){
                reject('team not found.');
            }else{
                resolve(team);
            }
        })
        
    })
}

exports.update = function(query,data,options){
    return new Promise(function(resolve,reject){
        team.update(query,data,options,function(err,result){
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        })
        
    })
}

exports.find = function(query){
    return new Promise(function(resolve,reject){
        team.find(query,function(err,teams){
            if(err){
                reject(err);
            }else{
                resolve(teams);
            }
        })
        
    })
}
exports.findOne = function(query){
    return new Promise(function(resolve,reject){
        team.findOne(query,function(err,team){
            if(err){
                reject(err);
            }else{
                resolve(team);
            }
        })
        
    })
}