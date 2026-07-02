const fs = require('fs');

async function fetchFigma() {
  const token = 'figd_E1Jo2e6SEbqHWQ1yB6ChPgPEyE3IKycCkVQKuXG3';
  const fileKey = 'Efzv4hw5nkLIyxq5mDT2J0';
  
  const url = `https://api.figma.com/v1/files/${fileKey}`;
  
  try {
    const res = await fetch(url, {
      headers: {
        'X-Figma-Token': token
      }
    });
    
    if (!res.ok) {
      console.error(`Error fetching Figma data: ${res.status} ${res.statusText}`);
      const text = await res.text();
      console.error(text);
      process.exit(1);
    }
    
    const data = await res.json();
    fs.writeFileSync('figma_data.json', JSON.stringify(data, null, 2));
    console.log('Successfully saved figma_data.json');
  } catch (err) {
    console.error('Error:', err);
  }
}

fetchFigma();
