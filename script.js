// ----------------------- SHOW TOOL -----------------------
function showTool(id) {
    let pages = document.querySelectorAll(".toolPage");
    pages.forEach(p => p.style.display = "none");
    const tool = document.getElementById(id);
    if(tool){
        tool.style.display = "flex"; // display flex for centering
        tool.scrollIntoView({behavior:"smooth", block:"center"}); // center content vertically
    }
}
window.onload = function() { showTool("home"); };

// ----------------------- DARK MODE -----------------------
function toggleDark() { document.body.classList.toggle("dark"); }

// ----------------------- SIDEBAR SEARCH -----------------------
document.getElementById("toolSearch").addEventListener("keyup", function(){
    let filter = this.value.toLowerCase();
    let tools = document.querySelectorAll(".sidebar li:not(.categoryTitle)");
    tools.forEach(t => t.style.display = t.textContent.toLowerCase().includes(filter) ? "block" : "none");
});

// ----------------------- PASSWORD GENERATOR -----------------------
function generatePassword() {
    let length = parseInt(document.getElementById("passLength")?.value) || 12;
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]";
    let pass = "";
    for(let i=0;i<length;i++) pass += chars.charAt(Math.floor(Math.random()*chars.length));
    if(document.getElementById("passwordOutput")) document.getElementById("passwordOutput").value = pass;
}

// ----------------------- PASSWORD STRENGTH -----------------------
document.getElementById("passwordCheck")?.addEventListener("input", function(){
    let val = this.value;
    let strength = "Weak";
    if(val.length > 8) strength = "Medium";
    if(val.match(/[A-Z]/) && val.match(/[0-9]/) && val.match(/[@$!%*?&]/)) strength = "Strong";
    if(document.getElementById("strengthResult")) document.getElementById("strengthResult").innerText = strength;
});

// ----------------------- WORD COUNTER -----------------------
document.getElementById("wordText")?.addEventListener("input", function(){
    if(document.getElementById("wordCount"))
        document.getElementById("wordCount").innerText = this.value.trim() ? this.value.trim().split(/\s+/).length : 0;
});

// ----------------------- CHARACTER COUNTER -----------------------
document.getElementById("charInput")?.addEventListener("input", function(){
    if(document.getElementById("charCount")) document.getElementById("charCount").innerText = this.value.length;
});

// ----------------------- CASE CONVERTER -----------------------
function toUpper() { document.getElementById("caseText").value = document.getElementById("caseText").value.toUpperCase(); }
function toLower() { document.getElementById("caseText").value = document.getElementById("caseText").value.toLowerCase(); }

// ----------------------- TEXT REVERSER -----------------------
function reverseText() { 
    let t = document.getElementById("reverseText").value;
    if(document.getElementById("reverseResult")) document.getElementById("reverseResult").innerText = t.split("").reverse().join(""); 
}

// ----------------------- REMOVE DUPLICATES -----------------------
function removeDuplicates() {
    let t = document.getElementById("duplicateText").value;
    if(document.getElementById("duplicateResult"))
        document.getElementById("duplicateResult").value = [...new Set(t.split("\n"))].join("\n");
}

// ----------------------- RANDOM NUMBER GENERATOR -----------------------
function randomNumber() {
    let min = parseInt(document.getElementById("min")?.value) || 0;
    let max = parseInt(document.getElementById("max")?.value) || 100;
    let r = Math.floor(Math.random()*(max-min+1)) + min;
    if(document.getElementById("randomResult")) document.getElementById("randomResult").innerText = r;
}

// ----------------------- COLOR GENERATOR -----------------------
function generateColor() {
    let c = "#" + Math.floor(Math.random()*16777215).toString(16);
    if(document.getElementById("colorBox")) document.getElementById("colorBox").style.background = c;
    if(document.getElementById("colorCode")) document.getElementById("colorCode").innerText = c;
}

