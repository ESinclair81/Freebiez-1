// require express router
const router = require("express").Router();

// require Comment model
const { Comment } = require("../../models/");

// require withAuth function
const withAuth = require("../../utils/auth");

// POST '/' create a Comment
router.post("/", withAuth, (req, res) => {
    Comment.create({ ...req.body, userId: req.session.userId })
        .then(newComment => {
            res.json(newComment);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;