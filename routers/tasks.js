const express=require('express')
const res = require('express/lib/response')
const router=express.Router()
const db=require('./db')
router.get('/all',(request,response)=>{
    const query ='select * from tasks'
    const params=[]
    db.execute(query,params,(error,result)=>{
        if(error)
        {
            console.log(error)
            response.send("Error")
        }
        else
        {
            response.send(result)
        }
    })
})
router.get('/show/:id',(request,response)=>{
    const{ id }=request.params
    const query ='select * from tasks where id=?'
    const params=[id]
    db.execute(query,params,(error,result)=>{
        if(error)
        {
            console.log(error)
            response.send("Error")
        }
        else
        {
            response.send(result)
        }
    })
})
router.post('/create',(request,response)=>{
    const{ taskName,status }=request.body
    const query ='insert into tasks (taskName,status) values (?,?)'
    const params=[taskName,status]
    db.execute(query,params,(error,result)=>{
        if(error)
        {
            console.log(error)
            response.send("Error")
        }
        else
        {
            response.send(result)
        }
        console.log('Task added to database successfully')
    })
})
router.put('/:id',(request,response)=>{
    
    const{ taskName,status }=request.body
    const{ id }=request.params
    const query ='update tasks set taskName = ?, status = ? where id = ?'
    const params=[taskName,status,id]
    db.execute(query,params,(error,result)=>{
        if(error)
        {
            console.log(error)
            response.send("Error")
        }
        else
        {
            response.send("Updation of notes is Successfull")
        }
        console.log("Updation of notes is Successfull")
    })
})
router.delete('/:id',(request,response)=>{
    
    const{ id }=request.params
    const query ='delete from tasks where id = ? '
    const params=[id]
    db.execute(query,params,(error,result)=>{
        if(error)
        {
            console.log(error)
            response.send("Error")
        }
        else
        {
            response.send("Note Deleted.")
        }   
    })
})
module.exports=router