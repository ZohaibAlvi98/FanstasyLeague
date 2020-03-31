var mongoose = require("mongoose")

var PlayerSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    score: {
        type: Number
    },
   attribute: {
       type: String
   },
   league: [
       {
            type:mongoose.Schema.Types.ObjectId,

       }
   ]
  
})

module.exports = mongoose.model("player",PlayerSchema)
