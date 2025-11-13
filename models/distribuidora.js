import conexao from '../config/conexao.js'

const Distribuidora = conexao.Schema({
    nome: {type:String, required:true},
    descricao: {type:String, required:true},
    website: {type:String, required:true},
    paisDeOrigem: {type:String, required:true},
    dataDeFundacao: {type:Date, required:true},
    logo: {type:Buffer, required:true,
        get: (valor) => {
            if (!valor) return null;
            return `data:image/png;base64,${valor.toString('base64')}`;
        }
    },
})

export default conexao.model('Distribuidora',Distribuidora)
