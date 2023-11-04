import styles from "../styles/PizzaList.module.css";
import BurgerCard from "./BurgerCard";

const BurgerList = ({ burgerList }) => {
  console.log();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST Burger IN TOWN</h1>
      <p className={styles.desc}>
      </p>
      <div className={styles.wrapper}>
        {burgerList.map((burger) => (
          <BurgerCard key={burger._id} burger={burger} />
        ))}
      </div>
    </div>
  );
};

export default BurgerList;