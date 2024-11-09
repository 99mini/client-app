import IntroCard from '@/components/intro-card/introCard';
import './page.css';

const About = () => {
  return (
    <div className="container">
      <div className="sampleImage">
        <img src="/asset/sampleImage.png" alt="sampleImage" />
      </div>
      <div className="textBox">
        <IntroCard userName={'Hong gildong'} selectedCategory={'Food'} selectedGu={'GangNam'} />
      </div>
    </div>
  );
};

export default About;
