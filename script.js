function showTool(id){

let pages=document.querySelectorAll(".toolPage");

pages.forEach(page=>{
page.style.display="none";
});

document.getElementById(id).style.display="block";

}

window.onload=function(){
showTool("home");
}


// DARK MODE

function toggleDark(){

document.body.classList.toggle("dark");

}


// PASSWORD

function generatePassword(){

let length=document.getElementById("passLength").value;

let chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";

let pass="";

for(let i=0;i<length;i++){

pass+=chars.charAt(Math.floor(Math.random()*chars.length));

}

document.getElementById("passwordOutput").value=pass;

}


// WORD COUNTER

document.addEventListener("input",function(){

let text=document.getElementById("wordText");

if(text){

let words=text.value.trim().split(/\s+/).length;

document.getElementById("wordCount").innerText=words;

}

});


// CASE

function toUpper(){

let text=document.getElementById("caseText");

text.value=text.value.toUpperCase();

}

function toLower(){

let text=document.getElementById("caseText");

text.value=text.value.toLowerCase();

}


// AGE

function calculateAge(){

let dob=new Date(document.getElementById("dob").value);

let today=new Date();

let age=today.getFullYear()-dob.getFullYear();

document.getElementById("ageResult").innerText="Age: "+age;

}


// SPEECH

function speak(){

let text=document.getElementById("speechText").value;

let speech=new SpeechSynthesisUtterance(text);

speechSynthesis.speak(speech);

}


// RANDOM

function randomNumber(){

let min=parseInt(document.getElementById("min").value);

let max=parseInt(document.getElementById("max").value);

let result=Math.floor(Math.random()*(max-min+1))+min;

document.getElementById("randomResult").innerText=result;

}


// COLOR

function generateColor(){

let color="#"+Math.floor(Math.random()*16777215).toString(16);

document.getElementById("colorBox").style.background=color;

document.getElementById("colorCode").innerText=color;

}


function downloadVideo(){

let url = document.getElementById("videoURL").value;

if(url.includes("tiktok")){

window.open("https://tikwm.com/api/?url="+url);

}

else{

window.open("https://api.vevioz.com/api/button/mp4?url="+url);

}

}


// TOOL SEARCH

document.getElementById("toolSearch").addEventListener("keyup", function(){

let filter = this.value.toLowerCase();

let tools = document.querySelectorAll(".sidebar li");

tools.forEach(function(item){

let text = item.textContent.toLowerCase();

if(text.includes(filter)){

item.style.display = "block";

}else{

item.style.display = "none";

}

});

});

// IMAGE TO PDF

function convertPDF(){

let file=document.getElementById("pdfFile").files[0];

if(!file)return;

let reader=new FileReader();

reader.onload=function(e){

let img=new Image();

img.src=e.target.result;

img.onload=function(){

let canvas=document.createElement("canvas");

canvas.width=img.width;

canvas.height=img.height;

let ctx=canvas.getContext("2d");

ctx.drawImage(img,0,0);

let link=document.createElement("a");

link.download="converted.pdf";

link.href=canvas.toDataURL();

link.click();

};

};

reader.readAsDataURL(file);

}


// IMAGE CONVERTER

function convertImage(){

let file=document.getElementById("imageInput").files[0];

let format=document.getElementById("format").value;

let reader=new FileReader();

reader.onload=function(e){

let img=new Image();

img.src=e.target.result;

img.onload=function(){

let canvas=document.createElement("canvas");

canvas.width=img.width;

canvas.height=img.height;

let ctx=canvas.getContext("2d");

ctx.drawImage(img,0,0);

let url=canvas.toDataURL(format);

let a=document.getElementById("downloadImage");

a.href=url;

a.download="converted";

a.innerText="Download Image";

};

};

reader.readAsDataURL(file);

}


// TEXT REVERSER

function reverseText(){

let text=document.getElementById("reverseText").value;

let reversed=text.split("").reverse().join("");

document.getElementById("reverseResult").innerText=reversed;

}


// REMOVE DUPLICATE LINES

function removeDuplicates(){

let text=document.getElementById("duplicateText").value;

let lines=text.split("\n");

let unique=[...new Set(lines)];

document.getElementById("duplicateResult").value=unique.join("\n");

}


// YOUTUBE THUMBNAIL

function getThumbnail(){

let url=document.getElementById("ytlink").value;

let id=url.split("v=")[1];

let thumbnail="https://img.youtube.com/vi/"+id+"/maxresdefault.jpg";

document.getElementById("thumbnailResult").src=thumbnail;

}


// META TAG GENERATOR

function generateMeta(){

let title=document.getElementById("metaTitle").value;

let desc=document.getElementById("metaDesc").value;

let keywords=document.getElementById("metaKeywords").value;

let code=`<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="keywords" content="${keywords}">`;

document.getElementById("metaResult").value=code;

}


// QR CODE

function generateQR(){

let text=document.getElementById("qrText").value;

document.getElementById("qrResult").src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data="+text;

}


// IMAGE COMPRESSOR

function compressImage(){

let file=document.getElementById("compressImage").files[0];

let reader=new FileReader();

reader.onload=function(e){

let img=new Image();

img.src=e.target.result;

img.onload=function(){

let canvas=document.createElement("canvas");

let ctx=canvas.getContext("2d");

canvas.width=img.width/2;

canvas.height=img.height/2;

ctx.drawImage(img,0,0,canvas.width,canvas.height);

let url=canvas.toDataURL("image/jpeg",0.7);

let a=document.getElementById("downloadCompressed");

a.href=url;

a.download="compressed.jpg";

a.innerText="Download Image";

};

};

reader.readAsDataURL(file);

}


// CHARACTER COUNTER

document.addEventListener("input",function(){

let text=document.getElementById("charInput");

if(text){

document.getElementById("charCount").innerText=text.value.length;

}

});


// ALTERNATE CASE

function alternateCase(){

let text=document.getElementById("altText").value;

let result="";

for(let i=0;i<text.length;i++){

result+=i%2?text[i].toLowerCase():text[i].toUpperCase();

}

document.getElementById("altResult").innerText=result;

}


// URL ENCODE DECODE

function encodeURL(){

let text=document.getElementById("urlText").value;

document.getElementById("urlResult").innerText=encodeURIComponent(text);

}

function decodeURL(){

let text=document.getElementById("urlText").value;

document.getElementById("urlResult").innerText=decodeURIComponent(text);

}


// PASSWORD STRENGTH

document.getElementById("passwordCheck").addEventListener("input",function(){

let val=this.value;

let strength="Weak";

if(val.length>8) strength="Medium";

if(val.match(/[A-Z]/)&&val.match(/[0-9]/)&&val.match(/[@$!%*?&]/)) strength="Strong";

document.getElementById("strengthResult").innerText=strength;

});