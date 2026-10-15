import Layout from '../components/Layout';
import QualitySection from '../components/QualitySection';
import PageHero from '../components/PageHero';

export default function QualityPage() {
  return (
    <Layout page="quality">
      <PageHero
        eyebrow="Quality & facilities"
        title="Consistency is a process, not a promise"
        description="Grinding minerals is easy. Grinding them to the same specification for years is what our plant, lab and paperwork are built around."
      />
      <QualitySection />
    </Layout>
  );
}
