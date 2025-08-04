const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const TravelLog = require('../models/TravelLog');

/**
 * @route   GET api/logs
 * @desc    Get all travel logs for authenticated user
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const logs = await TravelLog.find({ user: req.user.id }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route   POST api/logs
 * @desc    Create a new travel log
 * @access  Private
 */
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
      check('date', 'Date is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, location, date, description, imageUrl } = req.body;
    try {
      const newLog = new TravelLog({
        title,
        location,
        date,
        description,
        imageUrl,
        user: req.user.id,
      });
      const log = await newLog.save();
      res.json(log);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

/**
 * @route   PUT api/logs/:id
 * @desc    Update an existing travel log
 * @access  Private
 */
router.put(
  '/:id',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
      check('date', 'Date is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, location, date, description, imageUrl } = req.body;
    // Build log object
    const logFields = { title, location, date, description };
    if (imageUrl) logFields.imageUrl = imageUrl;
    try {
      let log = await TravelLog.findById(req.params.id);
      if (!log) {
        return res.status(404).json({ msg: 'Log not found' });
      }
      // Ensure user owns log
      if (log.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
      log = await TravelLog.findByIdAndUpdate(
        req.params.id,
        { $set: logFields },
        { new: true }
      );
      res.json(log);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

/**
 * @route   DELETE api/logs/:id
 * @desc    Delete a travel log
 * @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    let log = await TravelLog.findById(req.params.id);
    if (!log) {
      return res.status(404).json({ msg: 'Log not found' });
    }
    // Ensure user owns log
    if (log.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await TravelLog.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Log removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;