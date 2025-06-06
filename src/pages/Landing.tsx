import Home from './Home';
import Features from './Features';
import Pricing from './Pricing';
import Creators from './Creators';
import { Section } from '../components/scroll/Section';

export default function Landing() {
  return (
    <>
      <Section id="home" className="bg-page-gradient">
        <Home />
      </Section>
      <Section id="features" className="bg-dark2">
        <Features />
      </Section>
      <Section id="pricing" className="bg-dark1">
        <Pricing />
      </Section>
      <Section id="creators" className="bg-dark2">
        <Creators />
      </Section>
    </>
  );
}
