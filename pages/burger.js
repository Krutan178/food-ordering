import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Add1 from "../components/Add1";
import AddButton from "../components/AddButton";
import Featured from "../components/Featured";
import BurgerList from "../components/BurgerList";
import dbConnect from "../util/mongo";
import Product1 from "../models/Product1";
import styles from "../styles/Home.module.css";


function Burger({ burgerList, admin }) {
    // return <h1>Hello, {props.name}</h1>;
    const [close, setClose] = useState(true);
    return (
      <div className={styles.container}>
        <Head>
          <title>Burger Restaurant in Mumbai</title>
          <meta name="description" content="Best pizza shop in town" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Featured />
        {<AddButton setClose={setClose} admin={admin} />}
        <BurgerList burgerList={burgerList} />
        {!close && <Add1 setClose={setClose} />}
      </div>
    );
  }

  export default Burger;

// class Burger extends Component {
//     render() {
//         const [close, setClose] = useState(true);
//         return (
//             <div className={styles.container}>
//                 <Head>
//                     <title>Burger Restaurant in Mumbai </title>
//                     <meta name="description" content="Best pizza shop in town" />
//                     <link rel="icon" href="/favicon.ico" />
//                 </Head>
//                 <Featured />
//                 {<AddButton setClose={setClose} />}
//                 <PizzaList pizzaList={pizzaList} />
//                 {!close && <Add setClose={setClose} />}
//             </div>
//         );
//     }
// }


export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || "";
    let admin = false;

    if (myCookie.token === process.env.TOKEN) {
        admin = true;
    }

    await dbConnect();
    const burgerList = JSON.parse(JSON.stringify(await Product1.find()));
    return {
        props: {
            burgerList,
            admin,
        },
    };
};