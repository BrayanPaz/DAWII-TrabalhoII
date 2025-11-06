import conexao from '../config/conexao.js'

const Jogo = conexao.Schema({
    nome: {type:String, required:true},
    gêneros:{type:[String], required:true},
    descrição:{type:String, required:true},
    desenvolvedora:{type:String, required:true},
    dataLançamento:{type:Date, required:true},
    preço:{type:Number, required:true},
    plataforma:{type:[String], required:true},
    cartaz:{type:Buffer, required:true},
})

export default conexao.model('Jogo',Jogo)