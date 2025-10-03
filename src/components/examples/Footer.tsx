import Footer from '../Footer';

export default function FooterExample() {
  return (
    <Footer 
      onSectionChange={(section) => console.log('Footer section change:', section)} 
    />
  );
}