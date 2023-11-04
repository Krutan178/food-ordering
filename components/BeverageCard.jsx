import Image from "next/image";
import styles from "../styles/PizzaCard.module.css";
import Link from "next/link";

const BeverageCard = ({ beverage }) => {
  console.log(beverage);
  return (
    <div className={styles.container}>
      <Link href={`/product2/${beverage._id}`} passHref>
        <Image src={beverage.img} alt="" width="500" height="500" />
      </Link>
      <h1 className={styles.title}>{beverage.title}</h1>
      <span className={styles.price}>₹{beverage.prices[0]}</span>
      <p className={styles.desc}>{beverage.desc}</p>
    </div>
  );
};

export default BeverageCard;