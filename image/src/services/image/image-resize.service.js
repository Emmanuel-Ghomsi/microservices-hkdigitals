const sharp = require("sharp");

const imageUpload = async (req) => {
  const formattedFileName = req.file.originalname.split(" ").join("-"); //replace space with -
  try {
    await sharp(req.file.buffer)
      .resize({ with: 800, height: 600 }) //max width = 800 or height = 600
      .toFile("./uploads/" + formattedFileName); //upload to /upload folder

    return "./uploads/" + formattedFileName;
  } catch (error) {
    console.log(error);
  }
};

module.exports = imageUpload;
