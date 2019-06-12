const express = require('express');
const router = express.Router();
const url = require('url');
const _ = require('lodash');

module.exports = (server) => {

	router.get('/users', (req, res, next) => {
		let users = server.db.getState().users;
		res.json(users);
	})

	router.post('/users', (req, res, next) => {
		const newUser = req.body;
		const state = _.cloneDeep(server.db.getState());
        state.users.push(newUser);

		server.db.setState(state);
		sendOk(res);
	})

	router.post('/login', (req, res, next) => {
		let users = server.db.getState().users,
			matchedUser = users.find((user) => {
				return user.login.toUpperCase() === req.body.login.toUpperCase();
			});

		if(!matchedUser) {
			res.status(401).send('Wrong username');
		} else if(matchedUser.password === req.body.password) {
			res.json({ token: matchedUser.id});
		} else {
			res.status(401).send("Wrong password");
		}
	});

	router.post('/auth/userinfo', (req, res, next) => {
		let users = server.db.getState().users,
			matchedUser = users.find((user) => {
				return user.id == req.header('Authorization');
			});

		if(!matchedUser) {
			res.status(401).send('Unauthorized');
		} else {
			res.json(matchedUser);
		}
	});

	function sendOk(res) {
        res.status(200);
        res.send('');
    }

	return router;
};
