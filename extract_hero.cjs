const fs = require('fs');
const data = JSON.parse(fs.readFileSync('figma_data.json', 'utf8'));

let heroFrame = null;
function findHero(node) {
  if (node.id === '1:19') {
    heroFrame = node;
    return;
  }
  if (node.children) node.children.forEach(findHero);
}
findHero(data.document);

if (!heroFrame) {
  console.log("Hero frame 4:2 not found");
  process.exit(1);
}

const frameX = heroFrame.absoluteBoundingBox?.x || 0;
const frameY = heroFrame.absoluteBoundingBox?.y || 0;

function printNodeInfo(node, depth = 0) {
  const indent = '  '.repeat(depth);
  const bbox = node.absoluteBoundingBox || node.absoluteRenderBounds;
  let relX = bbox ? bbox.x - frameX : null;
  let relY = bbox ? bbox.y - frameY : null;
  
  let info = `${indent}- [${node.type}] ${node.name} (id: ${node.id})`;
  if (bbox) info += ` | pos: {x: ${Math.round(relX)}, y: ${Math.round(relY)}, w: ${Math.round(bbox.width)}, h: ${Math.round(bbox.height)}}`;
  
  if (node.type === 'TEXT') {
    info += ` | text: "${node.characters}" | font: ${node.style?.fontSize}px ${node.style?.fontWeight} ${node.style?.fontFamily}`;
    if (node.fills && node.fills.length > 0 && node.fills[0].color) {
      const c = node.fills[0].color;
      info += ` | color: rgba(${Math.round(c.r*255)},${Math.round(c.g*255)},${Math.round(c.b*255)},${c.a})`;
    }
  }
  
  if (node.type === 'RECTANGLE' && node.cornerRadius) {
    info += ` | radius: ${node.cornerRadius}`;
  }
  if (node.fills && node.fills.some(f => f.type.includes('GRADIENT'))) {
    info += ` | GRADIENT FILL`;
  }
  
  console.log(info);
  
  if (node.children) {
    node.children.forEach(c => printNodeInfo(c, depth + 1));
  }
}

console.log(`Hero Frame size: ${heroFrame.absoluteBoundingBox.width} x ${heroFrame.absoluteBoundingBox.height}`);
printNodeInfo(heroFrame);
