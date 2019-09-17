let express = require('express');
let morgan = require('morgan');//not should if required
let bodyParser = require('body-parser'); //parse incoming request bodies
let app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static('css'));
app.use(express.static('img'));
//app.use(morgan('short')); 
//This receicves the post request first then take in the data and put it in a object format
//urlencoded is the datatype of the object
//This is just a middleware. It receives the requests before the actual callback function for the request
app.use(bodyParser.urlencoded({
    extended: false
}));


app.get('/', function(request,response){
    console.log('hello from home page');
    response.render('index.html');
});


app.get('/add', function(request,response){
    console.log('hello from addtask page');
    response.render('add.html');
});


let db = [];


db.push({
    taskName: 'Race Day',
    taskDue: '2019/12/10',
    taskDesc: 'Speed tesing wheels'
});


app.post('/data', function(request,response){
    console.log('hello from add'); 
    console.log(request.body);


    //This line adds the data I fill in the form to the data base
    db.push(request.body);
response.redirect('list');
});

//Get request for go to list task then respond with list.html
app.get('/list', function(request,response){
    console.log('hello from list page');
    //Here I am saying that the db declared in the html file is equal to the db created in this file
    //And I am also saying the the template declaared in the html file will be  filled with the data from the form
    response.render('list.html', {taskDb: db});
});

app.listen(8080);


