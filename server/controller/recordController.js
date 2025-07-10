import News from '../models/News.js'
import mongoose from 'mongoose';

const getAllNews = async (req, res) => {
  try {
    let result = await News.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching news" });
  }
}

const getNewsById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ msg: "Invalid Id" });

  const result = await News.findById(id);
  res.status(200).json(result);
}

const createNews = async (req, res) => {
  try {
    const news = new News({
      "section": req.body.section,
      "tags": req.body.tags,
      "createdDate": req.body.createdDate,
      "itemTitle": req.body.itemTitle,
      "itemText": req.body.itemText,
      "submitter": req.user.email,
      "updates": req.body.updates,
      "published": req.body.published,
      "publishedDate": req.body.publishedDate,
      "email": req.body.email
    });
    news.save();
  } catch (err) {
    res.status(500).json({ msg: "Error adding record" });

  }
}

const editNews = async (req, res) => {
  try {
    await News.findByIdAndUpdate(id, {
      $set: {
        itemTitle: req.body.itemTitle,
        itemText: req.body.itemText
      },
      $push: {
        updates: new Date()
      }
    }, { new: true }
    );
  } catch (err) {
    res.status(500).send("Error updating record");
  }

}

const deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(id);
  } catch (err) {
    res.status(500).send("Error deleting record");
  }
}

const recordController = {
  getAllNews,
  getNewsById,
  createNews,
  editNews,
  deleteNews
};

export default recordController;