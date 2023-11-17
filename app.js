const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const cors = require('cors')

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())

app.use((req,res,next)=>{
  res.cc = (err,code=1005)=>{
    //默认code=1005为失败
    res.send({
      code,
      message:err instanceof Error ? err.message : err
    })
  }
  next()
})

const jwtconfig = require('./jsw_config/index')
const {expressjwt:jwt} = require('express-jwt')
app.use(jwt({
  secret:jwtconfig.jwtSecretKey,algorithms:['HS256']
}).unless({
  path:[/^\/api\//]
}))


const loginRouter = require('./router/login')
app.use('/api',loginRouter)

//对不符合joi规则的情况进行报错
app.use((req,res,next)=>{
  if(err instanceof  Joi.ValidationError) return res.cc(err)
})

const port = 3000
app.listen(port,() => {
  console.log("连接port"+port);
})

