import Jogo from '../models/jogo.js';

export default class JogoController{
    constructor(caminhoBase='jogo/'){
        this.caminhoBase = caminhoBase
        this.openAdd = async (req,res)=>{
            res.render(this.caminhoBase+'add')
        }
        this.add = async(req, res)=>{
            //cria jogo
            await Jogo.create({
                nome: req.body.nome,
                gêneros: req.body.gêneros,
                descrição: req.body.descrição,
                desenvolvedora: req.body.desenvolvedora,
                dataLançamento: req.body.dataLançamento,
                preço: req.body.preço,
                plataforma: req.body.plataforma,
                cartaz: req.file.buffer,
            })
            res.redirect('/'+this.caminhoBase+'add')
        }
        this.list = async (req, res) => {
            const resultado = await Jogo.find({})
            res.render(this.caminhoBase +'list', {Jogos: resultado})
        }
        this.openEdit = async (req, res) => {
            const jogo = await Jogo.findById(req.params.id)
            res.render(this.caminhoBase +'edit', {Jogo: jogo})
        }
        this.edit = async (req, res) => {
            await Jogo.findByIdAndUpdate(req.params.id, {
                nome: req.body.nome,
                gêneros: req.body.gêneros,
                descrição: req.body.descrição,
                desenvolvedora: req.body.desenvolvedora,
                dataLançamento: req.body.dataLançamento,
                preço: req.body.preço,
                plataforma: req.body.plataforma,
                cartaz: req.body.cartaz,
            })
            res.redirect('/'+this.caminhoBase+'list')
        }
        this.delete = async (req,res) => 
        {
            await Jogo.findByIdAndDelete(req.params.id)
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