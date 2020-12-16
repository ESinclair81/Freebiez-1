// require express router
const router = require("express").Router();

// require multer
const multer = require("multer");
const upload = multer({
    destination: 'post_images/'
});

// require fs
const fs = require("fs");

// require models
const { Post, Comment, User } = require("../../models/");

// require withAuth function
const withAuth = require("../../utils/auth");

// POST '/' create Post
router.post("/", withAuth, upload.single('file'), function (req, res) {
    console.log(req);
    const data = fs.readFileSync(req.file.path);
    Image.create({
        post_image: data
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