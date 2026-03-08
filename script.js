function downloadVideo(){

let url = document.getElementById("videoUrl").value;

if(url === ""){
document.getElementById("result").innerText = "Please paste a link";
return;
}

document.getElementById("result").innerText =
"Processing download for: " + url;

}
