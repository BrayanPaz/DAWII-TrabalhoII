import conexao from '../config/conexao.js'

const Jogo = conexao.Schema({
    gêneros: {type:Array, required:true},
    nome: {type:String, required:true},
    preço: {type:Number, required:true},
    descrição: {type:String, required:true},
    minRAM: {type:String, required:true},
    armazenamento: {type:String, required:true},
    poster: {type:Buffer, required:false,
    get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
    }},
    distribuidora: {type:conexao.Schema.Types.ObjectId, ref:'Distribuidora', required:true},
    desenvolvedora: {type:conexao.Schema.Types.ObjectId, ref:'Desenvolvedora', required:true},
    dataDeLançamento: {type:Date, required:true},
})

export default conexao.model('Jogo',Jogo)