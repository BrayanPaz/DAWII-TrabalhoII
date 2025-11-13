import Jogo from '../models/jogo.js';
import distribuidora from '../models/distribuidora.js';
import desenvolvedora from '../models/desenvolvedora.js';
import genero from '../models/genero.js';

export default class JogoController{
    constructor(caminhoBase='jogo/'){
        this.caminhoBase = caminhoBase
        this.openAdd = async (req,res)=>{
            const generos = await genero.find({})
            const distribuidoras = await distribuidora.find({})
            const desenvolvedoras = await desenvolvedora.find({})
            res.render(this.caminhoBase+'add', {generos: generos, distribuidoras: distribuidoras, desenvolvedoras: desenvolvedoras})
        }
        this.add = async(req, res)=>{
            //cria jogo
            await Jogo.create({
                generos: req.body.generos,
                nome: req.body.nome,
                preco: req.body.preco,
                descricao: req.body.descricao,
                minRam: req.body.minRam,
                armazenamento: req.body.armazenamento,
                poster: req.file.buffer,
                distribuidora: req.body.distribuidora,
                desenvolvedora: req.body.desenvolvedora,
                dataDeLancamento: req.body.dataDeLancamento
            })
            res.redirect('/'+this.caminhoBase+'add')
        }
        this.list = async (req, res) => {
            const resultado = await Jogo.find({}).populate('distribuidora').populate('desenvolvedora')
            res.render(this.caminhoBase +'list', {Jogos: resultado})
        }
        this.openEdit = async (req, res) => {
            const jogo = await Jogo.findById(req.params.id)
            res.render(this.caminhoBase +'edit', {Jogo: jogo})
        }
        this.edit = async (req, res) => {
            await Jogo.findByIdAndUpdate(req.params.id, {
                generos: req.body.generos,
                nome: req.body.nome,
                preco: req.body.preco,
                descricao: req.body.descricao,
                minRam: req.body.minRam,
                armazenamento: req.body.armazenamento,
                poster: req.body.poster,
                distribuidora: req.body.distribuidora,
                desenvolvedora: req.body.desenvolvedora,
                dataDeLancamento: req.body.dataDeLancamento
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
            const resultado = await Jogo.find({nome: {$regex: filtro, $options: 'i'}})
            res.render(this.caminhoBase+'list', {Jogos: resultado})
        }
    }
}

/*
    generos: {type:[String], required:true},
    nome: {type:String, required:true},
    preco: {type:Number, required:true},
    descricao: {type:String, required:true},
    minRam: {type:String, required:true},
    armazenamento: {type:String, required:true},
    poster: {type:Buffer, required:true},
    distribuidora: {type:conexao.Schema.Types.ObjectId, ref:'Distribuidora', required:true},
    desenvolvedora: {type:conexao.Schema.Types.ObjectId, ref:'Desenvolvedora', required:true},
    dataDeLancamento: {type:Date, required:true}
})*/