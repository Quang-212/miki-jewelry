import Page from 'src/components/Page';
import {
  About,
  CircleIcon1,
  CircleIcon2,
  CircleIcon3,
  FeaturedProducts,
  Hero,
  LatestCollection,
  ProductCategory,
} from 'src/container/home';
import MainLayout from 'src/layouts/MainLayout';
import { motion, useScroll } from 'framer-motion';

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default function HomePage() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <Page
        data={{
          title: 'Trang chủ',
          description: 'Trang chủ',
          url: '',
          thumbnailUrl: '',
        }}
      />
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed h-1 top-0 left-0 right-0 bg-pink-600 origin-[0%] z-drawer"
      ></motion.div>

      <Hero />
      <About />
      <FeaturedProducts />
      <LatestCollection />
      <ProductCategory />
      <CircleIcon1 />
      <CircleIcon2 />
      <CircleIcon3 />
    </>
  );
}
