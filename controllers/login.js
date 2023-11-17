const db = require('../db/index');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')//导入jwt 用于生成token
const jwtconfig = require('../jsw_config/index')

exports.register = (req,res) =>{
    const regInfo = req.body;
    if(!regInfo.account || !regInfo.password){
        return res.send({
            code:1005,
            message:"账号或密码不能为空"
        })
    }
    const sql = "select * from users where account = ?"
    db.query(sql,regInfo.account,(err,result)=>{
        if(result.length > 0){
            return res.send({
                code:1005,
                message:"账号已存在"
            })
        }
        //对账号进行加密  需要使用加密中间件bcrypt.js
        regInfo.password = bcrypt.hashSync(regInfo.password,10)
        //把账号密码插入users表里
        const sql1 = 'insert into users set ? ';
        const identity = '用户';
        const create_time = new Date();
        db.query(sql1,{
            account:regInfo.account,
            password:regInfo.password,
            identity,
            create_time,
            status:0,//初始状态
        },(err,result)=>{
            if(result.affectedRows !==  1){
                return res.send({
                    code:1005,
                    message:"账号注册失败"
                })
            }
            return res.send({
                code:200,
                message:"账号注册成功"
            })
        })
    })
}

exports.login = (req,res) =>{
    const loginInfo = req.body;
    const sql = 'select * from users where account = ?';
    db.query(sql,loginInfo.account,(err,result)=>{
        //一般在数据库断开的情况执行失败
        if(err) return res.cc(err)
        if(result.length!==1) return res.cc('登录失败')

        const compareResult = bcrypt.compareSync(loginInfo.password,result[0].password)
        if(!compareResult){
            return res.cc('登录失败')
        }
        //对账号冻结状态做判断
        if(result[0].status === 1){
            return res.cc('账号被冻结')
        }
        const user = {
            ...result[0],
            password:"",
            imageUrl:"",
            create_time:"",
            update_time:"",
        }
        //设置token有效时长
        const tokenStr = jwt.sign(user,jwtconfig.jwtSecretKey,{
            expiresIn:'7h'
        })
        res.send({
            data:result[0],
            code:200,
            message:"登录成功",
            token:'Bearer ' + tokenStr
        })
    })
}