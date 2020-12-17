const router = require("express").Router();
const { Post, Image } = require("../models/");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
    Post.findAll({
        where: {
            userId: req.session.userId
        }
    })
        .then(dbPostData => {
            const posts = dbPostData.map((post) => post.get({ plain: true }));

            res.render("all-posts-admin", {
                layout: "dashboard",
                posts
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect("login");
        });
});

router.get("/new", withAuth, (req, res) => {
    res.render("new-post", {
        layout: "dashboard"
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
    Post.findByPk(req.params.id, { include: [Image] })
        .then(dbPostData => {
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });
                const image = 'data:image/png;base64,' + new Buffer(res.data.data.image, 'binary').toString('base64')
                console.log(image);
                res.render("edit-post", {
                    layout: "dashboard",
                    post,
                    image
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;