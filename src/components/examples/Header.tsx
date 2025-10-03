import Header from '../Header';

export default function HeaderExample() {
  return (
    <Header 
      activeSection="home" 
      onSectionChange={(section) => console.log('Section changed to:', section)} 
    />
  );
}