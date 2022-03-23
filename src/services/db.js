
const mongoose = require('mongoose');
var uri = process.env.URI_DATABASE;
// const uri = `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.mrzgo.mongodb.net/portaoeletronico?retryWrites=true&w=majority`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose;