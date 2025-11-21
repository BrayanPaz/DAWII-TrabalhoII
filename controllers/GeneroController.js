import Genero from '../models/genero.js';

export default class GeneroController{
    constructor(caminhoBase='adm/genero/'){
        this.caminhoBase = caminhoBase
        this.openAdd = async (req,res)=>{
            res.render(this.caminhoBase+'add')
        }
        this.add = async(req, res)=>{
            //cria Genero
            await Genero.create({
                nome: req.body.nome,
            })
            res.redirect('/'+this.caminhoBase+'add')
        }
        this.list = async (req, res) => {
            const resultado = await Genero.find({})
            res.render(this.caminhoBase +'list',  {Generos: resultado})
        }
        this.openEdit = async (req, res) => {
            const genero = await Genero.findById(req.params.id)
            res.render(this.caminhoBase +'edit', {Genero: genero})
        }
        this.edit = async (req, res) => {
            await Genero.findByIdAndUpdate(req.params.id, {
                nome: req.body.nome
            })
            res.redirect('/'+this.caminhoBase+'list')
        }
        this.delete = async (req,res) => {
            await Genero.findByIdAndDelete(req.params.id)
            res.redirect('/'+this.caminhoBase+'list')
        }
        this.find = async (req, res) => {
            const filtro = req.body.filtro
            const resultado = await Genero.find({nome: {$regex: filtro, $options: 'i'}})
            res.render(this.caminhoBase+'list', {Generos: resultado})
        }
    }
}