import { useState, useEffect } from 'react';
import { Box, Container, Button } from '@mui/material';

type ContentItem = {
  imageUrl: string;
};

const BannerCarousel = ({ contentArray }: { contentArray: ContentItem[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === contentArray.length - 1 ? 0 : prevSlide + 1
      );
    }, 10000);

    return () => clearInterval(autoSlideInterval);
  }, [contentArray]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === contentArray.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? contentArray.length - 1 : prevSlide - 1
    );
  };

  return (
    <Container style={{ position: 'relative', padding: 0 }}>
      {contentArray.map((content, index) => (
        <Box
          p={4}
          key={index}
          style={{
            display: index === currentSlide ? 'block' : 'none',
            padding: '0',
            marginTop: '35px',
          }}
        >
          <img
            src={content.imageUrl}
            alt={`Slide ${index + 1}`}
            style={{ maxWidth: '100%', padding: '0' }}
          />
        </Box>
      ))}
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Button variant="text" onClick={prevSlide} style={{ fontSize: '24px' }}>
          &lt;
        </Button>
        <Button variant="text" onClick={nextSlide} style={{ fontSize: '24px' }}>
          &gt;
        </Button>
      </Box>
    </Container>
  );
};

export default BannerCarousel;
