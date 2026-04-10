import express from 'express';
import * as noteController from '../controllers/noteController.js';

const router = express.Router();

router.get('/', noteController.getNotes);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

export default router;
