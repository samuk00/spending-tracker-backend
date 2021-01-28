require('dotenv').config()
let PORT = process.env.PORT
let MONGODBURI = process.env.MONGODBURI
let SECRET = process.env.SECRET

module.exports = {
    PORT,
    MONGODBURI,
    SECRET
}