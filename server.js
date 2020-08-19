const express=require ('express');
const bodyParser=require('body-parser');
const knex=require('knex');
const cors=require('cors');
const bcrypt=require('bcrypt-nodejs');
const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');


const app=express();



const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smartbrain'
  }
});


app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
	res.json("getting things ready");
})

app.post('/signin',(req,res)=>{signin.handleSignIn(req,res,db,bcrypt)})

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)});

app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)});

app.put('/image',(req,res)=>{image.handleImage(req,res,db)});

app.post('/imageUrl',(req,res)=>{image.handleApiCall(req,res)});


app.listen(process.env.PORT||3001,()=>{
	console.log(`App is running in port ${process.env.PORT}`)
})