import React from 'react'; // get the React object from the react module
import Image from "next/image";
import styles from "../styles/Footer.module.css";



class about extends React.Component {
  render() {
    return (
     <div align="center">
       <div>
         <h1 >ABOUT US</h1>
       </div>
       <div className={styles.item}>
       <Image src="/img/restourent.jpg" objectFit="cover" layout="fill" alt="" />
       </div>
       <div>
         <p>In the current era of e-commerce, several online business models are mushrooming & leading to a new wave of start-ups. In that particular aspect, online food ordering and the delivery business model has seen an immense interest from consumers, entrepreneurs as well as investors. These online businesses act as a common platform between consumers and restaurants. However, in order to ensure that your online food ordering and delivering business is successful, you need to have specific features baked right into your website and apps, You need to take care of various technical and marketing aspects to make your site stand apart, and<i> <b>Inner Chef</b></i> provides you the perfect platform which creates a significant place for your business among all other online platforms which are presently there in the marketplace.<i> <b>Inner Chef</b></i>  is among the very few brands who provide a platform with numerous unique features through which any business owner has the option to customize their websites and apps according to their own choice, and this feature enables a particular business to make a significant impact on the marketplace. It also helps in consumer attraction, marketing and various other challenges in the online world.</p>
       <p>The overall idea behind launching an online food ordering and a delivery website is to bridge the gap between consumers and restaurants/food chains/local food shops. In addition to it, the website/app must also possess very high user engagement, making the overall process seamless, and <i> <b>Inner Chef</b></i> provides such platforms with highly innovative features and thus making it easier for the businesses to break multiple barriers in the online marketplace.</p>
       </div>
       <div>
         <p>There has been a massive boon in the online business arena with many start-ups mushrooming across multiple verticals. In that aspect, online food ordering and delivering business model has become one of the most prominent business ideas, so here we are providing a list of 30 best food ordering website ideas that you can start with us. It is a formidable platform driven by innovative features, which makes it easy for anyone to launch their online food ordering and delivery website. So do not wait and let this opportunity get out of your hand.</p>
       <br/>
       </div>
     </div>
    );
  }
}

export default about;