import styles from '../styles/Filtro.module.css'
export default function Filtro({categorias, filtro, setFiltro}) {
    function handleFiltro(index) {
        setFiltro(index)
    }
    return  (
        <div className={styles.filtros}>
            <ul className={styles.filtrosLista}>
                {categorias.map((categoria, index) => {
                    return (
                        <a key={index} href="#" onClick={() => handleFiltro(index)}>
                            <li className={index == filtro ? styles.ativo : styles.filtrosListaOpcao}>
                                {categoria}
                            </li>
                        </a>
                    )
                })}
            </ul>
            <hr className={styles.filtrosHr}></hr>
        </div>
    )
}