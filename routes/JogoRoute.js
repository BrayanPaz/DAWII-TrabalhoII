import express from 'express'
const router = express.Router()
import JogoController from '../controllers/JogoController.js'
const controller = new JogoController()
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

const caminhobase = 'jogo/'

router.get(`/${caminhobase}add`, controller.openAdd)
router.post(`/${caminhobase}add`, upload.single('poster'), controller.add)
router.get(`/${caminhobase}list`, controller.list)
router.post(`/${caminhobase}list`, controller.find)
router.get(`/${caminhobase}edit/:id`, controller.openEdit)
router.post(`/${caminhobase}edit/:id`, upload.single('poster'), controller.edit)
router.get(`/${caminhobase}delete/:id`, controller.delete)

export default router