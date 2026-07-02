const fs = require('fs');
const https = require('https');

async function fetchImage() {
  const token = 'figd_E1Jo2e6SEbqHWQ1yB6ChPgPEyE3IKycCkVQKuXG3';
  const fileKey = 'OIvCLV8jnxsnZPhJrFNk8q';
  const nodeId = '153:10'; // The ID of the background image rectangle
  
  const url = `https://api.figma.com/v1/images/${fileKey}?ids=${nodeId}&format=png&scale=1`;
  
  try {
    const res = await fetch(url, {
      headers: {
        'X-Figma-Token': token
      }
    });
    
    if (!res.ok) {
      console.error(`Error fetching image URL: ${res.status} ${res.statusText}`);
      process.exit(1);
    }
    
    const data = await res.json();
    const imageUrl = data.images[nodeId];
    
    if (!imageUrl) {
      console.error('Image URL not found in response');
      process.exit(1);
    }
    
    console.log('Downloading image from:', imageUrl);
    
    // Download the image using https
    https.get(imageUrl, (response) => {
      // make sure src/assets exists
      if (!fs.existsSync('src/assets')){
          fs.mkdirSync('src/assets', { recursive: true });
      }
      
      const file = fs.createWriteStream('src/assets/hero-bg.png');
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log('Image successfully downloaded to src/assets/hero-bg.png');
      });
    }).on('error', (err) => {
      fs.unlink('src/assets/hero-bg.png', () => {});
      console.error('Error downloading image:', err);
    });

  } catch (err) {
    console.error('Error:', err);
  }
}

fetchImage();
