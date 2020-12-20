const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Image = require('./Image');

Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'postId',
});

Comment.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Post.hasOne (Image, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
})


module.exports = {
    User,
    Comment,
    Post,
    Image
};