//StockWiki app
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 5000;


//Using body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

//API key logo pk_9edd16dcf924a8076186e0bd8d3739cd

//API key stocks pk_63004e49291c43c7a86bd79ce2b2383a
//call_api function

function call_api(finishedAPI, checker) {

request('https://cloud.iexapis.com/stable/stock/'+checker+'/quote?token=pk_63004e49291c43c7a86bd79ce2b2383a',{json:true},(err,res,body)=>{
  if(err){return console.log(err);}
  if(res.statusCode===200){
  	finishedAPI(body);
  };
});
};

//Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "Hello, this is some serious **it.";

//Set Handlebar index GET routes
app.get('/', function (req, res) {
	call_api(function(doneAPI){
		    res.render('home',{
    	    stock: doneAPI
    	    
    });
},"fb");
});

//Set Handlebar index POST routes
app.post('/', function (req, res) {
	call_api(function(doneAPI){
		    //rel_stuff = req.body.stock_check;
		    res.render('home',{
    	    stock: doneAPI
    });
}, req.body.stock_check);
});

//About page routes
app.get('/about.html', function (req, res) {
    res.render('about');
});

app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT, () => console.log('Server listening on ' + PORT));