
//declaring variables

const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const app=express();
const mysql=require('mysql2');

//instantiating 
app.use(cors());
app.use(bodyparser.json());


//creating database connection

const db=mysql.createConnection({host:'localhost',user:'root',password:'',database:'covid_compliance',port:'3306'})

//check the database  connection

db.connect(err=>{
    if(err) {
        console.log(err,'dberr');}
        else{
            console.log('database connected.....');
        }
    

});

// viewing everything from the admin table
app.get('/admin',(req,res)=>{
 
    let sql = 'select * from admin';
    db.query(sql,(err,result)=>{
        if (err)
        {
            console.log(err,'errs');

        }
        if(result.length>0)
        {
            res.send({
                message:'all user data',
                data:result
            });
        }
    });
});


// delete a record from the admin table
app.delete('/admin/:Admin_id',(req,res)=>{
     let qID =req.params.Admin_id;
      
     let qr = `delete from admin where Admin_id = '${qID}'`;
     db.query(qr,(err,result)=>{

        if(err) {console.log(err);}
    
           res.send(
               {
                   message:'data deleted '
               }
           )

     });



});





//server port 
app.listen(3000,()=>{console.log('server running')})