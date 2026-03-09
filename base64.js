function encodeBase(){

let text=document.getElementById("baseInput").value;

document.getElementById("baseOutput").value=btoa(text);

}

function decodeBase(){

let text=document.getElementById("baseInput").value;

document.getElementById("baseOutput").value=atob(text);

}