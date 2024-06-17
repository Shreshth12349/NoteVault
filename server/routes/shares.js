const express = require('express');
const router = express.Router();
const shareController = require('../controllers/shareController');
const requireAuth = require('../middleware/requireAuth');

// Create a share (requires authentication)
router.post('/:id', requireAuth, shareController.createShare);

// Access a share (does not require authentication)
router.get('/:endpoint', shareController.getShareByEndpoint);

// Get all shares for a note (requires authentication)
router.get('/all/:id', requireAuth, shareController.getSharesByNoteId);

// Delete a share (requires authentication)
router.delete('/:noteId', requireAuth, shareController.deleteShareByNoteId);

module.exports = router;
