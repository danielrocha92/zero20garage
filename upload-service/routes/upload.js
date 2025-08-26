const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const router = express.Router();

// Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer em memória
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint de upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    const imageData = req.body.imageData;

    let uploadResult;

    if (file) {
      // Upload de arquivo
      const b64 = Buffer.from(file.buffer).toString('base64');
      const dataURI = `data:${file.mimetype};base64,${b64}`;
      uploadResult = await cloudinary.uploader.upload(dataURI, {
        folder: 'zero20garage',
      });
    } else if (imageData) {
      // Upload de base64 (ex. câmera mobile)
      uploadResult = await cloudinary.uploader.upload(imageData, {
        folder: 'zero20garage',
      });
    } else {
      return res.status(400).json({ error: 'Nenhuma imagem enviada.' });
    }

    res.status(200).json({ url: uploadResult.secure_url });
  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({ error: 'Erro ao fazer upload da imagem.' });
  }
});

module.exports = router;
