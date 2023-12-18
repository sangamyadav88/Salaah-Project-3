import Slider from "../../components/slider/Slider"
import "./Home.scss"
import HomeInfoBox from "./HomeInfoBox"
import { productData } from "../../components/corousel/data.js"
import CarouselItem from "../../components/corousel/Carouselltem.js";
import ProductCarousel from "../../components/corousel/Carousel";
import ProductCategory from "./ProductCategory.js";
import FooterLinks from "../../components/footer/FooterLinks.js";

 
const PageHeading =({heading , btntext})=>{
    return(
        <>
        <div className="--flex-between">
            <h2 className="--fw-thin">{heading}</h2>
            <button className="--btn">
                {btntext}
            </button>
        </div>
        <div className="--hr"></div>
        </>
    )
}

const Home = () => {
    const productss = productData.map((item)=>(
        <div key={item.id}>
             <CarouselItem
             name={item.name}
             url = {item.imageurl}
             price={item.price}
             description={item.description}
             />
        </div>
    ))
  return (
   <>
   <Slider/>
   <section>
    <div className="container">
        <HomeInfoBox/>
        <PageHeading heading={"Latest Products"} btntext={"Shop Now>>>"}/>
        <ProductCarousel products={productss}/>
    </div>
   </section>
   <section className="--bg-grey">
    <div className="container">
        <h3>Categories</h3>
        <ProductCategory />
    </div>
   </section>
   <section>
    <div className="container">
        <HomeInfoBox/>
        <PageHeading heading={"Mobile Phones"} btntext={"Shop Now>>>"}/>
        <ProductCarousel products={productss}/>
    </div>
   </section>
   <FooterLinks/>
   </>
  )
}

export default Home