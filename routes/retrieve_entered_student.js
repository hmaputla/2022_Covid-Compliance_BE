const express =require('express');
const router = express.Router();
const app=express();
module.exports = router;

const database=require('./database');



//const database=require('./database');
// retrieve entered student 

router.get('/record',(req,res)=>{

    
    let qr = `select User_id,Tempareture from record where isAllowedEntrence= 1`;
    
    database.query(qr,(err,result)=>{
    
    if(err){console.log(err);}
    
    if(result.length>0)
       {
        res.send({
            message:'get records data',
            data:result
            
        });
       }
       else 
       {
            res.send({
             message:'data not found'
        })
      }
    
    });
       
});