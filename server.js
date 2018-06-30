const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

const port=process.env.PORT || 3000;
var app=express();

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  fs.appendFileSync("server.log",log+'\n');
  console.log(log);
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
//
// });

app.use(express.static(__dirname+'/public'));
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

hbs.registerHelper('getcurrentyear',()=>{
  return new Date().getFullYear();
});


hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});


app.get('/',(req,res)=>{

  res.render('main-page.hbs',{
    pageTitle:"main-page page",
    content:"welcome everyone"
  });

});


app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:"about page",
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errormsg:"bad route"
  });
});

app.listen(port,()=>{
  console.log(`server is up at port ${port}` );
});
