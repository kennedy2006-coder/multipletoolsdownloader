function generatePassword(){

let length=document.getElementById("length").value;

let chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";

let password="";

for(let i=0;i<length;i++){

password+=chars[Math.floor(Math.random()*chars.length)];

}

document.getElementById("output").value=password;

}