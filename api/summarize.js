export default async function handler(req, res) {

const { text } = req.body;

const apiKey = "AIzaSyA9m8az9N6e657qSEjbyp-08BakDqF4zNA";

try {

const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
contents: [
{
parts: [
{
text: `Summarize these university study notes clearly and shortly:\n\n${text}`
}
]
}
]
})
}
);

const data = await response.json();

const summary =
data?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated.";

res.status(200).json({ summary });

} catch (error) {

res.status(500).json({ error: "AI summarization failed" });

}

}
