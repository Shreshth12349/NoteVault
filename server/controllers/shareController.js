const Share = require('../models/Share');
const Note = require('../models/Note');
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 5 });

const shareController = {

    createShare: async (req, res) => {
        const noteId = req.params.id;
        const userId = req.user._id;
        let currentShare;
        try {
            currentShare = await Share.findOne({noteId: noteId})
        } catch (error) {
            return res.status(400).json({ msg: `Failed to find existing share for the given note. Error: (${error})` });
        }
        if (currentShare) {
            return res.status(200).json({msg: "Old Share fetched", share: currentShare})
        }
        const endpoint = uid.rnd()
        try {
            const newShare = new Share({
                endpoint: endpoint,
                noteId: noteId,
                ownerId: userId
            });
            await newShare.save();
            return res.status(201).json({ msg: 'New share successfully created', share: newShare });
        } catch (error) {
            return res.status(400).json({ msg: `Failed to create a share link. Error: (${error})` });
        }
    },

    getShareByEndpoint: async (req, res) => {
        const endpoint = req.params.endpoint
        try {
            const fetchedShare = await Share.findOne({endpoint: endpoint})
            if (!fetchedShare) {
                return res.status(404).json({msg: `Share with endpoint ${endpoint} not found`})
            }
            const sharedNote = await Note.findOne({_id: fetchedShare.noteId})
            return res.status(200).json({ msg: 'Share successfully fetched', share: sharedNote });
        } catch (error) {
            return res.status(400).json({ msg: `Failed to fetch. Error: (${error})` });
        }
    },

    getSharesByNoteId: async (req, res) => {
        const userId = req.user._id;
        const noteId = req.params.id;
        console.log("user id:", userId)
        const endpoint = req.params.endpoint
        try {
            const fetchedShares = await Share.find({ownerId: userId, noteId: noteId})
            if (fetchedShares.length === 0) {
                return res.status(404).json({msg: `Share with endpoint ${endpoint} not found`})
            }
            return res.status(200).json({ msg: 'Share successfully fetched', shares: fetchedShares });
        } catch (error) {
            return res.status(400).json({ msg: `Failed to fetch. Error: (${error})` });
        }
    },

    deleteShareByNoteId: async (req, res) => {
        const userId = req.user._id;
        const noteId = req.params.noteId;
        console.log(userId, noteId)
        try {
            const deleteResult = await Share.deleteMany({ ownerId: userId, noteId: noteId });

            if (deleteResult.deletedCount === 0) {
                return res.status(404).json({ msg: `Shares of note with ID ${noteId} not found` });
            }

            return res.status(200).json({ msg: 'Shares successfully deleted' });
        } catch (error) {
            console.error(`Failed to delete the shares. Error: ${error}`);
            return res.status(500).json({ msg: `Failed to delete the shares. Error: (${error.message})` });
        }
    }
};

module.exports = shareController;
