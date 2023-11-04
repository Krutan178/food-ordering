import styles from "../styles/PizzaList.module.css";
import BeverageCard from "./BeverageCard";

const BeverageList = ({ beverageList }) => {
  console.log();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST Beverage IN TOWN</h1>
      <p className={styles.desc}>
      </p>
      <div className={styles.wrapper}>
        {beverageList.map((beverage) => (
          <BeverageCard key={beverage._id} beverage={beverage} />
        ))}
      </div>
    </div>
  );
};

export default BeverageList;