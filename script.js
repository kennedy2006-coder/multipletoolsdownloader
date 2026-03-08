// ------------------ General UI ------------------ //

// Show Tool
function showTool(id){
    let pages=document.querySelectorAll(".toolPage");
    pages.forEach(p=>p.style.display="none");
    let active=document.getElementById(id);
    if(active) active.style.display="block";
}

// Dark Mode
function toggleDark(){ document.body.classList.toggle("dark"); }

// Sidebar Search
document.getElementById("toolSearch").addEventListener("keyup",function(){
    let filter=this.value.toLowerCase();
    let tools=document.querySelectorAll("#toolList li:not(.categoryTitle)");
    tools.forEach(t=>t.style.display=t.textContent.toLowerCase().includes(filter)?"block":"none");
});

// Load Home on start
window.onload=function(){ showTool("home"); }

// ------------------ Tools ------------------ //

// 1. Password Generator
function generatePassword(){
    let length=parseInt(document.getElementById("passLength").value) || 12;
    let chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let pass="";
    for(let i=0;i<length;i++) pass+=chars.charAt(Math.floor(Math.random()*chars.length));
    document.getElementById("passwordOutput").value=pass;
}

// 2. Language Translator (LibreTranslate API)
async function translateText(){
    let text=document.getElementById("textToTranslate").value;
    let target=document.getElementById("targetLang").value;
    let output=document.getElementById("translatedResult");
    if(!text){ output.value="Enter text to translate."; return; }
    output.value="Translating...";
    try{
        let res=await fetch("https://libretranslate.de/translate",{
            method:"POST",
            body: JSON.stringify({q:text,source:"auto",target:target,format:"text"}),
            headers: {"Content-Type":"application/json"}
        });
        let data=await res.json();
        output.value=data.translatedText;
    }catch(e){ output.value="Translation failed."; console.error(e);}
}

// 3. Emoji Translator (basic mapping)
function emojiTranslate(){
    let text=document.getElementById("emojiText").value;
    let map={"happy":"😃","love":"❤️","cat":"🐱","dog":"🐶","fire":"🔥","star":"⭐","ok":"👌","sad":"😢"};
    let words=text.split(" ");
    let translated=words.map(w=>map[w.toLowerCase()]||w).join(" ");
    document.getElementById("emojiResult").value=translated;
}

// 4. Acronym Generator
function generateAcronym(){
    let phrase=document.getElementById("acronymInput").value.trim();
    if(!phrase){ document.getElementById("acronymOutput").value="Enter phrase."; return; }
    let acronym=phrase.split(/\s+/).map(w=>w[0].toUpperCase()).join("");
    document.getElementById("acronymOutput").value=acronym;
}

// 5. Random Number Generator
function randomNumber(){
    let min=parseInt(document.getElementById("min").value) || 1;
    let max=parseInt(document.getElementById("max").value) || 100;
    if(min>max){ [min,max]=[max,min]; }
    let r=Math.floor(Math.random()*(max-min+1))+min;
    document.getElementById("randomResult").innerText=r;
}

// 6. Color Generator
function generateColor(){
    let c="#"+Math.floor(Math.random()*16777215).toString(16);
    document.getElementById("colorBox").style.background=c;
    document.getElementById("colorCode").innerText=c;
}

// 7. Fortune / Daily Quote (Free API)
async function generateFortune(){
    let result=document.getElementById("fortuneResult");
    result.innerText="Loading...";
    try{
        let res=await fetch("https://api.quotable.io/random");
        let data=await res.json();
        result.innerText=data.content+" —"+data.author;
    }catch(e){ result.innerText="Failed to fetch quote."; console.error(e);}
}

// 8. Age Calculator
function calculateAge(){
    let dob=document.getElementById("dob").value;
    if(!dob){ document.getElementById("ageResult").innerText="Select your birth date."; return; }
    let diff=new Date()-new Date(dob);
    let age=Math.floor(diff/(1000*60*60*24*365.25));
    document.getElementById("ageResult").innerText="Age: "+age+" years";
}

// 9. Zodiac Sign Calculator
function calculateZodiac(){
    let dob=document.getElementById("zodiacDob").value;
    if(!dob){ document.getElementById("zodiacResult").innerText="Select your birth date."; return; }
    let d=new Date(dob);
    let day=d.getDate(), month=d.getMonth()+1;
    let zodiac="";
    if((month==1 && day>=20)||(month==2 && day<=18)) zodiac="Aquarius";
    else if((month==2 && day>=19)||(month==3 && day<=20)) zodiac="Pisces";
    else if((month==3 && day>=21)||(month==4 && day<=19)) zodiac="Aries";
    else if((month==4 && day>=20)||(month==5 && day<=20)) zodiac="Taurus";
    else if((month==5 && day>=21)||(month==6 && day<=20)) zodiac="Gemini";
    else if((month==6 && day>=21)||(month==7 && day<=22)) zodiac="Cancer";
    else if((month==7 && day>=23)||(month==8 && day<=22)) zodiac="Leo";
    else if((month==8 && day>=23)||(month==9 && day<=22)) zodiac="Virgo";
    else if((month==9 && day>=23)||(month==10 && day<=22)) zodiac="Libra";
    else if((month==10 && day>=23)||(month==11 && day<=21)) zodiac="Scorpio";
    else if((month==11 && day>=22)||(month==12 && day<=21)) zodiac="Sagittarius";
    else zodiac="Capricorn";
    document.getElementById("zodiacResult").innerText=zodiac;
}

// 10. Placeholder for Social Media / SEO / Image/Video tools
function apiToolAlert(name){
    alert(`${name} requires server/API integration. Demo unavailable in front-end only.`);
                                     }
