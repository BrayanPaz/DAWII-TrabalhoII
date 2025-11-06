import Curso from '../models/curso.js';

export default class CursoController{
    constructor(caminhoBase='curso/'){
        this.caminhoBase = caminhoBase
        this.openAdd = async (req,res)=>{
            res.render(this.caminhoBase+'add')
        }
        this.add = async(req, res)=>{
            //cria Curso
            await Curso.create({
                nome: req.body.nome,
                nivel: req.body.nivel,
                anoFundacao: req.body.anoFundacao,
                area: req.body.area
            })
            res.redirect('/'+this.caminhoBase+'add')
        }
        this.list = async (req, res) => {
            const resultado = await Curso.find({})
            res.render(this.caminhoBase +'list',  {Cursos: resultado})
        }
        this.openEdit = async (req, res) => {
            const curso = await Curso.findById(req.params.id)
            res.render(this.caminhoBase +'edit', {Curso: curso})
        }
        this.edit = async (req, res) => {
            await Curso.findByIdAndUpdate(req.params.id, {
                nome: req.body.nome,
                nivel: req.body.nivel,
                anoFundacao: req.body.anoFundacao,
                area: req.body.area
            })
            res.redirect('/'+this.caminhoBase+'list')
        }
        this.delete = async (req,res) => {
            await Curso.findByIdAndDelete(req.params.id)
            res.redirect('/'+this.caminhoBase+'list')
        }
        this.find = async (req, res) => {
            const filtro = req.body.filtro
            const resultado = await Curso.find({nome: {$regex: filtro, $options: 'i'}})
            res.render(this.caminhoBase+'list', {Cursos: resultado})
        }
    }
}
