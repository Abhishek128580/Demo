const fs=require("fs");

//syn..blocking operation
console.log("1");
const result=fs.readFileSync("contact.txt","utf-8");
console.log(result);
console.log("2");
console.log("3");
console.log("4");


//asyn..non blocking
console.log("1");
fs.readFile("contact.txt","utf-8",(err,result)=>{
    console.log(result);
})
console.log("2");
console.log("3");
console.log("4");

//to know how max thread can be make
const os=require("os");
console.log(os.cpus().length);