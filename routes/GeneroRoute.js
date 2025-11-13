import express from 'express'
const router = express.Router()
import GeneroController from '../controllers/GeneroController.js'
const controller = new GeneroController()

const caminhobase = 'genero/'

router.get(`/${caminhobase}add`, controller.openAdd)
router.post(`/${caminhobase}add`, controller.add)
router.get(`/${caminhobase}list`, controller.list)
router.post(`/${caminhobase}list`, controller.find)
router.get(`/${caminhobase}edit/:id`, controller.openEdit)
router.post(`/${caminhobase}edit/:id`, controller.edit)
router.get(`/${caminhobase}delete/:id`, controller.delete)

export default router