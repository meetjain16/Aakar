import Layout from '../components/Layout';
import IndustriesSection from '../components/IndustriesSection';
import PageHero from '../components/PageHero';

export default function IndustriesPage() {
  return (
    <Layout page="industries">
      <PageHero
        eyebrow="Industries we serve"
        title="Nine sectors, one standard of consistency"
        description="The grade that works in a wall putty is not the grade that works in a masterbatch. We match the mineral to the process."
      />
      <IndustriesSection />
    </Layout>
  );
}
