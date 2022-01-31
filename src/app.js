var express = require('express')
const path = require('path');
const hbs = require('hbs');
var app = express()
require('./db/conn.js');    //database connection
const { People } = require('./models/schema');  //our collection

const staticPath=path.join(__dirname,'../public')
app.use(express.static(staticPath));   //for static file serving

const partialPath=path.join(__dirname,'../templates/partials'); 
const viewPath=path.join(__dirname,'../templates/views');       

app.set('view engine','hbs');   //for template engines
app.set('views',viewPath);      //for view folder
hbs.registerPartials(partialPath);  //for partial folder


app.use(express.urlencoded());  //for form


app.get('/',  (req, res)=> {
    res.render('index.hbs');
})
app.get('/home',  (req, res)=> {
    res.render('index.hbs');
})
app.get('/register',  (req, res)=> {
  res.render('register.hbs')
})

//for /register post request
app.post('/register',async (req, res)=> {

    try {
        password = req.body.password;
        confirmPassword = req.body.confirmPassword;
        if(password != confirmPassword)
        {
            res.status(404).render('showMsg.hbs',{
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
                confirmPassword : req.body.confirmPassword
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

//for /login post request
app.post('/login', async (req, res)=> {
    try {  
         const email = req.body.email;
         const inputPassword = req.body.password;
        //  console.log(email,inputPassword);

         const data = await People.findOne({email:email})
         const orgPassword = data.password;
        //  console.log(orgPassword);
        if(inputPassword === orgPassword)
        {
            res.status(200).render('showMsg.hbs',{
                msg : "Login Successful"
            })
        }
        else{
                res.status(404).render('showMsg.hbs',{
                msg : "Username or Password Incorrect"
            })
        }
        
    } catch (error) {
            res.status(404).render('showMsg.hbs',{
            msg : "Username or Password Incorrect"
        })
    }
})

app.listen(3000,() => {
    console.log(`Server running at 3000`);
});