const mongo = require('mongoose')
mongo.set('strictQuery', true)
require('dotenv').config()

const url = process.env.MONGODB_URI
const entrySchema = new mongo.Schema({
    name: { type: String, required: true, minLength: 3 }, number: { type: String, validate: {validator: function(v){
       

        return /(\d{2,3}-\d{5,})|(\d{8,})/.test(v);
    }, message: props => `${props.value} is not a valid phone number!`},required: true, minLength: 8 }
})
entrySchema.set('toJSON', {

    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }

})
const Person = mongo.model('Person', entrySchema)


mongo.connect(url).then((result) => {

    console.log('Connected to the DB.')

}).catch((err) => console.log(`Connection to the DB failed with error - ${err}`))



module.exports = Person