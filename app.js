const express = require('express')
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload')
const path = require('path')
const chalk = require('chalk')
const cors = require('cors')
const morgan = require('morgan')
const os = require('os')
const fs = require('fs')
const expressHandlebars = require('express-handlebars')

const winston = require('./logger/winston')
const {croneRun} = require('./cron-jobs')
const {carRouter, userRouter} = require('./routers')
const instance = require('./database').getInstance()
instance.setModel()

// const {userService} = require('./services')


const server = express()

const logger = winston('APP file')

// server.use(cors({methods: 'POST', origin: (origin, callback) => {
//     if (['http://localhost:3000'].indexOf(origin) !== -1) {
//         callback(null, true)
//     }
//     else {
//         logger.err('not allowed by CORS')
//         callback(new Error('not allowed by CORS'))
//     }
//     }}))

dotenv.config({})

server.use(express.urlencoded({extended: true}))
server.use(express.json())
server.use(fileUpload({}))
server.use(morgan('dev'))

///
server.use(express.static(path.join(process.cwd(), 'public')))
server.use(express.static(path.join(process.cwd(), 'views')))


///

server.set('view engine', '.hbs')
server.engine('.hbs', expressHandlebars({
    defaultLayout: false
}))
server.set('views', path.join(process.cwd(), 'views'))


server.get('/',async (req, res) => {

    const allUsers = [
        {
            name: 'q',
            age: 22
        },
        {
            name: 'qw',
            age: 245
        },
        {
            name: 'qwert',
            age: 23
        }
    ]


    res.render('main', {message: 'PRIUVET', isFine: true, allUsers})
})

///
global.what = 'hello world'

console.log(global)
console.log('---------_-------_____')
console.log(process.cwd())
console.log('---------_-------_____')
console.log(process.env)
console.log('---------_-------_____')
console.log(__dirname)
console.log('---------_-------_____')
console.log(__filename)
console.log('---------_-------_____')
console.log(os)
console.log('---------_-------_____')
console.log(os.cpus())
console.log('---------_-------_____')
console.log(os.uptime())
console.log('---------_-------_____')
console.log(os.arch())
console.log('---------_-------_____')


const {EventEmitter} = require('events')

const ee = new EventEmitter()

ee.on('emit', (age, name) => {
    console.log(`emit ${name} + ${age}`)
})

ee.emit('emit', 22, 'kokos')
ee.emit('emit', 23, 'koks')
ee.emit('emit', 24, 'koko')

ee.once('e', () => {
    console.log('eeeeeeeee')
})


ee.emit('e')
ee.emit('e')

///


// fs.writeFile(path.join(process.cwd(), 'files', 'text.txt'), 'HELLO WORLD!!', err => {
//     if (err) {
//         console.log(err)
//     }
// })
//
// fs.readFile(path.join(process.cwd(), 'files', 'text.txt'), (err, data) => {
//     console.log(data)
// })
//
// fs.appendFile(path.join(process.cwd(), 'files', 'text.txt'), 'qwerty', err => {
//     if (err) {
//         console.log(err)
//     }
// })
//
// fs.mkdir(path.join(process.cwd(), 'dir', 'newDir'), {recursive: true}, err => {
//     if (err) {
//         console.log(err)
//     }
// })
//
// fs.rmdir(path.join(process.cwd(), 'dir', 'newDir'), {recursive: true}, err => {
//     if (err) {
//         console.log(err)
//     }
// })
//
// fs.readdir(process.cwd(), (err, files) => {
//     console.log(files)
// })
//
// fs.stat(path.join(process.cwd(), 'dir', 'newDir'), (err, stats) => {
//     console.log(stats)
// })
//
// fs.unlink(path.join(process.cwd(), 'dir'), () => {
//
// })
//
// fs.rename(path.join(process.cwd(), 'dir', 'newDir'), path.join(process.cwd(), 'public'), err => {
//     if (err) {
//         console.log(err)
//     }
// })


const readStreme = fs.createReadStream('./audio.mp3')

readStreme.on("data", (buffer) => {
    console.log(buffer)
})

const writeStream = fs.createWriteStream('./public/au.mp3')

writeStream.write('hello world')

readStreme.pipe(writeStream)

server.use('/cars', carRouter)
server.use('/users', userRouter)

server.use('*', (err, req, res, next) => {
    logger.err(err)
    res.status(err.status)
        .json({
            message: err.message,
            code: err.customCode
        })
})


server.listen(5001, (err) => {
    if (err) {
        console.log(err)
    }
    // croneRun()

    console.log('5001 is work ======><======')
    logger.info('5001')
})


process.on("unhandledRejection", reason => {
    console.log(chalk.bgBlue(reason))

process.exit(0)
})
