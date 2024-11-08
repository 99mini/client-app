import Example from '@/components/Example';
import { romanize } from 'es-hangul';

const About = () => {
  return (
    <main>
      <h1>About Us</h1>
      <p>This is the About page.</p>
      <p>changed something</p>
      <span>{`종로구:  ${romanize('종로구')}`}</span>
      <Example />
    </main>
  );
};

export default About;
