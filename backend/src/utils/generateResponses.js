const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateResponses(
  input,
  category,
  emotionalRoot
) {
  const prompt = `
You are an elite B2B sales coach.

Objection:
"${input}"

Category:
${category}

Emotional Root:
${emotionalRoot}

Generate EXACTLY 3 responses in JSON format:

[
  {
    "style":"empathetic",
    "response":"..."
  },
  {
    "style":"logical",
    "response":"..."
  },
  {
    "style":"assertive",
    "response":"..."
  }
]

Return ONLY valid JSON.
`;

  const completion =
    await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

  return JSON.parse(
    completion.choices[0].message.content
  );
}

module.exports = generateResponses;