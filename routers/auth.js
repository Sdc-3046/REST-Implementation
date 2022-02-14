const express=require('express')
const router=express.Router()
const db=require('./db')
const cjs=require('crypto-js')
const { response } = require('express')
const res = require('express/lib/response')

router.get('/all', (request,response)=>{
    const query='select * from authors'
    db.execute(query, (error,result)=>{
        if(error)
        {
            console.log(error);
        }
        else{
            console.log(result);
        }
        response.send(result)
    });
})

router.post('/signup',(request,response)=>{
    console.log(request.body)
    const {authName,email,password}=request.body
    const encpass=''+ cjs.MD5(password)
    const query='insert into authors (authName,email,password) values (?,?,?)'
    const params=[authName,email,encpass]
    db.execute(query,params,(error,result)=>{
        if(error)
        {
            console.log(error)
        }
        else
        {
            console.log(result)
        }
        response.send('User Signed Up Successfully')
    })
})
router.post('/signin',(request,response)=>{
    
    const {email,password}=request.body
    const encpass=''+cjs.MD5(password)
    const query1='select * from authors where email=? and password=?'
    const params1=[email,encpass]
    db.execute(query1,params1,(error,result)=>{
        if(error)
        {
            console.log("Error:"+error)
            response.send("Error")
        }
        else
        {
            if(result.length==0)
            {
                console.log("Invalid User")
                response.send("Invalid User")
            }
            else
            {
                console.log("Signed in Successfully")
                response.send(result[0])
            }
        }
    })
})



router.get('/profile/:id',(request,response)=>{
    
    const{ id }=request.params
    const query ='select * from authors where id = ?'
    const params=[id]

    db.execute(query,params,(error,result)=>{
        if(error)
        {
            console.log("No Data:"+error)
            response.send("No data")
        }
        else
        {
            response.send(result)
        }
    })
})

router.put('/forget/:id',(request,response)=>{
    const {email,password}=request.body;
    const encpass=''+cjs.MD5(password);
    const {id}=request.params;
    const query='update authors set password=? where id=? and email=?'
    const params=[encpass,id,email]

    db.execute(query,params,(error,result)=>{
        if(error)
        {
            console.log(error);
            response.send('Something Went Wrong');
        }
        if(result.affectedRows !=0)
        {
            console.log('Reset Password Successful');
            response.send('Reset Password Successful');
        }
        else{
            console.log('Email is incorrect');
            response.send('Email is Incorrect');
        }
    })
})

router.put('/profile/:id',(request,response)=>{
    
    const{ authName }=request.body
    const{ id }=request.params
    const query ='update authors set authName = ? where id = ?'
    const params=[authName,id]
    db.execute(query,params,(error,result)=>{
        if(error)
        {
            console.log(error)
            response.send("Error")
        }
        else
        {
            response.send("Updating Successful")
        }
    })
})
module.exports=router