const router = require("express").Router();
const { Post, Comment, User } = require("../models/");

// GET route for all posts
router.get("/", (req, res) => {
    Post.findAll({
        include: [
            User
        ],
    })
        .then((dbPostData) => {
            const posts = dbPostData.map((post) => post.get({ plain: true }));

            res.render("all-posts", { posts });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// GET route for a single post (by ID)
router.get("/post/:id", (req, res) => {
    Post.findByPk(req.params.id, {
        include: [
            User,
            {
                model: Comment,
                include: [
                    User
                ],
            },
        ],
    })
        .then((dbPostData) => {
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });

                res.render("single-post", { post });
            } else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// GET '/' show login page if not logged in and dashboard if logged in
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("login");
});

// GET '/signup' show signup page if not logged in and dashboard if logged in
router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("signup");
});

module.exports = router;