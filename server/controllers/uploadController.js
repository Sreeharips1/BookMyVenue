const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: "bookmyvenue",
    });

    res.status(200).json({
      imageUrl: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No files uploaded",
      });
    }

    const uploadedImages = [];

    for (const file of req.files) {
      const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

      const result = await cloudinary.uploader.upload(base64, {
        folder: "bookmyvenue",
      });

      uploadedImages.push(result.secure_url);
    }

    res.status(200).json({
      images: uploadedImages,
    });
  } catch (error) {
    console.log(error.message);
    console.log(error.errors);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadImage,
  uploadImages,
};
