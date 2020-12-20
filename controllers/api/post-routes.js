// require express router
const router = require("express").Router();

// require multer uploader
const uploader = require("../../utils/upload");

// require fs
const fs = require("fs");

// require models
const { Post, Comment, User, Image } = require("../../models/");

// require withAuth function
const withAuth = require("../../utils/auth");

// POST '/' create Post
router.post("/", withAuth, uploader.single('file'), function (req, res) {
    const body = req.body;
    console.log(req.body);

    Post.create({ ...body, userId: req.session.userId })
        .then(newPost => {
            res.json(newPost);
            Image.create({
                data: fs.readFileSync("post_images/" + req.file.filename),
                name: req.file.originalname,
                type: req.file.mimetype,
                postId: newPost.id
            })
            .then(storedImage => {
                fs.unlinkSync(`post_images/${req.file.filename}`)
            })
        })
        .catch(err => {
            res.status(500).json(err);
        })
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