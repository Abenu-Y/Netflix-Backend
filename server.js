const express = require('express')
const axios = require('axios')
const cors = require('cors')
const dotenv = require('dotenv')
// const mysql = require('mysql2')



const app =express()


dotenv.config()
const apiKey = process.env.KEY;

app.use(express.json())
app.use(cors())




      app.get('/fetchData', async (req, res) => {
            try {
              const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_networks=213`);
                      // console.log(response.data);
                       res.send(response.data);
            } catch (error) {
                    console.error(error);
                    res.status(500).send('Internal Server Error');
            }
      });





       app.get('/fetchData/:first/:second/:third?', async (req, res) => {

                const first = req.params.first;
                const second = req.params.second;
                const third = req.params.third;


               const queryParameters = Object.entries(req.query).map(([key, value]) => `${key}=${value}`);

                try {

                        let url = `https://api.themoviedb.org/3/${first}/${second}` 

                        if(third){
                          url+= `/${third}`
                        }


                        url += `?api_key=${apiKey}&${queryParameters[0]}` 
                        console.log(url)

                        const response = await axios.get(url);

                        console.log(second)
                        console.log(queryParameters[0]);
                
                       res.send(response.data);

                } catch (error) {
                          console.error(error);
                          res.status(500).send('Internal Server Error');

                  }

         });




        // const Database = mysql.createConnection({
        //         user:'netflix',
        //         host:'localhost',
        //         database:'netflix',
        //         password:'netflix2024@evan'
        // })


        // Database.connect(()=>{
        //       console.log('datbase is connected!')
        // })



      // app.post('/signup',(req,res)=>{

      //       const sendEmail=req.body.Email
      //       const sendPassword = req.body.Password
      //       const InsertData = `INSERT INTO user (email,password) VALUES (?,?)`

      //       const Values =[sendEmail,sendPassword]
      //       console.log(Values)

      //       Database.query(InsertData,Values,(err,results)=>{

      //             if(err){
      //               res.send(err)
      //             }
      //             else{
      //               console.log('succesfully create new user data');
      //               res.send({
      //                 message:'new user added'
      //               })
      //             }

      // })



      // })



      // app.post('/signin',(req,res)=>{

      //   const retrieveInfo = `SELECT * FROM user WHERE email=? AND password=?`
      
      //   const LoginEmail =req.body.LoginEmail;
      //   const LoginPass = req.body.LoginPassword;

      //   const Values =[LoginEmail,LoginPass]

      //   Database.query(retrieveInfo,Values,(err,results)=>{

      //     console.log("results",results)

      //     if(err) {res.send({error:err})}

      //     if(results.length > 0){
      //       console.log('logged in')
      
      //       res.send(results)
      //     }  
      //     else{
      //       res.send({messgae:'credential dont exist'})
      //     }
      //   })
      // })





const Port = 1234;

app.listen(Port, ()=>console.log(`connected to the port ${Port}`))