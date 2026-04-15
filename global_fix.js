const fs = require('fs');
const path = require('path');

const replacements = {
  'Ã¡': 'á',
  'Ã¢': 'â',
  'Ã£': 'ã',
  'Ã§': 'ç',
  'Ã©': 'é',
  'Ãª': 'ê',
  'Ã­': 'í',
  'Ã³': 'ó',
  'Ã´': 'ô',
  'Ãµ': 'õ',
  'Ãº': 'ú',
  'Ã ': 'À',
  'Ã‚': 'Â',
  'Ã‡': 'Ç',
  'Ã‰': 'É',
  'ÃŠ': 'Ê',
  'Ã”': 'Ô',
  'Ãš': 'Ú',
  'Â—': '—',
  'COSTUMES (Progresso)': 'LIBERDADES CIVIS'
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const [bad, good] of Object.entries(replacements)) {
    content = content.split(bad).join(good);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed', filePath);
  }
}

function traverseDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

traverseDir('src');
console.log('Varredura completa!');
