const http=require("http");

const fs=require("fs");

//normal
const myServer=http.createServer((req,res)=>{
    //console.log("New Req Rec..");
    //console.log(req.headers);

    const log=`${Date.now()}:New Req Received!\n`;
    fs.appendFile("log.txt",log,(err,data)=>{
        res.end("Hello from server");
    })
    
    //res.end("Hello from server");

});

//going to different pages 
const myserver=http.createServer((req,res)=>{
   

    const log=`${Date.now()}:${req.url}:New Req Received!\n`;
    fs.appendFile("log.txt",log,(err,data)=>{
        switch(req.url){
            case'/':res.end("HomePage");
            break;
            case'/about':res.end("I am Abhishek");
            break;
            default:
                res.end("404 Not found");
        }        
    });
});

//listening to port 
myserver.listen(8000,()=>console.log("Server Started"));


