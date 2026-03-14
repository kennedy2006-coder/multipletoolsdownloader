export default async function handler(req, res) {

const { text } = req.body;

const apiKey = "AIzaSyA9m8az9N6e657qSEjbyp-08BakDqF4zNA";

try{

const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[
{
text:`Summarize these study notes clearly for a university student:\n${text}`
}
]
}
]
})
}
);

const data = await response.json();

res.status(200).json(data);

}catch(error){

res.status(500).json({error:"AI summarization failed"});

}

}
