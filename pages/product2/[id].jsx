import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import dbConnect from "../../util/mongo";
import Product2Model from "../../models/Product2";

const Product2 = ({ beverage}) => {
  console.log(beverage);
  const [price, setPrice] = useState(beverage.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = beverage.prices[sizeIndex] - beverage.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({...beverage, extras, price, quantity}));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={beverage.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{beverage.title}</h1>
        <span className={styles.price}>₹{price}</span>
        <p className={styles.desc}>{beverage.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          {(beverage.prices.length === 3 ? ["Small", "Medium", "Large"] : ["Regular", "Large"]).map(
            (sizeName, index) => (
              <div
                key={index}
                className={`${styles.size} ${size === index ? styles.sizeActive : ""}`}
                title={sizeName}
                onClick={() => handleSize(index)}
              >
                <Image src="/img/size2.png" layout="fill" alt="" />
                <span className={styles.number}>₹{beverage.prices[index]}</span>
              </div>
            )
          )}
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {beverage.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor={option.text}>
                {option.text} (+₹{option.price})
              </label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className={styles.quantity}
          />
          <button className={styles.button} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  await dbConnect();
  const beverage = JSON.parse(
    JSON.stringify(await Product2Model.findById(params.id))
  );
  return {
    props: {
      beverage,
    },
  };
};

export default Product2;