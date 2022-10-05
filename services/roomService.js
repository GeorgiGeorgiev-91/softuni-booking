const Room = require('../models/Room')

function getAll(search, city, fromPrice, toPrice) {
    return Room.find({}).lean();
}

function getById(id) {
    return Room.findById(id).populate('facilities', 'label iconUrl').lean();
}

async function create(roomData) {
    const room = {
        name: roomData.name,
        description: roomData.description,
        city: roomData.city,
        beds: Number(roomData.beds),
        price: Number(roomData.price),
        imgURL: roomData.imgURL
    }

    const missing = Object.entries(room).filter(([k, v]) => !v);
    if (missing.length > 0) {
        throw new Error(missing.map(m => `${m[0]} is required`).join('\n'));
    }

    const result = await Room.create(room);

    return result;
}
/*

function getId() {
    return ('000000' + (Math.random() * 999999 | 0).toString(16)).slice(-6);
}

*/

module.exports = {
    getAll,
    getById,
    create
};