var mongoose = require("mongoose")


var LeagueSchema = mongoose.Schema({
    name:{
        type: String,
        unique: true
    },
    country: {
        type:String
    },
    Player:[{
       
        type:mongoose.Schema.Types.ObjectId
    }],
    team: [{
        type: mongoose.Schema.Types.ObjectId
    
    }],
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
        }
    ]
})

module.exports = mongoose.model("league",LeagueSchema)