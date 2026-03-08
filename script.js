function showTool(id){

let tools=document.querySelectorAll(".tool");

tools.forEach(tool=>tool.style.display="none");

document.getElementById(id).style.display="block";

window.scrollTo(0,document.getElementById(id).offsetTop);

}


/* SEARCH */

function searchTools(){

let input=document.getElementById("search").value.toLowerCase();

let buttons=document.querySelectorAll(".tool-grid button");

buttons.forEach(btn=>{

let text=btn.innerText.toLowerCase();

if(text.includes(input)){

btn.style.display="block";

}else{

btn.style.display="none";

}

});

}


/* WORD COUNTER */

function countWords(){

let text=document.getElementById("text").value;

let words=text.trim().split(/\s+/).length;

document.getElementById("wordResult").innerText="Words: "+words;

}


/* PASSWORD GENERATOR */

function generatePassword(){

let chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

let pass="";

for(let i=0;i<12;i++){

pass+=chars[Math.floor(Math.random()*chars.length)];

}

document.getElementById("passwordResult").innerText=pass;

}


/* FAKE IDENTITY */

function generateIdentity(){

let names=["John Walker","Emma Taylor","Michael Scott","Sophia Brown"];

let cities=["New York","London","Toronto","Sydney"];

let name=names[Math.floor(Math.random()*names.length)];

let city=cities[Math.floor(Math.random()*cities.length)];

let age=Math.floor(Math.random()*40)+18;

let phone="+1"+Math.floor(1000000000+Math.random()*9000000000);

let email=name.replace(" ","").toLowerCase()+"@mail.com";

document.getElementById("identityResult").innerHTML=

`Name: ${name}<br>
Age: ${age}<br>
City: ${city}<br>
Phone: ${phone}<br>
Email: ${email}`;

}


/* TEXT TO SPEECH */

function speak(){

let text=document.getElementById("speechText").value;

let speech=new SpeechSynthesisUtterance(text);

speechSynthesis.speak(speech);

}
