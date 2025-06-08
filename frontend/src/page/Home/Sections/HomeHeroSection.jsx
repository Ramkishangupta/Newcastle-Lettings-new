import React from 'react';
import HeroSection from './HeroSection';
import { background1, background2 } from '../../../assets/assets';

const images = [background1, background2];

function HomeHeroSection() {
  return (
    <HeroSection
      images={images}
      label="Properties"
      heading="Newcastle Lettings"
      subheading="Excellence in property services"
    />
  );
}

export default HomeHeroSection;
