const express = require("express");
const router = express.Router();
const articleController = require("../controller/article");

router.post("/", articleController.createArticle);
router.get("/", articleController.getArticles);
router.put("/:id", articleController.editArticle);
router.delete("/:id", articleController.deleteArticle);

module.exports = router;
