const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", { useNewUrlParser: true });

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

app.listen(3000, (req, res) => {
  console.log("Server starting 3000");
});

app
  .route("/articles")

  .get((req, res) => {
    Article.find()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => console.log(err));
  })

  .post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    const newArticle = new Article({
      title: title,
      content: content,
    });

    newArticle
      .save()
      .then(() => {
        console.log("Successfuly added new Article");
      })
      .catch((err) => console.log(err));

    res.redirect("/articles");
  })

  .delete((req, res) => {
    Article.deleteMany({})
      .then((result) => {
        console.log("Successfuly deleted all articles");
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });

app
  .route("/articles/:articleTitle")

  .get((req, res) => {
    const query = req.params.articleTitle;
    Article.findOne({ title: query })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send("No articles matching that title found .");
      });
  })

  .put((req, res) => {
    const query = req.params.articleTitle;
    const title = req.body.title;
    const content = req.body.content;

    Article.findOneAndReplace({ title: query }, { title, content })
      .then((result) => {
        if (!result) {
          res.send("Nothing found to update");
        } else {
          res.send("updated succesfully");
        }
      })
      .catch((err) => {
        res.send("No update beacuse some error");
      });
  })

  .patch((req, res) => {
    const query = req.params.articleTitle;
    const title = req.body.title;
    const content = req.body.content;

    Article.findOneAndUpdate({ title: query }, { $set: req.body })
      .then(() => {
        res.send("Succesfully update the article patch");
      })

      .then((result) => {
        if (!result) {
          res.send("Nothing found to update");
        } else {
          res.send("updated succesfully");
        }
      })
      .catch((err) => {
        res.send("No update beacuse some error");
      });
  })

  .delete((req, res) => {
    const query = req.params.articleTitle;

    Article.findOneAndDelete({ title: query })
      .then((result) => {
        if (result) {
          res.send("item Deleted successfully");
        } else {
          res.send("There is no such item to delete");
        }
      })

      .catch((err) => {
        res.send("There is some error " + err);
      });
  });
