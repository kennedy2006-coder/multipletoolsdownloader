// ----------------- Sidebar & Dark Mode ----------------- //
function showTool(id){
    let pages=document.querySelectorAll(".toolPage");
    pages.forEach(p=>p.style.display="none");
    let tool=document.getElementById(id);
    if(tool) tool.style.display="block";
}
window.onload=function(){ showTool("home"); }

function toggleDark(){ document.body.classList.toggle("dark"); }

document.getElementById("toolSearch").addEventListener("keyup",function(){
    let filter=this.value.toLowerCase();
    let tools=document.querySelectorAll(".sidebar li:not(.categoryTitle)");
    tools.forEach(t=>t.style.display=t.textContent.toLowerCase().includes(filter)?"block":"none");
});

// ----------------- YouTube Thumbnail Downloader ----------------- //
function downloadThumbnail(){
    let url=document.getElementById("ytURL").value.trim();
    if(!url){alert("Enter YouTube URL"); return;}
    let videoId = url.split("v=")[1]?.split("&")[0];
    if(!videoId){alert("Invalid URL"); return;}
    let thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    document.getElementById("ytThumbnailResult").innerHTML=`<a href="${thumbUrl}" target="_blank">Download Thumbnail</a><br><img src="${thumbUrl}" style="max-width:300px;margin-top:10px;">`;
}

// ----------------- Video Downloader (Demo) ----------------- //
function downloadVideo(){
    let url=document.getElementById("videoURL").value.trim();
    if(!url){alert("Enter video URL"); return;}
    document.getElementById("videoResult").innerHTML=`Video downloader is demo only. Try <a href="${url}" target="_blank">Open Video</a>`;
}

// ----------------- Fake Identity Generator ----------------- //
async function generateIdentity(){
    let res=await fetch("https://randomuser.me/api/?results=1");
    let data=await res.json();
    let user=data.results[0];
    document.getElementById("identityResult").innerHTML=`
        <img src="${user.picture.large}" style="border-radius:50%;margin-bottom:10px;">
        <p><b>Name:</b> ${user.name.first} ${user.name.last}</p>
        <p><b>Gender:</b> ${user.gender}</p>
        <p><b>Age:</b> ${user.dob.age}</p>
        <p><b>Email:</b> ${user.email}</p>
        <p><b>Phone:</b> ${user.phone}</p>
        <p><b>Location:</b> ${user.location.city}, ${user.location.state}, ${user.location.country}</p>
    `;
}

// ----------------- Translator ----------------- //
async function translateText(){
    let text=document.getElementById("textToTranslate").value.trim();
    let target=document.getElementById("targetLang").value;
    if(!text){alert("Enter text"); return;}
    let res=await fetch("https://libretranslate.de/translate",{
        method:"POST",
        body:JSON.stringify({q:text,source:"auto",target:target,format:"text"}),
        headers:{"Content-Type":"application/json"}
    });
    let data=await res.json();
    document.getElementById("translatedResult").value=data.translatedText;
}

// ----------------- Emoji Translator ----------------- //
function emojiTranslate(){
    let txt=document.getElementById("emojiText").value.trim();
    if(!txt){alert("Enter text"); return;}
    let map={a:"🅰️",b:"🅱️",c:"🌜",d:"🌛",e:"🎗️",f:"🎏",g:"🌀",h:"♓",i:"ℹ️",j:"🎷",k:"🎋",l:"👢",m:"〽️",n:"🎵",o:"⚽",p:"🅿️",q:"❓",r:"🌱",s:"💲",t:"🌴",u:"⛎",v:"✅",w:"🔱",x:"❌",y:"☯️",z:"⚡", " ":"   "};
    let res=txt.toLowerCase().split("").map(c=>map[c]||c).join("");
    document.getElementById("emojiResult").innerText=res;
}

// ----------------- Acronym Generator ----------------- //
function generateAcronym(){
    let txt=document.getElementById("acronymText").value.trim();
    if(!txt){alert("Enter phrase"); return;}
    let res=txt.split(" ").map(w=>w.charAt(0).toUpperCase()).join("");
    document.getElementById("acronymResult").innerText=res;
}

// ----------------- Random Number Generator ----------------- //
function randomNumber(){
    let min=parseInt(document.getElementById("min").value);
    let max=parseInt(document.getElementById("max").value);
    if(isNaN(min)||isNaN(max)){alert("Enter min and max numbers"); return;}
    let r=Math.floor(Math.random()*(max-min+1))+min;
    document.getElementById("randomResult").innerText=r;
}

// ----------------- Age Calculator ----------------- //
function calculateAge(){
    let dob=document.getElementById("dob").value;
    if(!dob){alert("Select DOB"); return;}
    let age=new Date().getFullYear()-new Date(dob).getFullYear();
    document.getElementById("ageResult").innerText=age+" years";
}

// ----------------- Color Generator ----------------- //
function generateColor(){
    let c="#"+Math.floor(Math.random()*16777215).toString(16);
    document.getElementById("colorBox").style.background=c;
    document.getElementById("colorCode").innerText=c;
}

// ----------------- Daily Quote / Fortune ----------------- //
async function getFortune(){
    let res=await fetch("https://api.quotable.io/random");
    let data=await res.json();
    document.getElementById("fortuneResult").innerText=data.content+" — "+data.author;
}

// ----------------- Zodiac Calculator ----------------- //
function getZodiac(){
    let dob=document.getElementById("zodiacDOB").value;
    if(!dob){alert("Select DOB"); return;}
    let d=new Date(dob),m=d.getMonth()+1,day=d.getDate();
    let sign="";
    if((m==1 && day>=20)||(m==2 && day<=18)) sign="Aquarius";
    else if((m==2 && day>=19)||(m==3 && day<=20)) sign="Pisces";
    else if((m==3 && day>=21)||(m==4 && day<=19)) sign="Aries";
    else if((m==4 && day>=20)||(m==5 && day<=20)) sign="Taurus";
    else if((m==5 && day>=21)||(m==6 && day<=20)) sign="Gemini";
    else if((m==6 && day>=21)||(m==7 && day<=22)) sign="Cancer";
    else if((m==7 && day>=23)||(m==8 && day<=22)) sign="Leo";
    else if((m==8 && day>=23)||(m==9 && day<=22)) sign="Virgo";
    else if((m==9 && day>=23)||(m==10 && day<=22)) sign="Libra";
    else if((m==10 && day>=23)||(m==11 && day<=21)) sign="Scorpio";
    else if((m==11 && day>=22)||(m==12 && day<=21)) sign="Sagittarius";
    else sign="Capricorn";
    document.getElementById("zodiacResult").innerText=sign;
        }
