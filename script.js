// Show Tool
function showTool(id){
    document.querySelectorAll(".toolPage").forEach(p=>p.style.display="none");
    let el=document.getElementById(id);
    if(el) el.style.display="block";
}
window.onload=function(){ showTool("home"); }

// Dark Mode
function toggleDark(){ document.body.classList.toggle("dark"); }

// Sidebar Search
document.getElementById("toolSearch").addEventListener("keyup",function(){
    let filter=this.value.toLowerCase();
    document.querySelectorAll(".sidebar li:not(.categoryTitle)").forEach(t=>{
        t.style.display=t.textContent.toLowerCase().includes(filter)?"block":"none";
    });
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

// 3. Random Number Generator
function randomNumber(){let min=parseInt(document.getElementById("min")?.value||0),max=parseInt(document.getElementById("max")?.value||100),r=Math.floor(Math.random()*(max-min+1))+min;document.getElementById("randomResult")?.innerText=r;}

// 4. Color Generator
function generateColor(){let c="#"+Math.floor(Math.random()*16777215).toString(16);document.getElementById("colorBox")?.style.background=c;document.getElementById("colorCode")?.innerText=c;}

// More tools functions like translator, hashtag, QR, identity generator, etc.
// You can copy all your previous JS functions here, updating each element ID if necessary
