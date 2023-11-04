import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Add1 from "../components/Add1";
import AddButton from "../components/AddButton";
import Featured from "../components/Featured";
import BurgerList from "../components/BurgerList";
import styles from "../styles/Home.module.css";


function burger({ burgerList }) {
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
        {<AddButton setClose={setClose} />}
        <BurgerList burgerList={burgerList} />
        {!close && <Add1 setClose={setClose} />}
      </div>
    );
  }

  export default burger

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
    // const myCookie = ctx.req?.cookies || "";
    // let admin = false;

    // if (myCookie.token === process.env.TOKEN) {
    //     admin = true;
    // }

    const res = await axios.get("http://localhost:3000/api/products1");
    return {
        props: {
            burgerList: res.data,
            // admin,
        },
    };
};