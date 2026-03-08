// ------------------ TOOL DISPLAY ------------------ //
function showTool(id) {
    // Hide all tool pages
    const pages = document.querySelectorAll(".toolPage");
    pages.forEach(p => p.style.display = "none");

    // Show the selected tool
    const page = document.getElementById(id);
    if(page){
        page.style.display = "flex";      // Flex ensures content is centered
        page.style.justifyContent = "center";
        page.style.alignItems = "center";
        page.style.flexDirection = "column";
    }
}
window.onload = () => showTool("home");

// ------------------ DARK MODE ------------------ //
function toggleDark() {
    document.body.classList.toggle("dark");
}

// ------------------ SIDEBAR SEARCH ------------------ //
document.getElementById("toolSearch").addEventListener("keyup", function () {
    const filter = this.value.toLowerCase();
    const tools = document.querySelectorAll(".sidebar li:not(.categoryTitle)");
    tools.forEach(t => t.style.display = t.textContent.toLowerCase().includes(filter) ? "block" : "none");
});

// ------------------ MOBILE BANNER ------------------ //
if(/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    const banner = document.getElementById("mobileAlertBanner");
    banner.style.display = "block";
    document.getElementById("closeBanner").onclick = () => banner.style.display = "none";
}

// ------------------ TOOL FUNCTIONS ------------------ //

// 1. Password Generator
function generatePassword() {
    const length = document.getElementById("passLength").value || 12;
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let pass = "";
    for(let i=0; i<length; i++) pass += chars.charAt(Math.floor(Math.random()*chars.length));
    document.getElementById("passwordOutput").value = pass;
}

// 2. Password Strength Checker
document.getElementById("passwordCheck")?.addEventListener("input", function(){
    const val = this.value;
    let strength = "Weak";
    if(val.length > 8) strength = "Medium";
    if(val.match(/[A-Z]/) && val.match(/[0-9]/) && val.match(/[@$!%*?&]/)) strength = "Strong";
    document.getElementById("strengthResult").innerText = strength;
});

// 3. Word Counter
document.getElementById("wordText")?.addEventListener("input", function(){
    document.getElementById("wordCount").innerText = this.value.trim() ? this.value.trim().split(/\s+/).length : 0;
});

// 4. Character Counter
document.getElementById("charInput")?.addEventListener("input", function(){
    document.getElementById("charCount").innerText = this.value.length;
});

// 5. Case Converter
function toUpper(){ document.getElementById("caseText").value = document.getElementById("caseText").value.toUpperCase(); }
function toLower(){ document.getElementById("caseText").value = document.getElementById("caseText").value.toLowerCase(); }

// 6. Text Reverser
function reverseText(){ 
    const t = document.getElementById("reverseText").value;
    document.getElementById("reverseResult").innerText = t.split("").reverse().join("");
}

// 7. Remove Duplicate Lines
function removeDuplicates(){
    const t = document.getElementById("duplicateText").value;
    document.getElementById("duplicateResult").value = [...new Set(t.split("\n"))].join("\n");
}

// 8. Random Number Generator
function randomNumber(){
    const min = parseInt(document.getElementById("min").value) || 0;
    const max = parseInt(document.getElementById("max").value) || 100;
    const r = Math.floor(Math.random()*(max-min+1)) + min;
    document.getElementById("randomResult").innerText = r;
}

// 9. Color Generator
function generateColor(){
    const c = "#"+Math.floor(Math.random()*16777215).toString(16);
    document.getElementById("colorBox").style.background = c;
    document.getElementById("colorCode").innerText = c;
}

// 10. Translator (using LibreTranslate API)
async function translateText(){
    const text = document.getElementById("textToTranslate").value;
    const target = document.getElementById("targetLang").value;
    if(!text){ document.getElementById("translatedResult").value="Enter text."; return; }
    document.getElementById("translatedResult").value="Translating...";
    try{
        const res = await fetch("https://libretranslate.de/translate",{
            method:"POST",
            body:JSON.stringify({q:text,source:"auto",target:target,format:"text"}),
            headers:{"Content-Type":"application/json"}
        });
        const data = await res.json();
        document.getElementById("translatedResult").value = data.translatedText;
    } catch(e){
        document.getElementById("translatedResult").value="Translation failed.";
        console.error(e);
    }
}

// 11. Emoji Translator
function emojiTranslate(){
    const txt = document.getElementById("emojiText").value;
    const emojis = {happy:"😄", sad:"😢", love:"❤️", cat:"🐱", dog:"🐶", fire:"🔥"};
    let result = txt.split(" ").map(w=>emojis[w.toLowerCase()]||w).join(" ");
    document.getElementById("emojiResult").innerText = result;
}

// 12. Acronym Generator
function generateAcronym(){
    const phrase = document.getElementById("acronymText").value;
    if(!phrase){ document.getElementById("acronymResult").innerText="Enter text."; return; }
    const acronym = phrase.split(/\s+/).map(w=>w[0].toUpperCase()).join("");
    document.getElementById("acronymResult").innerText = acronym;
}

