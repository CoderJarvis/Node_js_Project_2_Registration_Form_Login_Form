var express = require('express')
const path = require('path');
const hbs = require('hbs');
var app = express()
require('./db/conn.js');
const { People } = require('./models/schema');

const staticPath=path.join(__dirname,'../public')
app.use(express.static(staticPath));

const partialPath=path.join(__dirname,'../templates/partials');
const viewPath=path.join(__dirname,'../templates/views');

app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);
app.use(express.json());
app.use(express.urlencoded());


app.get('/',  (req, res)=> {
    res.render('index.hbs');
})
app.get('/home',  (req, res)=> {
    res.render('index.hbs');
})
app.get('/register',  (req, res)=> {
  res.render('register.hbs')
})

app.post('/register',async (req, res)=> {


try {
    password = req.body.password;
    confirmPassword = req.body.confirmPassword;
    if(password != confirmPassword)
    {
        res.render('showMsg.hbs',{
            msg : "Password Didn't Matched"
        })
    }
    else
    {
        const doc = new People({
            name : req.body.name,
            email :  req.body.email,
            phone : req.body.phone,
            college : req.body.college,
            date_of_birth : req.body.dob ,
            password : req.body.password,
            confirmPassword : req.body.confirmPassword,
        })
        const result = await doc.save();
        // console.log(result);
        res.status(201).render("showMsg.hbs",{
            msg : "Account Successfully Created"
        });
    }
    
} catch (error) {
    res.status(404).render('showMsg.hbs',{
        msg : "Some Unexpected Error Occured"
    })
}
})

app.get('/login',  (req, res)=> {
  res.render('login.hbs')
})
app.post('/login',  (req, res)=> {
})

app.listen(3000,() => {
  console.log(`Server running at 3000`);
});