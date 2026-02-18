const services = [
    {
      id: 1,
      icon: '🌐',
      iconClass: 'icon-purple',
      title: 'Study Abroad Consulting',
      description: 'Expert guidance for university selection, application process, and visa assistance',
      buttonText: 'Learn More'
    },
    {
      id: 2,
      icon: '📖',
      iconClass: 'icon-blue',
      title: 'Test Preparation',
      description: 'Comprehensive coaching for IELTS, TOEFL, GRE, GMAT, and other standardized tests',
      buttonText: 'Learn More'
    },
    {
      id: 3,
      icon: '👥',
      iconClass: 'icon-green',
      title: 'Career Counseling',
      description: 'Personalized career guidance and mentorship for your academic journey',
      buttonText: 'Learn More'
    }
  ];

   const destinations = [
    {
      id: 1,
      flag: '🇺🇸',
      country: 'United States',
      universities: '150+ Universities',
      routePath: '/study/united-states'
    },
    {
      id: 2,
      flag: '🇨🇦',
      country: 'Canada',
      universities: '95+ Universities',
      routePath: '/study/canada'
    },
    {
      id: 3,
      flag: '🇬🇧',
      country: 'United Kingdom',
      universities: '130+ Universities',
      routePath: '/study/united-kingdom'
    },
    {
      id: 4,
      flag: '🇦🇺',
      country: 'Australia',
      universities: '85+ Universities',
      routePath: '/study/australia'
    },
    {
      id: 5,
      flag: '🇩🇪',
      country: 'Germany',
      universities: '75+ Universities',
      routePath: '/study/germany'
    },
    {
      id: 6,
      flag: '🇳🇿',
      country: 'New Zealand',
      universities: '45+ Universities',
      routePath: '/study/new-zealand'
    }
  ];

  const courses = [
    {
      id: 1,
      testName: 'IELTS',
      category: 'English Proficiency',
      duration: '8 weeks',
      originalPrice: 'Rs. 7,000',
      price: '₹3,500',
      discount: '50% OFF'

    },
    {
      id: 2,
      testName: 'PTE',
      category: 'English Proficiency',
      duration: '6 weeks',
      originalPrice: 'Rs. 7,000',
      price: '₹3,500',
      discount: '50% OFF'
    }
  ];

 const stories = [
    {
      id: 1,
      rating: 5,
      name: 'Bimal Lungeli Magar',
      program: 'Student in Australia',
      image: '/Bimal.jpg',
      title: 'Smooth and Stress-Free!',
      testimonial: 'From choosing my university to visa approval, the Nexture team was with me every step.'
    },
    {
      id: 2,
      rating: 5,
      name: 'Sandhya Dhakal',
      program: 'Student in Canada',
      image: '/sandhya.jpg',
      title: 'Truly Reliable!',
      testimonial: 'They made my dream of studying in Canada possible. Highly recommend their services!'
    },
    {
      id: 3,
      rating: 5,
      name: 'Sony Acharya',
      program: 'Student in New Zealand',
      image: '/Sony Acharya.jpeg',
      title: 'Expertise and Support!',
      testimonial: "I couldn't have navigated the visa process alone. Their expertise and support were truly invaluable!"
    }
  ];

    export { services, destinations, courses, stories };