// ----------------------- LANGUAGE TRANSLATOR -----------------------
async function translateText() {
    let text = document.getElementById("textToTranslate")?.value;
    let target = document.getElementById("targetLang")?.value;
    let result = document.getElementById("translatedResult");
    if(!text){ result.value = "Enter text to translate."; return; }
    result.value = "Translating...";
    try {
        let res = await fetch("https://libretranslate.de/translate", {
            method:"POST",
            body:JSON.stringify({q:text,source:"auto",target:target,format:"text"}),
            headers:{"Content-Type":"application/json"}
        });
        let data = await res.json();
        result.value = data.translatedText;
    } catch(e){ result.value = "Translation failed."; console.log(e); }
}

// ----------------------- HASHTAG GENERATOR -----------------------
function generateHashtags(){
    let keyword = document.getElementById("hashtagKeyword")?.value.trim();
    let platform = document.getElementById("platform")?.value;
    if(!keyword){ document.getElementById("hashtagResult").value="Enter a keyword."; return; }
    let base = ["#"+keyword,"#"+keyword+"trend","#"+keyword+"viral","#"+keyword+"content","#"+keyword+"creator"];
    let tags = [];
    if(platform==="tiktok") tags=["#fyp","#foryou","#foryoupage","#viral","#tiktoktrend"];
    if(platform==="youtube") tags=["#youtube","#youtuber","#video","#subscribe","#ytshorts"];
    if(platform==="instagram") tags=["#instagram","#instagood","#instadaily","#reels","#explorepage"];
    if(platform==="twitter") tags=["#twitter","#xtrend","#viral","#trending","#tweet"];
    document.getElementById("hashtagResult").value = base.concat(tags).join(" ");
}

// ----------------------- FAKE IDENTITY GENERATOR -----------------------
async function generateIdentity(){
    let country = document.getElementById("identityCountry")?.value;
    let gender = document.getElementById("identityGender")?.value;
    let minAge = parseInt(document.getElementById("minAge")?.value);
    let maxAge = parseInt(document.getElementById("maxAge")?.value);
    let url = "https://randomuser.me/api/?results=1"+(country?"&nat="+country:"")+(gender?"&gender="+gender:"");
    let res = await fetch(url);
    let data = await res.json();
    let user = data.results[0];
    let age = user.dob.age;
    if(minAge && age < minAge || maxAge && age > maxAge) return generateIdentity();
    let name = user.name.first+" "+user.name.last;
    let phone = user.phone;
    let email = user.email;
    let street = user.location.street.number+" "+user.location.street.name;
    let city = user.location.city;
    let state = user.location.state;
    let countryName = user.location.country;
    let postcode = user.location.postcode;
    let picture = user.picture.large;
    document.getElementById("identityResult").innerHTML = `<img src="${picture}" style="width:120px;border-radius:50%"><p><b>Name:</b> ${name}</p><p><b>Gender:</b> ${user.gender}</p><p><b>Age:</b> ${age}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone}</p><p><b>Street:</b> ${street}</p><p><b>City:</b> ${city}</p><p><b>State:</b> ${state}</p><p><b>Country:</b> ${countryName}</p><p><b>Postcode:</b> ${postcode}</p>`;
}

// ----------------------- VIDEO DOWNLOADER -----------------------
async function downloadVideo() {
    let url = document.getElementById("videoURL")?.value.trim();
    let status = document.getElementById("downloadStatus");
    if(!url){ status.innerText = "Please paste a video link"; return; }
    status.innerText = "Fetching video...";
    try {
        let res = await fetch(`https://api.fastsaverapi.com/v1/download?url=${encodeURIComponent(url)}&token=nVlsqPmMQ1EMfvWV`);
        let data = await res.json();
        if(data.result && data.result.response){
            status.innerHTML = "Download ready:<br>";
            let link = document.createElement("a");
            link.href = data.result.response;
            link.innerText = "Download Video";
            link.target = "_blank";
            status.appendChild(link);
        } else status.innerText = "Download failed. Try another link.";
    } catch(e){ status.innerText = "API error occurred."; console.log(e); }
}

