import Layout from '../components/Layout';
import ProductsSection from '../components/ProductsSection';
import PageHero from '../components/PageHero';
import { products } from '../lib/site';

export default function ProductsPage() {
  return (
    <Layout page="products">
      <PageHero
        eyebrow="Products"
        title={`${products.length} mineral grades, milled to your specification`}
        description="Every grade is available across a range of mesh sizes. Published figures are typical values; ask us for the current certificate of analysis."
      />
      <ProductsSection />
    </Layout>
  );
}
