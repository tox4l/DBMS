const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'src', 'data');

// Ensure data dir exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function parseModules() {
  const content = fs.readFileSync(path.join(ROOT_DIR, 'full course.md'), 'utf8');
  // Split by module
  const moduleSections = content.split(/^# MODULE /m);
  
  // The first item is curriculum map/intro
  const curriculumIntro = moduleSections[0];
  
  const modules = [];
  
  for (let i = 1; i < moduleSections.length; i++) {
    const section = moduleSections[i];
    const lines = section.split('\n');
    const titleLine = lines[0].trim();
    
    // Extract module number and title
    // Format: "1: DATABASE FOUNDATIONS" or similar
    const titleMatch = titleLine.match(/^(\d+):\s*(.*)/) || titleLine.match(/^(\d+)\s*(.*)/);
    
    let id = i;
    let title = titleLine;
    
    if (titleMatch) {
      id = parseInt(titleMatch[1]);
      title = titleMatch[2];
    }
    
    const moduleContent = lines.slice(1).join('\n').trim();
    
    modules.push({
      id: id,
      title: title,
      content: moduleContent
    });
  }
  
  fs.writeFileSync(path.join(DATA_DIR, 'modules.json'), JSON.stringify(modules, null, 2));
  console.log(`Parsed ${modules.length} modules.`);
}

function parseQuestions() {
  const content = fs.readFileSync(path.join(ROOT_DIR, 'question bank.txt'), 'utf8');
  
  const questions = [];
  
  // Simple regex to match Q1. Question text \n A) ... B) ... \n ANSWER: A
  // This handles MCQ. We also have short answer and queries.
  // A robust split is by "Q" followed by a number and a dot.
  
  const qBlocks = content.split(/\nQ\d+\.\s/);
  
  for (let i = 1; i < qBlocks.length; i++) {
    const block = qBlocks[i];
    const lines = block.split('\n').map(l => l.trim()).filter(l => l);
    
    const questionText = lines[0];
    let type = 'short_answer';
    const options = [];
    let answer = '';
    
    for (let j = 1; j < lines.length; j++) {
      const line = lines[j];
      if (line.match(/^[A-D]\)/)) {
        type = 'mcq';
        options.push(line);
      } else if (line.startsWith('ANSWER:')) {
        answer = line.replace('ANSWER:', '').trim();
        // The rest of the answer could be on next lines (for short answer)
        if (type === 'short_answer') {
          const explanation = lines.slice(j + 1).join('\n');
          answer += '\n' + explanation;
          break;
        }
      }
    }
    
    questions.push({
      id: i,
      text: questionText,
      type: type,
      options: options,
      answer: answer.trim()
    });
  }
  
  fs.writeFileSync(path.join(DATA_DIR, 'questions.json'), JSON.stringify(questions, null, 2));
  console.log(`Parsed ${questions.length} questions.`);
}

function copyTables() {
  // We will just copy tables.md over or we can parse it.
  // For now, copying to src/data as a JSON string to easily import, or just copy the file
  const content = fs.readFileSync(path.join(ROOT_DIR, 'full tables.md'), 'utf8');
  fs.writeFileSync(path.join(DATA_DIR, 'tables.json'), JSON.stringify({ content }, null, 2));
  console.log('Copied tables.');
}

function parseQueries() {
  const basic = fs.readFileSync(path.join(ROOT_DIR, 'basic queries.txt'), 'utf8');
  const advanced = fs.readFileSync(path.join(ROOT_DIR, 'advanced queries.txt'), 'utf8');
  
  fs.writeFileSync(path.join(DATA_DIR, 'queries.json'), JSON.stringify({
    basic,
    advanced
  }, null, 2));
  console.log('Copied queries.');
}

parseModules();
parseQuestions();
copyTables();
parseQueries();
