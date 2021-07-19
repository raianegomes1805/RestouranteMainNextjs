import styles from '../styles/Produto.module.css'

export default function ProdutoConteudo({produtos, setOrdernarMetodo, setModalAtivo, setProdutoModal}) {
    let formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })

    function handleOrdenar(metodo) {
        setOrdernarMetodo(metodo.target.value)
    }

    function handleSelecionarProduto(produto) {
        setModalAtivo(true)
        setProdutoModal(produto)
    }
    
    return (
        <div className={styles.produtos}>
            <div className={styles.headerProdutos}>
                <h3 className={styles.produtosTitulo}>Escolha sua opção:</h3>
                <select onChange={(selecionado) => {handleOrdenar(selecionado)}} className={styles.produtosOrdenar}>
                    <option value="Menor Preço">Menor Preço</option>
                    <option value="Maior Preço">Maior Preço</option>
                    <option value="Menor Quantidade">Menor Quantidade</option>
                    <option value="Maior Quantidade">Maior Quantidade</option>
                </select>
            </div>
            <div className={styles.produtosListas}>
                {produtos && produtos.map(produto => {
                    return (
                        <div onClick={() => {handleSelecionarProduto(produto)}} key={produto.id} className={styles.produtoInfo}>
                            <img className={styles.produtoImagem} src={"http://localhost:1337"+produto.img[0].url}/>
                            <p className={styles.produtoNome}>{produto.Nome}</p>
                            <p className={styles.produtoPreco}>{formatter.format(produto.price)}</p>
                            <p className={styles.produtoQuantidade}>{produto.amount} Disponivel</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}