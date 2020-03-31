var LeagueModel = require("./league.model") 

var PlayerModel = require("../players/player.model")

var TeamModel = require("../team/team.model")
const LeagueServices = require("./league.services")
const UserModel = require("../user/user.model")


exports.create = async(req,res) => {
   
    await LeagueModel.create(req.body,async(err,CreatedLeague)=>{
        res.send({
            success: true,
            CreatedLeague,
            message: "You have created the League."
        })
    })
   
}

exports.ids = async(req,res)=>{
    const id=[]
    await LeagueModel.find({},async(err,League)=>{
        League.forEach(league => {
            id.push({"name":league.name, "_id": league._id})
        })
        res.send({
            success: true,
            id,
        })
    })
}

exports.userTeam = async(req,res)=>{
    try{
    const user= req.user._id
   const leagueid =  req.params.leagueId
  
    await LeagueServices.findById(req.params.leagueId).then(async(league)=>{
    //   league.user.forEach(userId=>{
        //console.log(user)
    //let LeagueFound = await LeagueModel.findById({_id:  leagueid, 'league.user':user});
     var users= []
    //   league.user.forEach(user=>{
    //       user = JSON.stringify(user)
    //       if(league.user.indexOf(user)){
           
    //       }
    //   })
  //  console.log(league)
    if(league.user.indexOf(user) != -1){
        const playersFound = []
        let  TeamFound= await TeamModel.findOne({league:leagueid, user:user})
        await TeamFound.player.forEach(async(playerId) => {
           let player = await PlayerModel.findOne({_id: playerId})
           playersFound.push(player)
           if(TeamFound.player[TeamFound.player.length-1] === playerId){
               res.send({
                   success: true,
                   TeamFound,
                   playersFound,
                   message: "Your"
           
           })
        }
        
       
       })
    }
    //  LeagueFound.user.forEach(userId=>{
    //      if(user == userId){
    //          console.log("here")
    //      }
    //  })
     //  if(idFound){
     
        // const playersFound = []
        //  let  TeamFound= await TeamModel.findOne({league:leagueid, user:user})
        //  await TeamFound.player.forEach(async(playerId) => {
        //     let player = await PlayerModel.findOne({_id: playerId})
        //     playersFound.push(player)
        //     if(TeamFound.player[TeamFound.player.length-1] === playerId){
        //         res.send({
        //             success: true,
        //             TeamFound,
        //             playersFound,
        //             message: "Your"
            
        //     })
        //  }
         
        
        // })
        
    //   }
       else
       {
      
           var playersFound = new Array;
         await league.Player.forEach(async(playerId) => {
            let player = await PlayerModel.findOne({_id: playerId})
            playersFound.push(player)
            if(league.Player[league.Player.length-1] === playerId){
                res.send({
                    success: true,
                    playersFound,
                    message: "Create"
            
            })
         }
         
        
        })
      }
   })
    
    
    

    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.editTeam = async(req,res)=>{
    try{
        const user= req.user._id
        const leagueid =  req.params.leagueId
   
         await LeagueServices.findById(req.params.leagueId).then(async(league)=>{
        
         //   league.user.forEach(userId=>{
         let idFound = await LeagueModel.findOne({_id:  leagueid, user: user});
            if(idFound){
              
             const UserplayersFound = []
              let  TeamFound= await TeamModel.findOne({league: leagueid, user: user})
            
              await TeamFound.player.forEach(async(playerId) => {
                 let player = await PlayerModel.findOne({_id: playerId})
                 UserplayersFound.push(player)
                 if(TeamFound.player[TeamFound.player.length-1] === playerId){
                    var ServerplayersFound = new Array;
                    await league.Player.forEach(async(playerId) => {
                       let player = await PlayerModel.findOne({_id: playerId})
                       ServerplayersFound.push(player)
                       if(league.Player[league.Player.length-1] === playerId){
                           res.send({
                               success: true,
                               TeamFound,
                               UserplayersFound,
                               ServerplayersFound,
                               message: "Found"
                       
                       })
                    }
                })
                       
    
    }
 })
 }
})

    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}


exports.update = async(req,res)=>{
    try{
       leagueId = req.params.leagueId;
       const user = req.user._id
       let idFound= LeagueModel.findOne({_id: leagueId, user: user})
       if(idFound){
            //let TeamFound = TeamModel.findByIdAndUpdate({league: leagueId, user:user},{name: req.body.name,player: req.body.player})
            await TeamModel.updateOne({league: leagueId, user:user},{name: req.body.name,player: req.body.player})
        //    let TeamFound =   await TeamModel.find({_id: leagueId, user: user})
        //    console.log(TeamFound)
        
        res.send({
            success:true,
            message:"done"
        })
       }
       else
       {
           res.send({
               success: false,
               message: "Create One First"
           })
       }
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.pointsTable = async(req,res)=>{
    const leagueid = req.params.leagueId
    const teamName=[]
    await LeagueModel.findById({_id: leagueid}, async function(err,league){
        if(err){
            res.send({
                success: false,
                message: e.message
            })
        }
        else
        {

            league.team.forEach( async(leagueTeams) => {
               await TeamModel.findById({_id: leagueTeams}, async function(err,team){
                if(err){
                    res.send({
                        success: false,
                        message: e.message
                    })
                }
                else
                {
                    teamName.push(team.name)
                     
                }
               })
               if(league.team[league.team.length-1] === leagueTeams){
                res.send({
                    success: true,
                    teamName,
                    message: "Teams"
                })
               }
            })
           
        }
    })
}