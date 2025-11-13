import express from 'express';
const router = express.Router();
import {
    home,
    formulario
} from '../controllers/controller.js'
router.get('/', home)

//create do modelo time (create)
router.post('/formulario', formulario)
export default router