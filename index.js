//StockWiki app
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

//Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "Hello, this is some serious **it.";

//Set Handlebar routes
app.get('/', function (req, res) {
    res.render('home',{
    	stuff: otherstuff
    });
});

app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT, () => console.log('Server listening on ' + PORT));