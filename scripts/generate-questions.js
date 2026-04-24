const fs = require('fs');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const ROOT_DIR = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'src', 'data');

async function generateQuestions() {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("⚠️ GEMINI_API_KEY is not set. Skipping AI question generation.");
    console.warn("To run this, set the environment variable and run: node scripts/generate-questions.js");
    
    // Create a dummy generated questions file so the app doesn't break
    fs.writeFileSync(
      path.join(DATA_DIR, 'generated-questions.json'), 
      JSON.stringify([], null, 2)
    );
    return;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const modules = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'modules.json'), 'utf8'));
  const generatedQuestions = [];
  let globalId = 200; // start IDs from 200 to not clash with original 150

  for (const mod of modules) {
    console.log(`Generating questions for Module ${mod.id}: ${mod.title}...`);
    
    const prompt = `
You are an expert university professor teaching Database Management Systems.
Based ONLY on the following course module content, generate exactly 30 original, exam-realistic questions.
Do NOT duplicate standard textbook questions; make them scenario-based where possible. Include common misconception traps.

Requirements for the 30 questions:
- 10 Multiple choice (4 options, 1 correct, plausible distractors)
- 5 True/False with detailed explanation for both outcomes
- 5 Fill in the blank targeting key definitions and syntax
- 5 Short answer targeting conceptual understanding
- 5 Scenario-based questions ("Given this schema, what happens when...")

Output EXACTLY as a JSON array of objects with this schema:
[
  {
    "id": number,
    "moduleId": ${mod.id},
    "type": "mcq" | "tf" | "fill_blank" | "short_answer" | "scenario",
    "difficulty": "Easy" | "Medium" | "Hard",
    "examLikelihood": "Low" | "Medium" | "High" | "CRITICAL",
    "text": "The question text",
    "options": ["A) ...", "B) ..."] (only for mcq),
    "answer": "The correct answer and detailed explanation of WHY it's correct"
  }
]

Module Content:
${mod.content}
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      const qs = JSON.parse(response.text);
      
      // Fix IDs
      for (const q of qs) {
        q.id = globalId++;
        q.isGenerated = true;
        generatedQuestions.push(q);
      }
      
      console.log(`✅ Generated ${qs.length} questions for Module ${mod.id}`);
      
    } catch (e) {
      console.error(`❌ Failed to generate for Module ${mod.id}:`, e);
    }
  }

  fs.writeFileSync(
    path.join(DATA_DIR, 'generated-questions.json'), 
    JSON.stringify(generatedQuestions, null, 2)
  );
  console.log(`\n🎉 Successfully generated ${generatedQuestions.length} total questions.`);
}

generateQuestions();
