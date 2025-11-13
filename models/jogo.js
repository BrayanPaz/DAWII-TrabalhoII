import conexao from '../config/conexao.js'

const Jogo = conexao.Schema({
    generos: {type:[String], required:true},
    nome: {type:String, required:true},
    preco: {type:Number, required:true},
    descricao: {type:String, required:true},
    minRam: {type:String, required:true},
    armazenamento: {type:String, required:true},
    poster: {type:Buffer, required:true,
        get: (valor) => {
            if (!valor) return null;
            return `data:image/png;base64,${valor.toString('base64')}`;
        }
    },
    distribuidora: {type:conexao.Schema.Types.ObjectId, ref:'Distribuidora', required:true},
    desenvolvedora: {type:conexao.Schema.Types.ObjectId, ref:'Desenvolvedora', required:true},
    dataDeLancamento: {type:Date, required:true}
})

export default conexao.model('Jogo',Jogo)
