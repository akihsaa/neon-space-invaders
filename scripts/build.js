import {cp,mkdir,rm,access} from 'node:fs/promises';import {constants} from 'node:fs';import path from 'node:path';
const root=process.cwd(),out=path.join(root,'dist'),required=['index.html','style.css','game.js','game-logic.js'];
for(const f of required)await access(path.join(root,f),constants.R_OK);
await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});
for(const f of required)await cp(path.join(root,f),path.join(out,f));
console.log(`Build successful: ${required.length} files copied to dist/`);
