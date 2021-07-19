import styles from '../styles/Conteudo.module.css'
import Filtro from '../components/Filtro'
import Produto from '../components/Produto'

export default function Conteudo({produtos, categorias, filtro, setFiltro, filtroTexto, setFiltroTexto, setOrdernarMetodo, setModalAtivo, setProdutoModal}) {
    return (
        <div className={styles.containerConteudo}>
            <Filtro categorias={categorias} filtro={filtro} setFiltro={setFiltro}/>
            <Produto produtos={produtos} setOrdernarMetodo={setOrdernarMetodo} setModalAtivo={setModalAtivo} setProdutoModal={setProdutoModal}/>
        </div>
    )
}