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

// FASTSAVERAPI DOWNLOADER (KEEP THIS ONE)

function downloadVideo(){

let url = document.getElementById("videoURL").value.trim();
let status = document.getElementById("downloadStatus");

if(!url){
status.innerText = "Please paste a video link";
return;
}

status.innerText = "Fetching video...";

fetch(`https://api.fastsaverapi.com/v1/download?url=${encodeURIComponent(url)}&token=nVlsqPmMQ1EMfvWV`)
.then(res => res.json())
.then(data => {

if(data.result && data.result.response){

status.innerHTML = "Download ready:<br>";

let link = document.createElement("a");
link.href = data.result.response;
link.innerText = "Download Video";
link.target = "_blank";

status.appendChild(link);

}else{
status.innerText = "Download failed. Try another link.";
}

})
.catch(err => {
status.innerText = "API error occurred.";
console.log(err);
});

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

// translator 
async function translateText() {
    let text = document.getElementById("textToTranslate").value;
    let target = document.getElementById("targetLang").value;
    let result = document.getElementById("translatedResult");

    if(!text){
        result.value = "Enter text to translate.";
        return;
    }

    result.value = "Translating...";

    try {
        let res = await fetch("https://libretranslate.de/translate", {
            method: "POST",
            body: JSON.stringify({
                q: text,
                source: "auto",
                target: target,
                format: "text"
            }),
            headers: {"Content-Type": "application/json"}
        });

        let data = await res.json();
        result.value = data.translatedText;
    } catch (err) {
        result.value = "Translation failed.";
        console.log(err);
    }
}










// name generator 

async function generateIdentity(){

let country = document.getElementById("identityCountry").value;
let gender = document.getElementById("identityGender").value;
let minAge = document.getElementById("minAge").value;
let maxAge = document.getElementById("maxAge").value;

let url = "https://randomuser.me/api/?results=1";

if(country){
url += "&nat=" + country;
}

if(gender){
url += "&gender=" + gender;
}

let res = await fetch(url);
let data = await res.json();
let user = data.results[0];

let age = user.dob.age;

/* AGE FILTER */
if(minAge && age < minAge){
return generateIdentity();
}

if(maxAge && age > maxAge){
return generateIdentity();
}

let name = user.name.first + " " + user.name.last;
let phone = user.phone;
let email = user.email;

let street = user.location.street.number + " " + user.location.street.name;
let city = user.location.city;
let state = user.location.state;
let countryName = user.location.country;
let postcode = user.location.postcode;

let picture = user.picture.large;

document.getElementById("identityResult").innerHTML = `
<img src="${picture}" style="width:120px;border-radius:50%">

<p><b>Name:</b> ${name}</p>
<p><b>Gender:</b> ${user.gender}</p>
<p><b>Age:</b> ${age}</p>
<p><b>Email:</b> ${email}</p>
<p><b>Phone:</b> ${phone}</p>
<p><b>Street:</b> ${street}</p>
<p><b>City:</b> ${city}</p>
<p><b>State:</b> ${state}</p>
<p><b>Country:</b> ${countryName}</p>
<p><b>Postcode:</b> ${postcode}</p>
`;

}




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

// hashtags 

function generateHashtags(){

let keyword = document.getElementById("hashtagKeyword").value.trim();
let platform = document.getElementById("platform").value;

if(!keyword){
document.getElementById("hashtagResult").value = "Enter a keyword.";
return;
}

let base = [
"#"+keyword,
"#"+keyword+"trend",
"#"+keyword+"viral",
"#"+keyword+"content",
"#"+keyword+"creator"
];

let platformTags = [];

if(platform==="tiktok"){
platformTags=["#fyp","#foryou","#foryoupage","#viral","#tiktoktrend"];
}

if(platform==="youtube"){
platformTags=["#youtube","#youtuber","#video","#subscribe","#ytshorts"];
}

if(platform==="instagram"){
platformTags=["#instagram","#instagood","#instadaily","#reels","#explorepage"];
}

if(platform==="twitter"){
platformTags=["#twitter","#xtrend","#viral","#trending","#tweet"];
}

let hashtags = base.concat(platformTags);

document.getElementById("hashtagResult").value = hashtags.join(" ");

}




