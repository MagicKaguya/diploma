// REWRITE EXAMPLE
const express = require('express');
const jsonServer = require('json-server');
const router = express.Router();

router.use(jsonServer.rewriter({
	'/groups': '/groups',
	'/groups/:id/courses': '/groups/:id/courses',
	'/groups/:id/courses/:id': '/groups/:id/courses/:id',
	'/groups/:id/courses/:identifier/:pairNumber': '/groups/:id/courses/:identifier/:pairNumber'
}));

module.exports = router;
