const fs = require('fs');

const data = JSON.parse(fs.readFileSync('figma_data.json', 'utf8'));

const matches = [];
function findNode(node, name) {
  if (node.name && node.name.toLowerCase().includes(name.toLowerCase())) {
    matches.push(node);
  }
  if (node.children) {
    for (const child of node.children) {
      findNode(child, name);
    }
  }
}

findNode(data.document, 'Hero');
if (matches.length > 0) {
  matches.forEach(m => {
    console.log('Found match:', m.name, 'ID:', m.id, 'Type:', m.type);
    if (m.type === 'FRAME' || m.type === 'RECTANGLE' || m.type === 'IMAGE') {
      console.log('Bounds:', m.absoluteBoundingBox || m.absoluteRenderBounds);
    }
    
    // Check if it has an image fill
    const imgFill = m.fills?.find(f => f.type === 'IMAGE');
    if (imgFill) {
      console.log('  Image Ref:', imgFill.imageRef);
    }
    
    // Check children for image fills
    if (m.children) {
      m.children.forEach(c => {
        const cImgFill = c.fills?.find(f => f.type === 'IMAGE');
        if (cImgFill) {
          console.log(`  Child ${c.name} (${c.id}) has Image Ref:`, cImgFill.imageRef);
        }
      });
    }
  });
} else {
  console.log('Hero node not found.');
}
