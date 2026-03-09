
let generatedUsers = [];

async function generateIdentity(){

let country = document.getElementById("country").value;
let gender = document.getElementById("gender").value;
let ageType = document.getElementById("age").value;
let count = document.getElementById("count").value;

let url = "https://randomuser.me/api/?results=" + count;

if(country){
url += "&nat=" + country;
}

if(gender){
url += "&gender=" + gender;
}

let res = await fetch(url);
let data = await res.json();

generatedUsers = [];

let html = "";

data.results.forEach(user => {

let age = user.dob.age;

if(ageType==="young" && (age<18 || age>30)) return;
if(ageType==="adult" && (age<30 || age>50)) return;
if(ageType==="senior" && age<50) return;

let identity = {

name: user.name.first + " " + user.name.last,
gender: user.gender,
age: age,
email: user.email,
phone: user.phone,
location:
user.location.street.number + " " +
user.location.street.name + ", " +
user.location.city + ", " +
user.location.country

};

generatedUsers.push(identity);

html += `
<div class="identityCard">

<img src="${user.picture.large}">

<p><b>Name:</b> ${identity.name}</p>

<p><b>Gender:</b> ${identity.gender}</p>

<p><b>Age:</b> ${identity.age}</p>

<p><b>Email:</b> ${identity.email}
<button onclick="copyText('${identity.email}')">Copy</button>
</p>

<p><b>Phone:</b> ${identity.phone}
<button onclick="copyText('${identity.phone}')">Copy</button>
</p>

<p><b>Location:</b> ${identity.location}</p>

</div>
`;

});

document.getElementById("results").innerHTML = html;

}

function copyText(text){

navigator.clipboard.writeText(text);

alert("Copied!");

}

function downloadJSON(){

let data = JSON.stringify(generatedUsers,null,2);

let blob = new Blob([data],{type:"application/json"});

let url = URL.createObjectURL(blob);

let a = document.createElement("a");

a.href = url;
a.download = "identities.json";

a.click();

}
