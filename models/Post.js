// requirements
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// declare that Post inherits from the sequlize Model object
class Post extends Model { }

// define structure of Post
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10]
            }
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize
    }
);


module.exports = Post;