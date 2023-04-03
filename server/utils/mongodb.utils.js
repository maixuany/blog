const mongoose = require('mongoose')

const connectdb = () => {
    mongoose.connect(process.env.URL_DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }).then(() => {
        console.log('| MongoDB Connected');
        console.log('|--------------------------------------------');
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = connectdb;