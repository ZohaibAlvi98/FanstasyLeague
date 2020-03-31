var mongoose = require("mongoose")
const _ = require('lodash');

var TeamSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    user:{
       type: mongoose.Schema.Types.ObjectId,
    },
    captain: {
        type: String,
        
    },
    player: 
        [
            {
                type: mongoose.Schema.Types.ObjectId,
            
                
            }
        ],
    league: 
        {
            type: mongoose.Schema.Types.ObjectId
        }
    
        // players:
        // [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     unique: true,
        //     maxItems: 11
        // }]
    
  
       
})



// })


// TeamSchema.pre('save', function (next) {
    
//     this.player.players = _.uniq(JSON.stringify(this.player.players._id));
//     next();
//   });
// TeamSchema.pre('save', function (req,res,next) {
//     var err = false;
//     this.player.players.forEach(p => {
//      //  p = JSON.stringify(p)
//         if(this.player.players.indexOf(p) != -1){
//             next(err)
//         }
        
//     })
//     console.log("no if here")
//     next();
    
// })


module.exports = mongoose.model("teams",TeamSchema)
