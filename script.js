// Show Tool
function showTool(id){
    let pages=document.querySelectorAll(".toolPage");
    pages.forEach(p=>p.style.display="none");
    document.getElementById(id).style.display="block";
}
window.onload=function(){ showTool("home"); }

// Dark Mode
function toggleDark(){ document.body.classList.toggle("dark"); }

// Sidebar Search
document.getElementById("toolSearch").addEventListener("keyup",function(){
    let filter=this.value.toLowerCase();
    let tools=document.querySelectorAll(".sidebar li:not(.categoryTitle)");
    tools.forEach(t=>t.style.display=t.textContent.toLowerCase().includes(filter)?"block":"none");
});

// ---------------- TOOLS FUNCTIONS ---------------- //

// 1. Password Generator
function generatePassword(){
    let length=document.getElementById("passLength").value;
    let chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
    let pass="";
    for(let i=0;i<length;i++) pass+=chars.charAt(Math.floor(Math.random()*chars.length));
    document.getElementById("passwordOutput").value=pass;
}

// 2. Password Strength Checker
document.getElementById("passwordCheck")?.addEventListener("input",function(){
    let val=this.value,strength="Weak";
    if(val.length>8) strength="Medium";
    if(val.match(/[A-Z]/)&&val.match(/[0-9]/)&&val.match(/[@$!%*?&]/)) strength="Strong";
    document.getElementById("strengthResult").innerText=strength;
});

// 3. Word Counter
document.getElementById("wordText")?.addEventListener("input",function(){
    document.getElementById("wordCount").innerText=this.value.trim()?this.value.trim().split(/\s+/).length:0;
});

// 4. Character Counter
document.getElementById("charInput")?.addEventListener("input",function(){
    document.getElementById("charCount").innerText=this.value.length;
});

// 5. Case Converter
function toUpper(){document.getElementById("caseText").value=document.getElementById("caseText").value.toUpperCase();}
function toLower(){document.getElementById("caseText").value=document.getElementById("caseText").value.toLowerCase();}

// 6. Text Reverser
function reverseText(){let t=document.getElementById("reverseText").value;document.getElementById("reverseResult").innerText=t.split("").reverse().join("");}

// 7. Remove Duplicates
function removeDuplicates(){let t=document.getElementById("duplicateText").value;document.getElementById("duplicateResult").value=[...new Set(t.split("\n"))].join("\n");}

// 8. Random Number Generator
function randomNumber(){let min=parseInt(document.getElementById("min").value),max=parseInt(document.getElementById("max").value),r=Math.floor(Math.random()*(max-min+1))+min;document.getElementById("randomResult").innerText=r;}

// 9. Color Generator
function generateColor(){let c="#"+Math.floor(Math.random()*16777215).toString(16);document.getElementById("colorBox").style.background=c;document.getElementById("colorCode").innerText=c;}

// 10. Translator
async function translateText(){
    let text=document.getElementById("textToTranslate").value;
    let target=document.getElementById("targetLang").value;
    if(!text){document.getElementById("translatedResult").value="Enter text to translate."; return;}
    document.getElementById("translatedResult").value="Translating...";
    try{
        let res=await fetch("https://libretranslate.de/translate",{method:"POST",body:JSON.stringify({q:text,source:"auto",target:target,format:"text"}),headers:{"Content-Type":"application/json"}});
        let data=await res.json();
        document.getElementById("translatedResult").value=data.translatedText;
    }catch(e){document.getElementById("translatedResult").value="Translation failed."; console.log(e);}
}

// 11. Hashtag Generator
function generateHashtags(){
    let keyword=document.getElementById("hashtagKeyword").value.trim();
    let platform=document.getElementById("platform").value;
    if(!keyword){document.getElementById("hashtagResult").value="Enter a keyword."; return;}
    let base=["#"+keyword,"#"+keyword+"trend","#"+keyword+"viral","#"+keyword+"content","#"+keyword+"creator"];
    let tags=[];
    if(platform==="tiktok") tags=["#fyp","#foryou","#foryoupage","#viral","#tiktoktrend"];
    if(platform==="youtube") tags=["#youtube","#youtuber","#video","#subscribe","#ytshorts"];
    if(platform==="instagram") tags=["#instagram","#instagood","#instadaily","#reels","#explorepage"];
    if(platform==="twitter") tags=["#twitter","#xtrend","#viral","#trending","#tweet"];
    document.getElementById("hashtagResult").value=base.concat(tags).join(" ");
}

// 12. Fake Identity Generator
async function generateIdentity(){
    let country=document.getElementById("identityCountry").value;
    let gender=document.getElementById("identityGender").value;
    let minAge=document.getElementById("minAge").value;
    let maxAge=document.getElementById("maxAge").value;
    let url="https://randomuser.me/api/?results=1"+(country?"&nat="+country:"")+(gender?"&gender="+gender:"");
    let res=await fetch(url); let data=await res.json(); let user=data.results[0]; let age=user.dob.age;
    if(minAge&&age<minAge||maxAge&&age>maxAge) return generateIdentity();
    let name=user.name.first+" "+user.name.last; let phone=user.phone; let email=user.email;
    let street=user.location.street.number+" "+user.location.street.name; let city=user.location.city; let state=user.location.state; let countryName=user.location.country; let postcode=user.location.postcode; let picture=user.picture.large;
    document.getElementById("identityResult").innerHTML=`<img src="${picture}"><p><b>Name:</b> ${name}</p><p><b>Gender:</b> ${user.gender}</p><p><b>Age:</b> ${age}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone}</p><p><b>Street:</b> ${street}</p><p><b>City:</b> ${city}</p><p><b>State:</b> ${state}</p><p><b>Country:</b> ${countryName}</p><p><b>Postcode:</b> ${postcode}</p>`;}
