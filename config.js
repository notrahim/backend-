const dotenv = require("dotenv")
const result = dotenv.config()

// connexion to mongoDB database

module.exports = {
    mongoUri: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.qfigl.mongodb.net/?retryWrites=true&w=majority`,
    PORT: process.env.PORT,
}