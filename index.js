const express=require('express')
const app=express()

app.use(express.json())

const ru=require('./routers/auth')
app.use('/auth',ru)
const tasks=require('./routers/tasks')
app.use('/tasks',tasks)

app.listen(3000,'localhost',()=>{
    console.log('listening on port 3000')
})
