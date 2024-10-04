const { v4: uuidV4 } = require('uuid');

exports.createRoom = (req, res) => {
    const roomId = uuidV4();
    res.redirect(`/${roomId}`);
};

exports.renderRoom = (req, res) => {
    const roomId = req.params.room;
    res.render('room', { roomId });
};


exports.renderHome = (req, res) => {
    res.render('home');
};
