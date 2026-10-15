import Layout from '../components/Layout';
import AboutSection from '../components/AboutSection';
import PageHero from '../components/PageHero';
import CallToAction from '../components/CallToAction';

export default function AboutPage() {
  return (
    <Layout page="about">
      <PageHero
        eyebrow="About us"
        title="Mineral processing from Udaipur, since 2013"
        description="A supplier built on the unglamorous work of keeping every batch the same as the last."
      />
      <AboutSection />
      <CallToAction
        title="Want to see the plant for yourself?"
        description="We welcome customer visits and audits. Tell us when you're in Rajasthan and we'll arrange it."
        primaryLabel="Arrange a visit"
      />
    </Layout>
  );
}