// ----------------------- URL ENCODE/DECODE -----------------------
function encodeURL(){ let t=document.getElementById("urlText").value; document.getElementById("urlResult").innerText=encodeURIComponent(t); }
function decodeURL(){ let t=document.getElementById("urlText").value; document.getElementById("urlResult").innerText=decodeURIComponent(t); }

// ----------------------- IMAGE CONVERTER -----------------------
function convertImage(){
    let file=document.getElementById("imageInput")?.files[0];
    let format=document.getElementById("format")?.value;
    if(!file) return;
    let reader=new FileReader();
    reader.onload=function(e){
        let img=new Image();
        img.src=e.target.result;
        img.onload=function(){
            let canvas=document.createElement("canvas");
            canvas.width=img.width; canvas.height=img.height;
            canvas.getContext("2d").drawImage(img,0,0);
            let a=document.getElementById("downloadImage");
            a.href=canvas.toDataURL(format);
            a.download="converted";
            a.innerText="Download Image";
        }
    };
    reader.readAsDataURL(file);
}

// ----------------------- IMAGE TO PDF -----------------------
function convertPDF(){
    let file=document.getElementById("pdfFile")?.files[0];
    if(!file) return;
    let reader=new FileReader();
    reader.onload=function(e){
        let img=new Image();
        img.src=e.target.result;
        img.onload=function(){
            let canvas=document.createElement("canvas");
            canvas.width=img.width; canvas.height=img.height;
            canvas.getContext("2d").drawImage(img,0,0);
            let link=document.createElement("a");
            link.download="converted.pdf";
            link.href=canvas.toDataURL();
            link.click();
        }
    };
    reader.readAsDataURL(file);
}

// ----------------------- IMAGE COMPRESSOR -----------------------
function compressImage(){
    let file=document.getElementById("compressImage")?.files[0];
    if(!file) return;
    let reader=new FileReader();
    reader.onload=function(e){
        let img=new Image();
        img.src=e.target.result;
        img.onload=function(){
            let canvas=document.createElement("canvas");
            canvas.width=img.width/2; canvas.height=img.height/2;
            canvas.getContext("2d").drawImage(img,0,0,canvas.width,canvas.height);
            let a=document.getElementById("downloadCompressed");
            a.href=canvas.toDataURL("image/jpeg",0.7);
            a.download="compressed.jpg";
            a.innerText="Download Image";
        }
    };
    reader.readAsDataURL(file);
}

// ----------------------- TEXT TO SPEECH -----------------------
function speak(){
    let text=document.getElementById("speechText")?.value;
    if(!text) return;
    let speech=new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
}

// ----------------------- ALTERNATE CASE -----------------------
function alternateCase(){
    let t=document.getElementById("altText")?.value;
    if(!t) return;
    let res="";
    for(let i=0;i<t.length;i++) res += i%2?t[i].toLowerCase():t[i].toUpperCase();
    document.getElementById("altResult").innerText=res;
}

// ----------------------- YOUTUBE THUMBNAIL -----------------------
function getThumbnail(){
    let url=document.getElementById("ytlink")?.value;
    if(!url) return;
    let id=url.includes("v=")?url.split("v=")[1]:url.split("/").pop();
    document.getElementById("thumbnailResult").src="https://img.youtube.com/vi/"+id+"/maxresdefault.jpg";
}

// ----------------------- META TAG GENERATOR -----------------------
function generateMeta(){
    let title=document.getElementById("metaTitle")?.value;
    let desc=document.getElementById("metaDesc")?.value;
    let keywords=document.getElementById("metaKeywords")?.value;
    document.getElementById("metaResult").value=`<title>${title}</title>\n<meta name="description" content="${desc}">\n<meta name="keywords" content="${keywords}">`;
        }
