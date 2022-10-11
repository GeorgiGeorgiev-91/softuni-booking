const { hasRole } = require('../middlewares/guards');
const { createFacility, getAllFacilities, addFacilities } = require('../services/facilityService');
const { getById } = require('../services/roomService');

const facilityController = require('express').Router();

facilityController.get('/create', hasRole('admin'), async(req, res) => {
    res.render('createFacility', {
        title: 'Create New Facility'
    });
});

facilityController.post('/create', async(req, res) => {
    console.log(req.body);

    try {
        await createFacility(req.body.label, req.body.iconUrl);
        res.redirect('/catalog');
    } catch (err) {
        // TODO render errors
        res.render('createFacility', {
            title: 'Create New Facility'
        });
    }
});

facilityController.get('/:roomId/decorateRoom', async(req, res) => {
    const roomId = req.params.roomId;
    const room = await getById(roomId);

    if (!req.user || req.user._id != room.owner) {
        return res.redirect('/auth/login');
    }

    const facilities = await getAllFacilities();
    facilities.forEach(f => {
        if ((room.facilities || []).some(facility => facility._id.toString() == f._id.toString())) {
            f.checked = true;
        }
    })

    res.render('decorate', {
        title: 'Add Facility',
        room,
        facilities
    })
});

facilityController.post('/:roomId/decorateRoom', async(req, res) => {
    // console.log(req.body);
    await addFacilities(req.params.roomId, Object.keys(req.body));
    res.redirect('/facility/' + req.params.roomId + '/decorateRoom');
});

module.exports = facilityController;