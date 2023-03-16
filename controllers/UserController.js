
const connections = require("../util/database.js");

function rand(min,max){
    return Math.floor(Math.random() * (max-min) ) + min
}

let validatePhoneCode = []
let sendCodeP = (phone)=>{
    for(var item of validatePhoneCode){
        if(item.phone == phone){
            return true
        }
    }
    return false
}

//用户密码登录
pwdLogin = async (req,res)=>{
    let {username,password} = req.query;
    var sql = `select * from user where user_name=? and password=?`;
    var sqlArr = [username,password];
    const [rows] = await connections.execute(sql,sqlArr)
    if(rows.length > 0){
        res.send({
            code:200,
            message:'成功',
            data:rows
        })
    }else{ //未查询到账户,请先注册
        res.send({
            code:1005,
            message:'用户未注册',
        })
    }

}
userSignIn = (req,res)=>{
    let {username,password,email,phone} = req.query;
    var sql = `select username from user where user_name=? and password=?`;
    var sqlArr = [username,password,email,phone];
}




let checkCode = (phone,code)=>{
    console.log(validatePhoneCode)
    for (var item of validatePhoneCode){
        if(item.phone == phone && item.code == code){
            return 'login'
        }else{
            return 'err'
        }
    }
}

//模拟发送验证码的操作
sendCode = (req,res)=>{
    let {phone} = req.query;
    if(sendCodeP(phone)){
        res.send({
            code:400,
            message:'已经发送过验证码,稍后再发'
        })
    }
    let code = rand(1000,9999);
    validatePhoneCode.push({
        phone:phone,
        code:code
    })
    res.send({
        code:200,
        message:'发送成功',
    })
    console.log(code)
}

codePhoneLogin = (req,res)=>{
    let {phone,code} = req.query;
    console.log(phone,code)
    let status = checkCode(phone,code)
    if(status == 'login'){
        res.send({
            code:200,
            message:'登录成功'
        })
    }else{
        res.send({
            code:1005,
            message:'登录失败'
        })
    }
}
module.exports = {
    pwdLogin,
    sendCode,
    codePhoneLogin
}