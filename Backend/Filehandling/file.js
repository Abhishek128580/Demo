const fs=require("fs");
//syncro
fs.writeFileSync("./test.txt","Hey there!\n"); //make test file with Hey there! written on it

//asyncr
fs.writeFile("./test.txt","Hey There! from asyn",(err)=>{});

//read file from contack.txt
//syn
const result=fs.readFileSync("./contact.txt","utf-8");
console.log(result);

//const result=fs.readFile("./contact.txt","utf-8");//give error
//asyn doesnot return 
fs.readFile("./contact.txt","utf-8",(err,result)=>{
    if(err){
        console.log("Error",err)
    }else{
        console.log(result);
    }
})


fs.appendFileSync("./test.txt",new Date().getDate().toLocaleString());
fs.appendFileSync("./test.txt","Hey there\n");


fs.cpSync("./test.txt","./copy.txt");

fs.unlinkSync("./copy.txt");

console.log(fs.statSync("./test.txt"));