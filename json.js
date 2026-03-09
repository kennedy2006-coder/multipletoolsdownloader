function formatJSON(){

let input=document.getElementById("jsonInput").value;

try{

let obj=JSON.parse(input);

document.getElementById("jsonOutput").value=
JSON.stringify(obj,null,4);

}

catch{

alert("Invalid JSON");

}

}