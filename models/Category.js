const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const categorySchema = mongoose.Schema({
    category: {
        type: String,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

categorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.user
        delete returnedObject._id
        delete returnedObject.__v
    }
})

categorySchema.plugin(uniqueValidator)

module.exports = mongoose.model('Category', categorySchema)