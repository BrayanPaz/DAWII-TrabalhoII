import conexao from '../config/conexao.js'

const Desenvolvedora = conexao.Schema({
    nome: {type:String, required:true},
    descricao:{type:String, required:true},
    website:{type:String, required:true},
    paisDeOrigem:{type:String, required:true},
    dataDeFundacao:{type:Date, required:true},
    logo:{type:Buffer, required:true},
})

export default conexao.model('Desenvolvedora',Desenvolvedora)

/*Desenvolvedora:
Nome: String
Descrição: String
Website: String
País De Origem: String
Data De Fundação: Date
Logo: Buffer
*/