const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
Schema = mongoose.Schema;


const UserSchema = new Schema({
    name:{
        type: String,
        required: [true, 'please add a name']
    },
    email:{
        type: String,
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: [true, 'please an email']
    },
    password: {
        type: String,
        minLength: 6,
        required:[true, 'please enter a password'],
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'publisher'],
        default: 'user'
    },
    createdAt:{
        type: Date,
        Date: Date.now
    }
})

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.getSignedJwtToken = async function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)