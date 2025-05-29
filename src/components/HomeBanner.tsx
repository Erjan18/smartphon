import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BannerSlide {
  id: number;
  image: string;
  title: string;
  description: string;
  linkTo: string;
  buttonText: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: 1,
    image: 'https://beeline.kg/binaries/content/gallery/mainsite/apple/iphone/iphone-new/iphone-15/pro/blue/1.jpg',
    title: 'iPhone 15 Pro',
    description: 'Новая эра инноваций. Титановый корпус, A17 Pro чип и революционная камера.',
    linkTo: '/phone/iphone15pro',
    buttonText: 'Узнать больше'
  },
  {
    id: 2,
    image: 'https://asiamall.asiacell.com/media/catalog/product/l/d/ld0006113621_1.jpg',
    title: 'Samsung Galaxy S24 Ultra',
    description: 'Флагман с искусственным интеллектом. Создавайте, редактируйте и делитесь с Galaxy AI.',
    linkTo: '/phone/samsungs24ultra',
    buttonText: 'Подробнее'
  },
  {
    id: 3,
    image: 'https://i.insider.com/65cfbf246fcb546d2d50f812?width=1200&format=jpeg',
    title: 'Google Pixel 8 Pro',
    description: 'Безграничные возможности AI-фотографии. Лучшая камера на Android теперь с Google Gemini.',
    linkTo: '/phone/pixel8pro',
    buttonText: 'Посмотреть'
  }
];

const HomeBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    setCurrentSlide(current => (current === bannerSlides.length - 1 ? 0 : current + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide(current => (current === 0 ? bannerSlides.length - 1 : current - 1));
  };
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative h-[500px] overflow-hidden">
      {/* Slides */}
      <div className="h-full">
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="container-custom h-full flex flex-col justify-center">
              <div className="max-w-lg text-white">
                <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl mb-6">{slide.description}</p>
                <Link to={slide.linkTo} className="btn-primary">
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-5 left-0 right-0 z-20 flex justify-center space-x-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeBanner;