import styles from '../styles/Carrinho.module.css'
import { useState } from 'react'
export default function Carrinho({carrinho, setCarrinho, produtosLista, setProdutosLista}) {

    const [envio, setEnvio] = useState('Dine In')

    let formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })

    function handleRemoveCarrinho(item) {
        setProdutosLista(produtosLista.map((produto) => {
            if(produto.id == item.produto.id){
                produto.amount += item.amount
            }
            return produto
        }))
        setCarrinho(carrinho.filter((itemProduto) => {
            return itemProduto.produto.id != item.produto.id
        }))
    }


    function handleChangeQuantideProduto(item, itemProdutoRecebido) {
        if(item.nativeEvent.inputType != undefined){
            return;
        }

        const quantidade = Number(item.target.value)
        if(quantidade < 1){
            return;
        }
        const quantidadeEditada = quantidade - itemProdutoRecebido.amount
        if(itemProdutoRecebido.produto.amount < 1 && quantidadeEditada > 0) {
            return;
        }
        setProdutosLista([...produtosLista.map((produto) => {
            if(produto.id == itemProdutoRecebido.produto.id){
                produto.amount -= quantidadeEditada
            }
            return produto
        })])
        setCarrinho([...carrinho.map((itemProduto) => {
            if(itemProdutoRecebido.produto.id == itemProduto.produto.id) {
                itemProduto.amount += quantidadeEditada
            }
            return itemProduto
        })])
    }

    function isSelecionado(tipoEnvio) {
        if(envio==tipoEnvio){
            return true
        }
        return false
    }

    function selecionarEnvio(tipoEnvio) {
        setEnvio(tipoEnvio)
    }

    async function handleRealizarCompra() {
        if(carrinho.length != 0){
            setCarrinho([])
        }

    }

    return (
        <div className={styles.carrinhoContainer}>
            <h3 className={styles.carrinhoTitulo}>Pedidos</h3>
            <div className={styles.carrinhoOpcoes}>
                <button onClick={() => selecionarEnvio("Delivery")} className={isSelecionado("Delivery") ? styles.carrinhoOpcaoSelecionado : styles.carrinhoOpcao}>Delivery</button>
            </div>
            <div className={styles.carrinhoLabels}>
                <label className={styles.carrinhoLabel}>Item</label>
                <label className={styles.carrinhoLabel}>Quantidade</label>
                <label className={styles.carrinhoLabel}>Preço</label>
            </div>
            <div className={styles.carrinhoProdutos}>
                {
                    carrinho.map((itemProduto, index) => {
                        return (
                            <div key={index} className={styles.carrinhoProduto}>
                                <img src={"http://localhost:1337" + itemProduto.produto.img[0].url} className={styles.carrinhoProdutoImagem}/>
                                <div className={styles.carrinhoProdutoInfo}>
                                    <p className={styles.carrinhoProdutoNome}>{itemProduto.produto.Nome}</p>
                                    <p className={styles.carrinhoProdutoPreco}>{formatter.format(itemProduto.produto.price)}</p>
                                </div>
                                <div className={styles.carrinhoProdutoQuantidade}>
                                    <input max={itemProduto.produto.amount + itemProduto.amount} onChange={(evento) => {handleChangeQuantideProduto(evento, itemProduto)}} value={itemProduto.amount} type="number" className={styles.carrinhoProdutoQuantidadeText}></input>
                                </div>
                                <p className={styles.carrinhoProdutoPrecoTotal}>{formatter.format(itemProduto.amount * itemProduto.produto.price)}</p>
                                <input type="text" placeholder="Order Note..." className={styles.carrinhoProdutoDescricao}></input>
                                <a onClick={() => handleRemoveCarrinho(itemProduto)} className={styles.carrinhoProdutoRemover} href="#">
                                    <img className={styles.carrinhoProdutoRemoverImagem} src="/img/lixeira.svg"/>
                                </a>
                            </div>
                        )
                    })
                } 
            </div>
            <div className={styles.carrinhoPreco}>
                <div className={styles.carrinhoTotal}>
                    <p className={styles.carrinhoValorTotalText}>total</p>
                    <p className={styles.carrinhoValorTotal}>
                        {formatter.format(carrinho.reduce((valor, itemProduto) => valor += itemProduto.amount * itemProduto.produto.price, 0))}
                    </p>
                </div>
                <button onClick={() => {handleRealizarCompra()}} className={styles.carrinhoFinalizarCompra}>Pagamento</button>
            </div>
        </div>
    )
}