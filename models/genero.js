import conexao from '../config/conexao.js'

const Gênero = conexao.Schema({
    nome: {type:String, required:true}
})

export default conexao.model('Gênero',Gênero)