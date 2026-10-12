export function clamp(value,min,max){return Math.max(min,Math.min(max,value))}
export function makeFormation(rows=3,columns=7){const enemies=[];for(let row=0;row<rows;row++)for(let col=0;col<columns;col++)enemies.push({x:90+col*82,y:70+row*54,row,alive:true,points:(rows-row)*10});return enemies}
export function hitTest(a,b){return a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y}
export function nextScore(current,points){return Math.max(0,current)+Math.max(0,points)}
export function isGameOver(lives){return lives<=0}
