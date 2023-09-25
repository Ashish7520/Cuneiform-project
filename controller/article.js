const Article = require("../models/article");

exports.createArticle = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const slug = req.body.title.toLowerCase().split(" ").join("-");

  try {
    const article = await Article.create({
      title,
      description,
      category,
      slug,
    });
    res.status(201).json({ success: true, article });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getArticles = async (req, res) => {
  const search = req.query.q;
  const sortByDate = req.query.sortByDate === "true";

  try {
    let articles;

    if (search) {
      articles = await Article.find({
        $or: [
          { title: new RegExp(search, "i") },
          { category: new RegExp(search, "i") },
        ],
      });
    } else {
      articles = await Article.find();
    }

    if (sortByDate) {
      articles.sort((a, b) => b.createdAt - a.createdAt);
    }

    res.status(200).json({ success: true, articles });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.editArticle = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const slug = req.body.title.toLowerCase().split(" ").join("-");
  const articleId = req.params.id;

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      { title, description, category, slug },
      { new: true }
    );

    res.status(200).json({ success: true, updatedArticle });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteArticle = async (req, res) => {
  const articleId = req.params.id;

  try {
    await Article.findByIdAndDelete(articleId);
    res.status(200).json({ success: true, message: "Article deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
