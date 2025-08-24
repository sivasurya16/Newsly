import saveFile from "../services/dropboxService.js";

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const fileName = req.file.originalname;
    const buffer = req.file.buffer;

    const url = await saveFile(fileName, buffer);

    if (url) res.json({ url });
    else res.status(500).json({ msg: "Upload failed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
};


export default uploadFile;