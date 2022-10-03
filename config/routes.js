const homeController = require('../controllers/homeController');
const catalogController = require('../controllers/catalogController');
const defaultController = require('../controllers/defaultController');
const createController = require('../controllers/createController');

module.exports = (app) => {
    app.use(homeController);
    app.use('/catalog', catalogController);
    app.use('/create', createController);
    //TODO attach other controllers


    app.all('*', defaultController);
}