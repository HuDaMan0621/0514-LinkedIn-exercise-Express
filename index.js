import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import data from './data/data.json';

const app = express();
const PORT = 3000;

//this is for the public folder on path /
app.use(express.static('public'));

// app.use(express.json()); //allowing us to use json 
app.use(express.urlencoded({extended: true})); //qs stringfy ready for server 
//this is for images folder and on path images
app.use('/images', express.static('images'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//this is for proxies
app.set('trust proxy', 'loopback');


app.get('/', (req, res) => //get data
    res.json(data) //return the data <- this is the syntax. usually includes with the error statement. 
);

//JSON data
// {"hello": "JSON is cool"}
//URLEncoded data
// hello=URLEncoded+is+cool

app.post('/newItem', (req,res) => {
    console.log(req.body);
    res.send(req.body);
})

app.get('/item/:id', (req, res, next) => { //put : on every params if you want to pass ie, :category/:id 
    //this is the middleware that pulls the data
    console.log(req.params.id); //print the id by, params.id
    let user = Number(req.params.id) //Number, because the id is a number, it's a string by default.
    console.log(user); //console log so we can see what's going on here. 
    console.log(data[user]); //pull a user from it
    //middleware that uses the req object
    console.log(`Request from:  ${req.originalUrl}`);
    console.log(`Request type:  ${req.method}`); 

    // everything above is middleware - ch4, middleware with express
    res.send(data[user]); //returns data to the screen. 
    next(); //
}, (req, res) =>
    console.log('did you get the right data?')
)


app.route('/item')
    .get((req, res) => {
        throw new Error();
        // res.download('images/rocket.jpg') // download a picture
        //res.render() //render a view template
        // res.redirect('http://www.linkedin.com')
        // res.end()
        res.send(`a get request with /item route on port ${PORT}`)
    })
    .put((req, res) => //receive data
        res.send(`a put request with /newItem route on port ${PORT}`)
    ) // route handler, codes inside here is called route handlers
    .delete((req, res) => //delete 
        res.send(`a delete request with /item route on port ${PORT}`)
    );

//Error handling function
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Red alert! Red alert!<br><br>: ${err.stack}`) //send whatever, picture, cats, dogs... =) 
});



app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
    // console.log(data);
});

