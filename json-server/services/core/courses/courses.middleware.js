const express = require('express');
const router = express.Router();
const url = require('url');
const validateCourse = require('./courses.validator');
const _ = require('lodash');

module.exports = (server) => {
    function addCourse(course) {
        const state = _.cloneDeep(server.db.getState());

        const newId = Math.max(...state.courses.map(({id}) => id)) + 1;
        course.id = newId;
        state.courses.push(course);

        server.db.setState(state);
    }

    function addGroup(group) {
        // const state = _.cloneDeep(server.db.getState());

        // const newId = Math.max(...state.courses.map(({id}) => id)) + 1;
        // course.id = newId;
        state.groups.push(group);

        server.db.setState(state);
    }

    function getCourse(id) {
        const {courses} = server.db.getState();

        return courses.find((course) => course.id === id);
    }

    function getGroup(id) {
        const {groups} = server.db.getState();

        return groups.find((group) => group.id === id);
    }

    function editCourse(id, editedCourse) {
        const state = _.cloneDeep(server.db.getState());

        const foundCourseIx = state.courses.findIndex((course) => course.id === id);

        if (foundCourseIx === -1) {
            return false;
        }

        state.courses.splice(foundCourseIx, 1, editedCourse);

        server.db.setState(state);

        return true;
    }

    function removeCourse(id) {
        const state = _.cloneDeep(server.db.getState());

        const foundCourseIx = state.courses.findIndex((course) => course.id === id);

        if (foundCourseIx === -1) {
            return;
        }

        state.courses.splice(foundCourseIx, 1);

        server.db.setState(state);
    }

    function sendOk(res) {
        res.status(200);
        res.send('');
    }

    function sendBadRequest(res) {
        res.status(400);
        res.send('');
    }

    router.get('/groups/:id/courses', (req, res, next) => {
        const groupId = +req.params.id;

        let url_parts = url.parse(req.originalUrl, true),
            query = url_parts.query,
            from = query.start || 0,
            to = +query.start + +query.count,
            sort = query.sort,
            queryStr = query.query,
            courses = server.db.getState().courses;

        courses = courses.filter(course => course.groupId === groupId);

        if (!!query.textFragment) {
            courses = courses.filter((course) => course.title.concat(course.description).toUpperCase().indexOf(query.textFragment.toUpperCase()) >= 0);
        }

        if (courses.length < to || !to) {
            to = courses.length;
        }
        courses = courses.slice(from, to);

        res.json(courses);
    });

    router.get('/groups', (req, res, next) => {
        const {groups} = server.db.getState();

        res.json(groups);
    });

    router.get('/groups/:id', (req, res, next) => {
        const groupId = +req.params.id;

        const foundGroup = getGroup(groupId);

        if (!foundGroup) {
            sendBadRequest(res);
            return;
        }

        res.json(foundGroup);
    });

    router.post('/groups', (req, res, next) => {
        const group = req.body;

        // if (!validateCourse(course)) {
        //     sendBadRequest(res);
        //     return;
        // }

        addGroup(group);

        sendOk(res);
    });

    router.post('/courses', (req, res, next) => {
        const course = req.body;
        if (!validateCourse(course)) {
            sendBadRequest(res);
            return;
        }

        addCourse(course);

        sendOk(res);
    });

    router.get('/courses/:id', (req, res, next) => {
        const courseId = +req.params.id;

        if (isNaN(courseId)) {
            sendBadRequest(res);
            return;
        }

        const foundCourse = getCourse(courseId);

        if (!foundCourse) {
            sendBadRequest(res);
            return;
        }

        res.json(foundCourse);
    });

    router.put('/courses/:id', (req, res, next) => {
        const course = req.body;
        const courseId = +req.params.id;

        if (isNaN(courseId)) {
            sendBadRequest(res);
            return;
        }

        if (!validateCourse(course)) {
            sendBadRequest(res);
            return;
        }

        const isCourseSuccessfullyEdited = editCourse(courseId, course);
        if (!isCourseSuccessfullyEdited){ {
            sendBadRequest(res);
            return;
        }}

        sendOk(res);
    });

    router.delete('/courses/:id', (req, res, next) => {
        const courseId = +req.params.id;

        if (isNaN(courseId)) {
            sendBadRequest(res);
            return;
        }

        removeCourse(courseId);

        sendOk(res);
    });

    return router;
};


