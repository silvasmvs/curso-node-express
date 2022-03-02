const CallModel = require('../models/Call');

module.exports = app => {
    app.get('/calls', (req, res) => {
        CallModel.get(res);
    });

    app.get('/calls/:id', (req, res) => {
        const id = Number(req.params.id);

        CallModel.getById(id, res);
    })

    app.post('/calls', (req, res) => {
        const call = req.body;
        
        CallModel.create(call, res);
    })

    app.patch('/calls/:id', (req, res) => {
        const id = Number(req.params.id);
        CallModel.update(id, req.body, res);
    })

    app.delete('/calls/:id', (req, res) => {
        const id = Number(req.params.id)

        CallModel.delete(id, res);
    })
}