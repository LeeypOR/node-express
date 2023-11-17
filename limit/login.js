const joi = require('joi')

//string值只能字符串
//alphanum值为a-z 0-9
//required必填
//pattern正则
//账号的验证
const account = joi.string().alphanum().min(6).max(12).required()
//密码的验证
const password = joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(12).required()

exports.login_limit = {
    //表示对req.body里面的数据进行验证
    body:{
        account,
        password
    }
}

