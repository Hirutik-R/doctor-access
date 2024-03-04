const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

module.exports = function (upload) {
    // Root Route
    /**
    *  @description Root Route
    *  @method GET /
    */
    route.get('/', services.homeRoutes);

    // Add users
    /**
    *  @description add users
    *  @method GET /add-user
    */
    route.get('/add-user', services.add_user);

    // Update user
    /**
    *  @description for update user
    *  @method GET /update-user
    */
    route.get('/update-user', services.update_user);

    // API routes
    route.post('/api/users', upload.fields([{ name: 'imagei', maxCount: 1 }, { name: 'imageo', maxCount: 1 }]), controller.create);
    route.get('/api/users', controller.find);
    route.put('/api/users/:id', controller.update);
    route.delete('/api/users/:id', controller.delete);

    return route;
};