// 13. Hashtag Generator
function generateHashtags(){
    const keyword = document.getElementById("hashtagKeyword").value.trim();
    const platform = document.getElementById("platform").value;
    if(!keyword){document.getElementById("hashtagResult").value="Enter keyword."; return;}
    const base = ["#"+keyword,"#"+keyword+"trend","#"+keyword+"viral","#"+keyword+"content","#"+keyword+"creator"];
    let tags = [];
    if(platform==="tiktok") tags=["#fyp","#foryou","#foryoupage","#viral","#tiktoktrend"];
    if(platform==="youtube") tags=["#youtube","#youtuber","#video","#subscribe","#ytshorts"];
    if(platform==="instagram") tags=["#instagram","#instagood","#instadaily","#reels","#explorepage"];
    if(platform==="twitter") tags=["#twitter","#xtrend","#viral","#trending","#tweet"];
    document.getElementById("hashtagResult").value = base.concat(tags).join(" ");
}

// 14. Fake Identity Generator
async function generateIdentity(){
    const country = document.getElementById("identityCountry").value;
    const gender = document.getElementById("identityGender").value;
    const minAge = parseInt(document.getElementById("minAge").value) || 0;
    const maxAge = parseInt(document.getElementById("maxAge").value) || 120;
    try{
        const res = await fetch(`https://randomuser.me/api/?nat=${country || ''}&gender=${gender || ''}`);
        const data = await res.json();
        const user = data.results[0];
        const age = user.dob.age;
        if(age < minAge || age > maxAge) return generateIdentity();
        document.getElementById("identityResult").innerHTML = `
            <img src="${user.picture.large}" style="border-radius:50%;"><p><b>Name:</b> ${user.name.first} ${user.name.last}</p>
            <p><b>Gender:</b> ${user.gender}</p>
            <p><b>Age:</b> ${age}</p>
            <p><b>Email:</b> ${user.email}</p>
            <p><b>Phone:</b> ${user.phone}</p>
            <p><b>Location:</b> ${user.location.city}, ${user.location.state}, ${user.location.country}</p>
        `;
    } catch(e){ console.error(e); document.getElementById("identityResult").innerText="Failed to fetch user.";}
}

// 15. YouTube Thumbnail Downloader
function youtubeThumbnail(){
    const url = document.getElementById("ytUrl").value;
    if(!url){ document.getElementById("ytThumbnailResult").innerHTML="Enter YouTube URL."; return; }
    const idMatch = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if(!idMatch){ document.getElementById("ytThumbnailResult").innerHTML="Invalid URL."; return; }
    const thumbUrl = `https://img.youtube.com/vi/${idMatch[1]}/maxresdefault.jpg`;
    document.getElementById("ytThumbnailResult").innerHTML = `<img src="${thumbUrl}" style="max-width:100%;">`;
}

// 16. Video Downloader Demo
function videoDownloadDemo(){
    document.getElementById("videoDownloadResult").innerText="Video downloader demo. Full functionality requires server-side support.";
}

// 17. TikTok Caption Generator
function tiktokCaptionGen(){
    const topic = document.getElementById("captionTopic").value.trim();
    if(!topic){document.getElementById("captionResult").innerText="Enter topic."; return;}
    const captions = [
        `Can't believe this ${topic}! 😲`,
        `When ${topic} happens... 😂`,
        `${topic} vibes only ✨`,
        `Who else loves ${topic}? ❤️`
    ];
    document.getElementById("captionResult").innerText = captions[Math.floor(Math.random()*captions.length)];
}

// 18. Instagram Bio Generator
function igBioGen(){
    const keyword = document.getElementById("bioKeyword").value.trim();
    if(!keyword){document.getElementById("bioResult").innerText="Enter keyword."; return;}
    const bios = [
        `${keyword} lover ❤️`,
        `Official ${keyword} account`,
        `${keyword} enthusiast ✨`,
        `Living the ${keyword} life 😎`
    ];
    document.getElementById("bioResult").innerText = bios[Math.floor(Math.random()*bios.length)];
}

// 19. Meta Tag Generator
function metaTagGen(){
    const title = document.getElementById("metaTitle").value;
    const desc = document.getElementById("metaDesc").value;
    const keywords = document.getElementById("metaKeywords").value;
    document.getElementById("metaResult").value = `<title>${title}</title>\n<meta name="description" content="${desc}">\n<meta name="keywords" content="${keywords}">`;
}

// 20. Daily Quote / Fortune
function dailyQuote(){
    const quotes = [
        "You are stronger than you think.",
        "Today is a perfect day for new beginnings.",
        "Happiness is a choice.",
        "Believe in yourself and all that you are.",
        "Your potential is endless."
    ];
    document.getElementById("fortuneResult").innerText = quotes[Math.floor(Math.random()*quotes.length)];
}

// 21. Zodiac Sign Calculator
function zodiacCalc(){
    const day = parseInt(document.getElementById("birthDay").value);
    const month = parseInt(document.getElementById("birthMonth").value);
    if(!day || !month){document.getElementById("zodiacResult").innerText="Enter valid date."; return;}
    const zodiacSigns = [
        "Capricorn","Aquarius","Pisces","Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius"
    ];
    const lastDays = [19,18,20,19,20,20,22,22,22,22,21,21];
    const sign = day > lastDays[month-1] ? zodiacSigns[month] : zodiacSigns[month-1];
    document.getElementById("zodiacResult").innerText = sign;
}

// ------------------ ADDITIONAL TOOLS ------------------ //
// You can extend more tools below following the same pattern, all will display centered and functional
