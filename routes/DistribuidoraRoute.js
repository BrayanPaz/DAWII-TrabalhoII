import express from 'express'
const router = express.Router()
import DistribuidoraController from '../controllers/DistribuidoraController.js'
const controller = new DistribuidoraController()
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

const caminhobase = 'distribuidora/'

router.get(`/${caminhobase}add`, controller.openAdd)
router.post(`/${caminhobase}add`, upload.single('logo'), controller.add)
router.get(`/${caminhobase}list`, controller.list)
router.post(`/${caminhobase}list`, controller.find)
router.get(`/${caminhobase}edit/:id`, controller.openEdit)
router.post(`/${caminhobase}edit/:id`, upload.single('logo'), controller.edit)
router.get(`/${caminhobase}delete/:id`, controller.delete)

export default router