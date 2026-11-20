const mongoose = require('mongoose');
const User = require('../models/user');
const Model = mongoose.model('users');

// GET: /users - lists all the users
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const usersList = async(req, res) => {

    const q = await Model
        .find({}) // no filter - return all records
        .exec();

        // Uncomment the following line to show the results of the query
        // on the console
        // console.log(q);

    if(!q)
    { // Database returned no data
        return res
            .status(404)
            .json(err);
    } else { // Return resulting user list
        return res
            .status(200)
            .json(q);
    }

};

// GET: /users/:userId - lists a single user
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const usersFindByName = async(req, res) => {

    const q = await Model
        .find({ 'userName' : req.params.userName }) // return single record
        .exec();

        // Uncomment the following line to show the results of the query
        // on the console
        // console.log(q);

    if(!q)
    { // Database returned no data
        return res
            .status(404)
            .json(err);
    } else { // Return resulting user list
        return res
            .status(200)
            .json(q);
    }

};

// POST: /users - adds a new user
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client

const usersAddUser = async(req, res) => {
    const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
    });

    newUser.setPassword(req.body.password);

    const q = await newUser.save();

    if(!q)
    { // Database returned no data
        return res
            .status(400)
            .json({ message: 'Failed to add trip' });
    } else { // Return resulting trip
        return res
            .status(201)
            .json(q);
    }
};

// PUT: /users/:userId - updates a user
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client

const usersUpdateUser = async(req, res) => {
    const q = await Model
        .findOneAndUpdate(
            { '_id' : req.params.userId }, // filter
            { // update
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            },
        )
        .exec();

        // Uncomment the following line to show the results of the query
        // on the console
        // console.log(q);

    if(!q)
    { // Database returned no data
        return res
            .status(404)
            .json(err);
    } else { // Return resulting user list
        return res
            .status(200)
            .json(q);
    }

};

const usersDeleteUser = async(req, res) => {
    const q = await Model
        .findOneAndDelete(
            { 'userName' : req.params.userName }, // filter
        )
        .exec();

        // Uncomment the following line to show the results of the query
        // on the console
        // console.log(q);

    if(!q)
    { // Database returned no data
        return res
            .status(404)
            .json(err);
    } else { // Return resulting user list
        return res
            .status(200)
            .json(q);
    }

};

module.exports = {
    usersList,
    usersFindByName,
    usersAddUser,
    usersUpdateUser,
    usersDeleteUser
};
