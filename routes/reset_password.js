const database = require('./database');



const express =require('express');
//const Connection = require('mysql2/typings/mysql/lib/Connection');

const router = express.Router();

const app=express();
module.exports = router;

router.post("/forgot", (req, res) =>{

    let email = req.body.email ;
    let sql, link;

    sql = `SELECT Email FROM user WHERE Email == ${email}`;

    database.createQuery(sql,(err,result) =>{

        if(err)
        {
            console.log(err);
        }
        
        if(result.length > 0)
        {
            console.log("User found");

            res.send("User found");

            link = "http://localhost3306:/resetPassword";

            var nodemailer = require('nodemailer');
            let transporter = nodemailer.createTransport({
                service:'gmail',
                host: 'smtp.gmail.com',
                port:'587',
                auth:{
                    user: 'lazi.mphai@gmail.com',
                    pass: '19990204'
                },
                secureConnection: 'false',
                tls: {
                    ciphers: 'SSLv3',
                    rejectUnauthorized: false
                }
        }); 
     
        message ={

        from:'lazi.mphai@gmail.com',
        to:JSON.stringify(email),
        subject:'No reply :COVID',
        HTML:'Please Click the following link to reset your password' + link
    };

            transporter.sendMail(message,function(err, info) {
             if (err) 
             {
                    console.log(err)
            } 
            else
                 {
                     console.log(info);
                }   
            });


          
    

         }
        else{

            console.log("User not found ");
            res.send("User not found ");
        }

    });

});

router.put("/reset", (req, res) =>{

    let email, password = req.body.email ;
    let sql1, sql2;

    sql1 = `SELECT Email FROM user WHERE Email == ${email}`;

    Connection.createQuery(sql1,err,result =>{

        if(err)
        {
            console.log(err);
        }
        
        if(result.length > 0)
        {
            console.log("User found");



            sql2 = `UPDATE user  SET password = ${password} WHERE Email == ${email}`;

            Connection.createQuery(sql1,err,result =>{

                if(err)
                {
                    console.log(err);
                    res.send("There was an error");
                }

                if(result.length > 0)
                {

                    res.send("Your password was successfully updated");
                }

            });


        }
        else{

            console.log("User not found ");
            res.send("User not found ");
        }

    });

});