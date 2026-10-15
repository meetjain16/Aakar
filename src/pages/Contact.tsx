import Layout from '../components/Layout';
import ContactSection from '../components/ContactSection';
import PageHero from '../components/PageHero';

export default function ContactPage() {
  return (
    <Layout page="contact">
      <PageHero
        eyebrow="Contact"
        title="Tell us what you need to make"
        description="Send the specification, the volume and the timeline. You'll get a real answer from someone who knows the plant — usually within one business day."
      />
      <ContactSection />
    </Layout>
  );
}
