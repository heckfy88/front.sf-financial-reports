import Header from "_components/Header/Header.jsx";
import styles from "./styles.module.scss";

const Home = () => {
  return (
    <div className={styles.component}>
      <Header title="Проект" big center />
      <Header title="Финансовый мониторинг и отчетность" big center />
      <div className={styles.description}>
        <Header title="Подготовлен командой ООО 'ООО'" center />
      </div>
    </div>
);
};

export default Home;
