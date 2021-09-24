require('dotenv').config();
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts)
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true});
const db = mongoose.connection;
db.on('error',(error)=>console.error('Error:',error));

db.once('open',()=>console.log('Connected to Mongose'));

app.use('/',indexRouter);

app.listen(process.env.PORT || 3000);

// main().then(()=>console.log('Connected to Mongose')).catch((error)=>console.error('ERRRRROOOOOOOOOOOOOOR:',error))
//  async function main(){
//      await mongoose.connect('mongodb://localhost/mybrary', {useNewUrlParser:true})
//  } 