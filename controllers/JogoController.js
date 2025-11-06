import Aluno from '../models/aluno.js';

export default class AlunoController{
    constructor(caminhoBase='aluno/'){
        this.caminhoBase = caminhoBase
        this.openAdd = async (req,res)=>{
            res.render(this.caminhoBase+'add')
        }
        this.add = async(req, res)=>{
            //cria aluno
            await Aluno.create({
                nome: req.body.nome,
                matricula: req.body.matricula,
            })
            res.redirect('/'+this.caminhoBase+'add')
        }
        this.list = async (req, res) => {
            const resultado = await Aluno.find({})
            res.render(this.caminhoBase +'list', {Alunos: resultado})
        }
        this.openEdit = async (req, res) => {
            const aluno = await Aluno.findById(req.params.id)
            res.render(this.caminhoBase +'edit', {Aluno: aluno})
        }
        this.edit = async (req, res) => {
            await Aluno.findByIdAndUpdate(req.params.id, {
                nome: req.body.nome,
                matricula: req.body.matricula
            })
            res.redirect('/'+this.caminhoBase+'list')
        }
        this.delete = async (req,res) => 
        {
            await Aluno.findByIdAndDelete(req.params.id)
            res.redirect('/'+this.caminhoBase+'list')
        }
        this.find = async(req,res) =>
        {
            const filtro = req.body.filtro
            const resultado = await Aluno.find({nome: {$regex: filtro, $options: 'i'}})
            res.render(this.caminhoBase+'list', {Alunos: resultado})
        }
    }
}
