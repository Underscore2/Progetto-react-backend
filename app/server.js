const express = require('express');
const cors = require ('cors');
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:true}))


const db = require('../app/models')


db.sequelize.authenticate().then(()=>{
    console.log("Connection has been enstablished successfully");
}).catch((error)=>{
    console.error("Unable to enstabling a connection: ",error.message)
})

db.sequelize.sync().then(() => {
   console.log('DB Syncronized');
}).catch((error) => {
   console.error('Unable to syncronize DB : ', error);
});



 app.get('/',(req,res)=>{
    res.sendStatus(200)
res.send('<h1>Sono un bechend</h1>')
}) 

require('../app/routes/auth.routes')(app)




app.listen(3001,()=>{console.log("Server is listening on port 3001")});

module.exports={app}