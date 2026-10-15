import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import ProductsSection from '../components/ProductsSection';
import IndustriesSection from '../components/IndustriesSection';
import QualitySection from '../components/QualitySection';
import HomeAbout from '../components/HomeAbout';
import CallToAction from '../components/CallToAction';

/**
 * Landing page. Rather than repeating every section in full — which is what the
 * old single-page site did — each block here is a teaser that links through to
 * the page that covers it properly.
 */
export default function HomePage() {
  return (
    <Layout page="home">
      <HeroSection />
      <HomeAbout />
      <ProductsSection preview limit={3} />
      <IndustriesSection preview limit={6} />
      <QualitySection preview />
      <CallToAction
        title="Ready to specify a grade?"
        description="Send us the mesh, the monthly volume and the delivery location. We'll come back with a price and a certificate of analysis."
      />
    </Layout>
  );
}
