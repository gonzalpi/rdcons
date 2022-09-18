const router = require('express').Router();
let Node     = require('../models/node.model');

router.route('/').get((req, res) => {
    Node.find()
        .then(nodes => res.json(nodes))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const body  = req.body.body;
    const type  = req.body.type;

    const newNode = new Node({
        title,
        body,
        type,
    });

    newNode.save()
        .then(() => res.json('Node added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Node.findById(req.params.id)
        .then(node => res.json(node))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Node.findByIdAndDelete(req.params.id)
        .then(() => res.json('Node deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Node.findById(req.params.id)
        .then(node => {
            node.title = req.body.title || node.title;
            node.body  = req.body.body || node.body;
            node.type  = req.body.type || node.type;

            node.save()
                .then(() => res.json('Node updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
