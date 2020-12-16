// require express router
const router = require("express").Router();

// require multer uploader
const uploader = require("../../utils/upload");

// // require multer
// const multer = require("multer");
// const upload = multer({
//     storage: uploader.storage,
//     // dest: '../public/post_images/'
// });

// require fs
const fs = require("fs");

// require models
const { Post, Comment, User, Image } = require("../../models/");

// require withAuth function
const withAuth = require("../../utils/auth");

// POST '/' create Post
router.post("/", withAuth, uploader.single('post-image'), function (req, res) {
    console.log(req);
    // const data = fs.readFileSync("post_images/" + req.file.filename);
    Image.create({
        data: fs.readFileSync("post_images/" + req.file.filename)
    })
        .then(image => {
            res.json({ success: true, file1: req.file, data: image, update: false });
        })
        .then(() => {
            const body = req.body;

            Post.create({ ...body, userId: req.session.userId })
                .then(newPost => {
                    res.json(newPost);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        });
});

// PUT '/:id' update Post by ID
router.put("/:id", withAuth, (req, res) => {
    Post.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(affectedRows => {
            if (affectedRows > 0) {
                res.status(200).end();
            } else {
                res.status(500).json(err);
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// DELETE '/:id' delete Post by ID
router.delete("/:id", withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(affectedRows => {
            if (affectedRows > 0) {
                res.status(200).end();
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;