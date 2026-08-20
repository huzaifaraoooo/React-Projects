import BrandStrip from "../components/home/BrandStrip";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Hero from "../components/home/Hero";

function Home() {
  return (
    <>
      <Hero />
      <BrandStrip />
      <Categories />
      <FeaturedProducts />
    </>
  );
}

export default Home;