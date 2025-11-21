import express from 'express';
const router = express.Router();
import {
    home,
    formulario
} from '../controllers/controller.js'
router.get('/', home)

export default router