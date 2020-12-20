const router = require("express").Router();
const { Post, Image, User } = require("../models/");
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
    Post.findByPk(req.params.id, {
        include: [
            Image            
        ]
            
    })
        .then(dbPostData => {
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });
                const imageData = post.Image.data;
                console.log(imageData);
                post.imageURL = 'data:image/jpg;base64,' + Buffer.from(imageData, 'binary').toString('base64')

                res.render("edit-post", {
                    layout: "dashboard",
                    post
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