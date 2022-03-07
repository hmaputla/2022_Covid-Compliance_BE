// delete
const database = require('./database');

const mysql=require('mysql2');
const express =require('express');
const router = express.Router();
const bodyparser=require('body-parser');
const cors = require('cors');
const app=express();
module.exports = router;

const db=mysql.createConnection({host:'localhost',user:'root',password:'',database:'covid_compliance',port:'3306'})

router.delete('/user/:User_id',(req,res)=>{
    let qID =req.params.User_id;
     
    let qr = `delete from user where User_id = '${qID}'`;
    db.query(qr,(err,result)=>{

       if(err) {console.log(err);}
   
          res.send(
              {
                  message:'data deleted '
              }
          )

    });



});