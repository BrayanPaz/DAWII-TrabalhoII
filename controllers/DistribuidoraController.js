import Distribuidora from '../models/distribuidora.js';

export default class DistribuidoraController{
    constructor(caminhoBase='distribuidora/'){
        this.caminhoBase = caminhoBase
        this.openAdd = async (req,res)=>{
            res.render(this.caminhoBase+'add')
        }
        this.add = async(req, res)=>{
            //cria Distribuidora
            await Distribuidora.create({
                nome: req.body.nome,
                descricao: req.body.descricao,
                website: req.body.website,
                paisDeOrigem: req.body.paisDeOrigem,
                dataDeFundacao: req.body.dataDeFundacao,
                logo: req.file.buffer
            })
            res.redirect('/'+this.caminhoBase+'add')
        }
        this.list = async (req, res) => {
            const resultado = await Distribuidora.find({})
            res.render(this.caminhoBase +'list',  {Distribuidoras: resultado})
        }
        this.openEdit = async (req, res) => {
            const distribuidora = await Distribuidora.findById(req.params.id)
            res.render(this.caminhoBase +'edit', {Distribuidora: distribuidora})
        }
        this.edit = async (req, res) => {
            await Distribuidora.findByIdAndUpdate(req.params.id, {
                nome: req.body.nome,
                descricao: req.body.descricao,
                website: req.body.website,
                paisDeOrigem: req.body.paisDeOrigem,
                dataDeFundacao: req.body.dataDeFundacao,
                logo: req.file.buffer
            })
            res.redirect('/'+this.caminhoBase+'list')
        }
        this.delete = async (req,res) => {
            await Distribuidora.findByIdAndDelete(req.params.id)
            res.redirect('/'+this.caminhoBase+'list')
        }
        this.find = async (req, res) => {
            const filtro = req.body.filtro
            const resultado = await Distribuidora.find({nome: {$regex: filtro, $options: 'i'}})
            res.render(this.caminhoBase+'list', {Distribuidoras: resultado})
        }
    }
}