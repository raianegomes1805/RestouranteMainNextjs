import styles from '../styles/Inicio.module.css'
import Menu from '../components/Menu'
import Conteudo from '../components/Conteudo'
import Carrinho from '../components/Carrinho'
import Modal from '../components/Modal'
import { useEffect, useState } from 'react'

export default function Inicio() {

    const categorias = ["sushi", "Pizza"]
    const [produtosLista, setProdutosLista] = useState([])
    const [produtos, setProdutos] = useState([])
    const [filtro, setFiltro] = useState(0)
    const [filtroTexto, setFiltroTexto] = useState('')
    const [ordenarMetodo, setOrdernarMetodo] = useState('Menor Preço')
    const [modalAtivo, setModalAtivo] = useState(false);
    const [produtoModal, setProdutoModal] = useState({})
    const [carrinho, setCarrinho] = useState([])

    useEffect(async () => {
        async function getProdutos() {
            let response = await fetch("http://localhost:1337/produtos")
            response = await response.json()
            setProdutosLista(response)
        }
        await getProdutos()
    },[])

    function ordenarProdutos(valor) {
        if(valor === "Menor Preço") {
            produtosLista.sort((a, b) => {
                return a.price > b.price ? 1 : -1
            })
            setProdutosLista([...produtosLista])
        }else if(valor === "Maior Preço"){ordenarMetodo
            produtosLista.sort((a, b) => {
                return a.price < b.price ? 1 : -1
            })
            setProdutosLista([...produtosLista])
        }else if(valor === "Maior Quantidade"){
            produtosLista.sort((a, b) => {
                return a.amount < b.amount ? 1 : -1
            })
            setProdutosLista([...produtosLista])
        }else if(valor === "Menor Quantidade") {
            produtosLista.sort((a, b) => {
                return a.amount > b.amount ? 1 : -1
            })
            setProdutosLista([...produtosLista])
        }
    }

    useEffect(() => {
        setProdutos(produtosLista.filter((produto) => {
            const buscaEncontrada = new RegExp(filtroTexto, 'i').test(produto.name)
            return produto.categoria === categorias[filtro] && buscaEncontrada
        }))
    }, [filtro, filtroTexto, produtosLista])

    useEffect(() => {
        ordenarProdutos(ordenarMetodo)
    }, [ordenarMetodo])

    return (
        <div className={styles.container}>
            <Menu/>
            <Conteudo 
                produtos={produtos}
                setProdutos={setProdutos}
                categorias={categorias}
                filtro={filtro}
                setFiltro={setFiltro}
                filtroTexto={filtroTexto}
                setFiltroTexto={setFiltroTexto}
                ordenarMetodo={ordenarMetodo}
                setOrdernarMetodo={setOrdernarMetodo}
                setModalAtivo={setModalAtivo}
                setProdutoModal={setProdutoModal}
            />
            <Carrinho 
                carrinho={carrinho}
                setCarrinho={setCarrinho}
                produtosLista={produtosLista}
                setProdutosLista={setProdutosLista}
            />

            {modalAtivo && <Modal 
                produtoModal={produtoModal}
                setModalAtivo={setModalAtivo}
                carrinho={carrinho}
                setCarrinho={setCarrinho}
                produtosLista={produtosLista}
                setProdutosLista={setProdutosLista}
            />}
        </div>
    )
}