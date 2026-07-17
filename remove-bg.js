const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');
const path = require('path');

async function main() {
  console.log("Starting background removal...");
  try {
    const inputPath = path.resolve('assets/logo.jpeg');
    const outputPath = path.resolve('assets/logo.png');

    console.log("Reading image:", inputPath);
    const buffer = fs.readFileSync(inputPath);

    // Create a Blob from buffer as required by the library
    const blob = new Blob([buffer], { type: 'image/jpeg' });

    console.log("Removing background (this may take a minute to download the model)...");
    const blobOutput = await removeBackground(blob);

    console.log("Saving image to:", outputPath);
    const arrayBuffer = await blobOutput.arrayBuffer();
    fs.writeFileSync(outputPath, Buffer.from(arrayBuffer));

    console.log("Success! Saved as logo.png");
  } catch (error) {
    console.error("Failed:", error);
  }
}
main();
