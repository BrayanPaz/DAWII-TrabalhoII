import Desenvolvedora from '../models/desenvolvedora.js';

export default class DesenvolvedoraController{
    constructor(caminhoBase='desenvolvedora/'){
        this.caminhoBase = caminhoBase
        this.openAdd = async (req,res)=>{
            res.render(this.caminhoBase+'add')
        }
        this.add = async(req, res)=>{
            //cria Desenvolvedora
            await Desenvolvedora.create({
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
            const resultado = await Desenvolvedora.find({})
            res.render(this.caminhoBase +'list',  {Desenvolvedoras: resultado})
        }
        this.openEdit = async (req, res) => {
            const desenvolvedora = await Desenvolvedora.findById(req.params.id)
            res.render(this.caminhoBase +'edit', {Desenvolvedora: desenvolvedora})
        }
        this.edit = async (req, res) => {
            await Desenvolvedora.findByIdAndUpdate(req.params.id, {
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
            await Desenvolvedora.findByIdAndDelete(req.params.id)
            res.redirect('/'+this.caminhoBase+'list')
        }
        this.find = async (req, res) => {
            const filtro = req.body.filtro
            const resultado = await Desenvolvedora.find({nome: {$regex: filtro, $options: 'i'}})
            res.render(this.caminhoBase+'list', {Desenvolvedoras: resultado})
        }
    }
}
/*nome: {type:String, required:true},
    descricao: {type:String, required:true},
    website: {type:String, required:true},
    paisDeOrigem: {type:String, required:true},
    dataDeFundacao: {type:Date, required:true},
    logo: {type:Buffer, required:true,
        get: (valor) => {
            if (!valor) return null;
            return `data:image/png;base64,${valor.toString('base64')}`;
        }
    },*/