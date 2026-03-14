export default async function handler(req, res) {

  const { text } = req.body;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyA9m8az9N6e657qSEjbyp-08BakDqF4zNA",
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
                text: `Summarize these notes for a student:\n\n${text}`
              }
            ]
          }
        ]
      })
    }
  );

  const data = await response.json();

  res.status(200).json(data);
}
