const fs = require('fs');
const jimp = require('jimp');
const path = require('path');

async function resizeImages() {
  const directory = 'C:/Users/Dell/Pictures/10-handicrafts/';
  const destination = 'D:/sna3ti/PORJECT-SNA3TI-BACKEND-Revised-Version/public/uploads/profileImage/';
  // Read the directory
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error("Could not read the directory. Error:", err);
      return;
    }

    // Iterate over each file
    files.forEach(async (file, index) => {
      // Ensure the file is an image
      if (['.jpeg', '.jpg', '.png'].includes(path.extname(file).toLowerCase())) {
        try {
          // copy the file to a variable to be used later
          const image = await jimp.read(directory + file);
          
          // Resize the image
          image.resize(250, jimp.AUTO);

          // Write the image back to the file
          // await image.writeAsync(directory + file);
          // console.log("Successfully resized image and add it:", file.name);
          // make new file with new name and add it to the destination folder
          await image.writeAsync(destination + '168503491450' + index + '.png');
          console.log("Successfully resized image and add it:", index + '.jpg');
        } catch (err) {
          console.error("Error processing file:", file, "Error:", err);
        }
      }
    });
  });
}

resizeImages();
