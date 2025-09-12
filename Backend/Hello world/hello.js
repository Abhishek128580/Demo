console.log("Hey there i am JS");

const math=require("./math");
//only one fn
console.log("Math Value is",math(2,5));

//more than one fn
console.log("Math value is",math.addfn(2,8));
console.log("Math value is",math.subfn(2,8));

//desctructor
const {addfn,subfn}=require("./math");

console.log("Math value is",addfn(2,8));
console.log("Math value is",subfn(2,8));



