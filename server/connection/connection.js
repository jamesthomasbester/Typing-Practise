const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://jamesbester:Password1@cluster0.jpy13lp.mongodb.net/?retryWrites=true&w=majority").catch(
    err => console.log(err)
)

// const user = new User({username: 'james', password: 'test', email:'test@test.com', github: 'james'})
// user.save().then(() => console.log('user saved'))
// const data = new Data({user: '62dcd462a78cc591b10b81b9', data: { q: {score: 10, latency: 9, incorrect: 2, correct: 112 } }});
// data.save().then(() => console.log(data))


module.exports = mongoose.connection;