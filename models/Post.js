// requirements
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// declare that Post inherits from the sequlize Model object
class Post extends Model {}

// define structure of Post
Post.init(
    {
        title: {
            type: DataTypes.STRING
        },
        body: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize
    }
);


module.exports = Post;