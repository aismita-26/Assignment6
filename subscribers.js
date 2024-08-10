const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');





// Creating One
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        domain: req.body.domain,
        subscribeDate: req.body.subscribeDate
    });
    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Getting All
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
});


// Getting One
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber);
});


// Updating One
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
         res.subscriber.name = req.body.name;
    }
    if (req.body.domain != null) {
        res.subscriber.domain = req.body.domain;
    }
    if (req.body.subscribeDate != null) {
        res.subscriber.subscribeDate = req.body.subscribeDate;
    }
    try {
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Deleting One
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.deleteOne();
        res.json({ message: " Subscriber Deleted :( " });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});





async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if (subscriber == null) {
            return res.status(404).json({ message: "Cannot Find The Given Subscriber." });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.subscriber = subscriber;
    next();
}

module.exports = router