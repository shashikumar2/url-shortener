const mongoose = require('mongoose')
const Schema = mongoose.Schema
var validator = require('validator')
var sh = require("shorthash")


const urlSchema = new Schema({
    title: {
        type: String,        
        required: true
    },
    originalUrl : {
        type : String,
        validate : {
            validator : function(value){
                return validator.isURL(value)
            },
            message: function(){
                return 'url should be strings'
            }
        },
        required : true
    },

    hashedUrl : {
        type : String
        
    },

    clicks : [{clickDateTime : Date, ipAddress : String, browser : String, platform: String, device : String}],
    
    createdAt: {
        type: Date,
        default: Date.now
    }

})

urlSchema.pre('save', function(next){
    this.hashedUrl = sh.unique(this.originalUrl)    
    console.log('hashedurl',this.hashedUrl)
    next()
})

const Url = mongoose.model('Url', urlSchema)

module.exports = Url