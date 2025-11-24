import Jogo from '../models/jogo.js';

export default class LojaController {
    constructor() {
        // Simulação de banco de dados local para a sessão do usuário
        this.carrinho = []; 
        this.biblioteca = [];

        // --- VIEWS ---

        // 1. Catálogo (Home da Loja)
        // Atenção: O método se chama 'catalogo' para bater com a rota
        this.catalogo = async (req, res) => {
            try {
                const jogos = await Jogo.find({})
                    .populate('distribuidora')
                    .populate('desenvolvedora');
                
                // CORREÇÃO AQUI: O caminho deve ser relativo à pasta 'views'
                res.render('loja/interface/catalogo', { 
                    jogos: jogos,
                    carrinho: this.carrinho,
                    biblioteca: this.biblioteca
                });
            } catch (error) {
                console.log(error);
                res.status(500).send("Erro ao carregar catálogo.");
            }
        }

        // 2. Carrinho
        this.verCarrinho = async (req, res) => {
            try {
                const jogosNoCarrinho = await Jogo.find({ _id: { $in: this.carrinho } });
                const total = jogosNoCarrinho.reduce((acc, jogo) => acc + jogo.preco, 0);

                // CORREÇÃO AQUI
                res.render('loja/interface/carrinho', { 
                    jogos: jogosNoCarrinho, 
                    total: total 
                });
            } catch (error) {
                res.status(500).send("Erro ao carregar carrinho.");
            }
        }

        // 3. Biblioteca
        this.verBiblioteca = async (req, res) => {
            try {
                const jogosNaBiblioteca = await Jogo.find({ _id: { $in: this.biblioteca } });
                
                // CORREÇÃO AQUI
                res.render('loja/interface/biblioteca', { jogos: jogosNaBiblioteca });
            } catch (error) {
                res.status(500).send("Erro ao carregar biblioteca.");
            }
        }

        // --- AÇÕES (Lógica de Backend) ---

        this.adicionarAoCarrinho = (req, res) => {
            const { id } = req.params;
            if (!this.carrinho.includes(id) && !this.biblioteca.includes(id)) {
                this.carrinho.push(id);
            }
            res.redirect('/loja/carrinho');
        }

        this.removerDoCarrinho = (req, res) => {
            const { id } = req.params;
            this.carrinho = this.carrinho.filter(itemId => itemId !== id);
            res.redirect('/loja/carrinho');
        }

        this.finalizarCompra = (req, res) => {
            this.carrinho.forEach(id => {
                if (!this.biblioteca.includes(id)) {
                    this.biblioteca.push(id);
                }
            });
            this.carrinho = [];
            res.redirect('/loja/biblioteca');
        }
    }
}