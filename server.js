const express = require('express')
const app = express()
const multer = require('multer')
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')
const taskRoutes = require('./routes/task')
const ficheRoutes = require('./routes/fiche')
const formaliteRoutes = require('./routes/formalite')
const actionRoutes = require('./routes/actions')
const fs = require('fs');

//const cors = require('cors')
//const whitelist = ['http://localhost:8080', 'http://localhost:8000', 'http://localhost:8080/Dashboard'];
//const corsOptions = {
  //credentials: true, // This is important.
 // origin: (origin, callback) => {
    //if(whitelist.includes(origin))
     // return callback(null, true)

    //  callback(new Error('Not allowed by CORS'));
 // }
//}
//app.use(cors(corsOptions))

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB database connected...'))
    .catch((err) => console.log("erreur de database"))

mongoose.set('debug', true)

// routes

app.use('/formalite', formaliteRoutes)
app.use('/user', userRoutes)
app.use('/task', taskRoutes)
app.use('/fiche', ficheRoutes)
app.use('/action', actionRoutes)

// CORS error handler 

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    )
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    )
    next()
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        const filekeys = JSON.parse(req.body.fileKeys)
        console.log(filekeys[file.originalname], file)
        cb(null, Date.now() + "-" + filekeys[file.originalname]+".pdf")
    }
})

const uploadStorage = multer({storage: storage})

app.post("/document/single", uploadStorage.single('file'), (req, res) => {
    console.log(req.file)
    return res.send('single file')
})

app.post('/document/multiple', uploadStorage.array('files', 10), (req, res) => {
    console.log(req.files, req.body)
    const data = req.body.questionsForm
    try { fs.writeFileSync(`uploads/${req.body.task}_${req.body.form}_questionForm_${Date.now()}.json`, data, 'utf-8'); }
    catch(e) { console.log(e); }
    return res.send('Saved files')
})


app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))