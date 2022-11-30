// Generate the EXAMPLES file
import path from 'path';
import fs from 'fs';
import {fileURLToPath} from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const EXAMPLES_DIR = path.join(__dirname, '..', 'Examples');

const examples = fs.readdirSync(EXAMPLES_DIR).filter(filename => filename.endsWith('.xml'));
const exampleIndex = examples.map(filename => `${filename}\t${filename.replace(/\.xml$/, '')}`).join('\n');
fs.writeFileSync(path.join(EXAMPLES_DIR, 'EXAMPLES'), exampleIndex);
