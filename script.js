// ------------------ UTILITY FUNCTIONS ------------------ //

// Show selected tool
function showTool(id){
    let pages=document.querySelectorAll(".toolPage");
    pages.forEach(p=>p.style.display="none");
    let tool=document.getElementById(id);
    if(!tool){
        console.warn("Tool not found:", id);
        return;
    }
    tool.style.display="flex";
}

// Initialize home on load
window.onload=function(){ showTool("home"); }

// Toggle Dark Mode
function toggleDark(){ document.body.classList.toggle("dark"); }

// Sidebar Search
document.getElementById("toolSearch").addEventListener("keyup",function(){
    let filter=this.value.toLowerCase();
    let tools=document.querySelectorAll(".sidebar li:not(.categoryTitle)");
    tools.forEach(t=>t.style.display=t.textContent.toLowerCase().includes(filter)?"block":"none");
});

// ------------------ TOOL FUNCTIONS ------------------ //

// 1. Password Generator
function generatePassword(){
    let length=parseInt(document.getElementById("passLength").value)||12;
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
function toAlternate(){ 
    let t=document.getElementById("caseText").value;
    let res=""; for(let i=0;i<t.length;i++){res+=(i%2==0)?t[i].toUpperCase():t[i].toLowerCase();}
    document.getElementById("caseText").value=res;
}

// 6. Text Reverser
function reverseText(){let t=document.getElementById("reverseText").value;document.getElementById("reverseResult").innerText=t.split("").reverse().join("");}

// 7. Remove Duplicates
function removeDuplicates(){let t=document.getElementById("duplicateText").value;document.getElementById("duplicateResult").value=[...new Set(t.split("\n"))].join("\n");}

// 8. Random Number Generator
function randomNumber(){
    let min=parseInt(document.getElementById("min").value)||0;
    let max=parseInt(document.getElementById("max").value)||100;
    if(min>max){[min,max]=[max,min];}
    let r=Math.floor(Math.random()*(max-min+1))+min;
    document.getElementById("randomResult").innerText=r;
}

// 9. Color Generator
function generateColor(){
    let c="#"+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');
    document.getElementById("colorBox").style.background=c;
    document.getElementById("colorCode").innerText=c;
}

// 10. Translator
async function translateText(){
    let text=document.getElementById("textToTranslate").value;
    let target=document.getElementById("targetLang").value;
    if(!text){document.getElementById("translatedResult").value="Enter text to translate."; return;}
    document.getElementById("translatedResult").value="Translating...";
    try{
        let res=await fetch("https://libretranslate.de/translate",{
            method:"POST",
            body:JSON.stringify({q:text,source:"auto",target:target,format:"text"}),
            headers:{"Content-Type":"application/json"}
        });
        let data=await res.json();
        document.getElementById("translatedResult").value=data.translatedText;
    }catch(e){document.getElementById("translatedResult").value="Translation failed."; console.log(e);}
}

// 11. Hashtag Generator
function generateHashtags(){
    let keyword=document.getElementById("hashtagKeyword").value.trim();
    let platform=document.getElementById("platform").value;
    if(!keyword){document.getElementById("hashtagResult").value="Enter a keyword."; return;}
    let base=["#"+keyword,"#"+keyword+"Trend","#"+keyword+"Viral","#"+keyword+"Content","#"+keyword+"Creator"];
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
    let minAge=parseInt(document.getElementById("minAge").value)||0;
    let maxAge=parseInt(document.getElementById("maxAge").value)||150;
    let url="https://randomuser.me/api/?results=1"+(country?"&nat="+country:"")+(gender?"&gender="+gender:"");
    let res=await fetch(url); let data=await res.json(); let user=data.results[0]; let age=user.dob.age;
    if(age<minAge||age>maxAge) return generateIdentity();
    let name=user.name.first+" "+user.name.last; let phone=user.phone; let email=user.email;
    let street=user.location.street.number+" "+user.location.street.name; let city=user.location.city;
    let state=user.location.state; let countryName=user.location.country; let postcode=user.location.postcode;
    let picture=user.picture.large;
    document.getElementById("identityResult").innerHTML=`
        <img src="${picture}" style="border-radius:50%;width:120px;height:120px;">
        <p><b>Name:</b> ${name}</p>
        <p><b>Gender:</b> ${user.gender}</p>
        <p><b>Age:</b> ${age}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Address:</b> ${street}, ${city}, ${state}, ${countryName} - ${postcode}</p>`;
}

// 13. QR Code Generator
function generateQRCode(){
    let text=document.getElementById("qrText").value;
    if(!text) return alert("Enter text or URL");
    let qr=document.getElementById("qrResult");
    qr.innerHTML=`<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}">`;
}

// 14. URL Encoder / Decoder
function encodeURL(){document.getElementById("urlResult").value=encodeURIComponent(document.getElementById("urlInput").value);}
function decodeURL(){document.getElementById("urlResult").value=decodeURIComponent(document.getElementById("urlInput").value);}

// 15. Random Quote / Fortune
async function getFortune(){
    try{
        let res=await fetch("https://api.quotable.io/random");
        let data=await res.json();
        document.getElementById("fortuneResult").innerText=`"${data.content}" — ${data.author}`;
    }catch(e){document.getElementById("fortuneResult").innerText="Could not fetch quote.";}
}

// 16. Meme Generator (Basic)
function generateMeme(){
    let text=document.getElementById("memeText").value;
    document.getElementById("memeResult").innerHTML=`<div style="width:300px;height:300px;background:#eee;display:flex;justify-content:center;align-items:center;text-align:center;padding:10px;">${text}</div>`;
}

// ------------------ MORE TOOLS CAN BE ADDED BELOW ------------------ //
// 17. Image Converter, Image Compressor, Page Speed Analyzer, Keyword Density Checker, PDF Generator, Sitemap Generator, Robots.txt Generator
// 18. YouTube Thumbnail Downloader, Video Downloader, TikTok Caption Generator, Instagram Bio Generator
// 19. Fake Email Generator, Zodiac Sign Calculator, Random Name Generator
// 20+. You can duplicate this structure and use fetch APIs or JS logic to add >200 tools
