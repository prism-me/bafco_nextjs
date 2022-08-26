import { keyframes } from "@emotion/react";

export const fadeIn = keyframes`{
    from {
        opacity:0;
    }
  
    to {
        opacity:1;
    }
}`;

export const fadeInRightShorter = keyframes`
from {
  opacity: 0;
  transform: translate(-50px,0);
  transform-origin: 0 0;
}

to {
  opacity: 1;
  transform: none
}`;

export const fadeInRight = keyframes`
0% {
    -webkit-transform: translate3d(100%,0,0);
    opacity: 0;
    transform: translate3d(100%,0,0)
}

to {
    -webkit-transform: translateZ(0);
    opacity: 1;
    transform: translateZ(0)
}`;

export const fadeInLeftShorter = keyframes`{
    from {
        opacity: 0;
        transform: translate(50px,0);
        transform-origin: 0 0;
    }
    to {
        opacity: 1;
        transform: none
    }
}`;

export const fadeInLeft = keyframes`
0% {
    -webkit-transform: translate3d(-100%,0,0);
    opacity: 0;
    transform: translate3d(-100%,0,0)
}

to {
    -webkit-transform: translateZ(0);
    opacity: 1;
    transform: translateZ(0)
}`;

export const fadeInUpShorter = keyframes`
from {
    opacity: 0;
    transform: translate(0,50px);
    transform-origin: 0 0;
}
to {
    opacity:1;
    transform:none
}`;

export const fadeInUp = keyframes`
0% {
    -webkit-transform: translate3d( 0, 100%, 0 );
    opacity: 0;
    transform: translate3d( 0, 100 %, 0 )
}

to {
    -webkit-transform: translateZ( 0 );
    opacity: 1;
    transform: translateZ( 0 )
}`;

export const fadeInDownShorter = keyframes`
from {
    opacity: 0;
    transform: translate(0,-50px);
    transform-origin: 0 0;
}

to {
    opacity: 1;
    transform: none
}`;

export const blurIn = keyframes`{
    from {
        opacity: 0;
        filter: blur(20px);
        transform: scale(1.2);
    }
    to {
        opacity: 1;
        filter: blur(0);
        transform: none 
    }
}`;

export const grayOut = keyframes`{
    from {
        opacity: 1;
        filter: grayscale(0);
    }
    15% {
        filter: grayscale(100%);
    }
    to {
        opacity: .0;
        filter: grayscale(100%);
    }
}`;

export const dotPulse = keyframes`{
    from {
        opacity:1;
        transform:scale(.2)
    }
  
    to {
        opacity:0;
        transform:scale(1)
    }
}`;

export const maskUp = keyframes`{
    from {
        transform: translate(0,100%)
    }
  
    to {
        transform: translate(0,0)
    }
}`;

export const maskRight = keyframes`{
    from {
        transform: translate(-100%,0)
    }
    to {
        transform: translate(0,0)
    }
}`;

export const maskDown = keyframes`{
    from {
        transform: translate(0,-100%)
    }
    to {
        transform: translate(0,0)
    }
}`;

export const maskLeft = keyframes`{
    from {
        transform: translate(100%,0)
    }
    to {
        transform: translate(0,0)
    }
}`;

export const slideInUp = keyframes`{
    0% {
        transform: translate3d(0, 100%, 0);
        visibility: visible
    }

    to {
        transform: translateZ(0)
    }
}`;

export const slideInDown = keyframes`{
    0% {
        transform: translate3d(0, -100%, 0);
        visibility: visible
    }

    to {
        transform: translateZ(0)
    }
}`;

export const slideInLeft = keyframes`{
    0% {
        transform: translate3d(-100%, 0, 0);
        visibility: visible
    }
  
    to {
        transform: translateZ(0)
    }
}`;

export const slideInRight = keyframes`{
    0% {
        transform: translate3d(100%, 0, 0);
        visibility: visible
    }
  
    to {
        transform: translateZ(0)
    }
}`;

export const flipInX = keyframes`{
    0% {
        animation-timing-function: ease-in;
        opacity: 0;
        transform: perspective(400px) rotateX(90deg)
    }
  
    to {
        transform: perspective(400px)
    }
}`;

export const flipInY = keyframes`{
  0% {
      animation-timing-function: ease-in;
      opacity: 0;
      transform: perspective(400px) rotateY(90deg);
  }

  to {
      transform: perspective(400px);
  }
}`;

export const flipOutY = keyframes`{
    0% {
        animation-timing-function: ease-out;
        transform: perspective(400px)
    }

    to {
        opacity: 0;
        transform: perspective(400px) rotateY(90deg)
    }
}`;

export const brightIn = keyframes` {
    0% {
        animation-timing-function: ease-in;
        filter: brightness(0%)
    }
  
    to {
        filter: brightness(100%)
    }
}`;

export const zoomInShorter = keyframes`{
    0%{
        -webkit-transform:scale3d(.8,.8,.8);
        opacity:0;
        transform:scale3d(.8,.8,.8)
    }
    50%{
        opacity:1
    }
}`;

export const bounceInUp = keyframes`{
    from, 60%, 75%, 90%, to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }

    from {
        opacity: 0;
        transform: translate3d(0, 3000px, 0);
    }

    60% {
        opacity: 1;
        transform: translate3d(0, -20px, 0);
    }

    75% {
        transform: translate3d(0, 10px, 0);
    }

    90% {
        transform: translate3d(0, -5px, 0);
    }

    to {
        transform: translate3d(0, 0, 0);
    }
}`;

export const slideZoomIn = keyframes`{
    0%{
        transform:scale3d(1,1,1);
        opacity: 1;
    }
    100% {
        transform:scale3d(1.1,1.1,1);
        opacity: 1;
    }
}`;

export const shopData = {
  sizes: [
    {
      size: "Highback",
      slug: "XS",
    },
    {
      size: "Lounge",
      slug: "S",
    },
    {
      size: "Midback",
      slug: "M",
    },
    {
      size: "Sofa",
      slug: "L",
    },
    {
      size: "Visitor",
      slug: "XL",
    },
  ],

  colors: [
    {
      color: "#FFB951",
      color_name: "Brown",
    },
    {
      color: "#352692",
      color_name: "Blue",
    },
    {
      color: "#9E00FF",
      color_name: "Purple",
    },
    {
      color: "#E800DE",
      color_name: "Black",
    },
    {
      color: "#02A443",
      color_name: "Green",
    },
    {
      color: "#880B0B",
      color_name: "Red",
    },
  ],

  brands: [
    {
      brand: "Bafco",
      slug: "next",
    },
    {
      brand: "Comfort",
      slug: "river-island",
    },
    {
      brand: "Humanscale",
      slug: "geox",
    },
    {
      brand: "Linear",
      slug: "nex-balance",
    },
  ],

  categories: [
    {
      name: "Executive Chairs",
      slug: "furniture",
      count: 8,
    },
    {
      name: "Ergonomic Chairs",
      slug: "coffee-and-tables",
      count: 1,
    },
    {
      name: "Conference Chairs",
      slug: "lighting",
      count: 3,
    },
    {
      name: "Visitor Chairs",
      slug: "decoration",
      count: 5,
    },
    {
      name: "Stools",
      slug: "electronics",
      count: 1,
    },
    {
      name: "Multi-Functional Chairs",
      slug: "beds",
      count: 2,
    },
  ],

  prices: [
    {
      min: "0",
      max: "25",
      name: "Under Dhs25",
    },
    {
      min: "25",
      max: "50",
      name: "Dhs25 to Dhs50",
    },
    {
      min: "50",
      max: "100",
      name: "Dhs50 to Dhs100",
    },
    {
      min: "100",
      max: "200",
      name: "Dhs100 to Dhs200",
    },
    {
      min: "200",
      max: "9999",
      name: "Dhs200 & Above",
    },
  ],
};

export const homeData = {
  brands: [
    {
      name: "Kano",
      description:
        "The world's first technology-driven executive collection? The first “E0” environmentally conscious manufacturer of furniture from China? The first fun workstation? KANO is a new generation company integrating Design, Technology and Products from the best machinery from Japan & Germany, and the leading global designers from Italy. KANO delivers the best value of design, quality & service that will add value to every workplace.",
      logo: "images/about/brand/Koplus.jpg",
      image: "images/about/KANO.jpg",
      slug: "https://kano.tech/row",
    },
    {
      name: "Humanscale",
      description:
        "Humanscale is a New York-based company that leads the world in the design and manufacture of ergonomic products for modern workplaces, including desks and chairs that promote good posture and improve the health and comfort of work life.",
      logo: "images/about/brand/HumanScale.jpg",
      image: "images/about/Humanscale.jpg",
      slug: "https://mena.humanscale.com/index.cfm?",
    },
    {
      name: "Koplus",
      description:
        "Founded in the Netherlands in 2009, KOPLUS takes on the vision of designing products that are truly intelligent and intuitive, from office chairs to meeting pods. Koplus is dedicated to delivering only well-designed, thoroughly tested and globally certified products.",
      logo: "images/about/brand/Koplus.jpg",
      image: "images/about/Koplus2.jpg",
      slug: "https://www.koplus.eu/",
    },
    {
      name: "Vantione",
      description:
        "Vantione is a design company founded by a group of young people who are passionate about life. Their designs are inspired by the joyful experiences experienced in our homes, workplaces, and other shared spaces. The furniture helps us to remember those precious moments that create interior environments that follow the Japanese and Scandinavian “lagom” principles.",
      logo: "images/about/brand/VantioneLogo.jpg",
      image: "images/about/Vantione.jpg",
      slug: "http://avanti.one/",
    },
  ],
};

export const mainSlider1 = {
  nav: false,
  dots: true,
  items: 3,
  margin: 20,
  loop: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    992: {
      items: 3,
      dots: true,
    },
  },
};

export const mainSlider2 = {
  nav: false,
  dots: false,
  margin: 20,
  loop: false,
  responsive: {
    0: {
      items: 2,
    },
    992: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  },
};

export const mainSlider3 = {
  nav: false,
  dots: false,
  margin: 20,
  loop: false,
  responsive: {
    0: {
      items: 2,
    },
    480: {
      items: 2,
    },
    992: {
      items: 3,
    },
    1200: {
      nav: true,
      items: 4,
    },
  },
};

export const mainSlider4 = {
  nav: false,
  dots: false,
  margin: 20,
  loop: false,
  responsive: {
    0: {
      items: 2,
    },
    480: {
      items: 2,
    },
    768: {
      items: 3,
    },
    992: {
      items: 4,
    },
    1200: {
      items: 5,
    },
  },
};

export const mainSlider5 = {
  nav: false,
  dots: true,
  margin: 20,
  loop: true,
  responsive: {
    1200: {
      nav: true,
    },
  },
};

export const mainSlider6 = {
  nav: false,
  dots: true,
  margin: 20,
  loop: true,
  responsive: {
    0: {
      items: 1,
    },
    768: {
      items: 2,
    },
    1200: {
      items: 2,
      nav: true,
    },
  },
};

export const mainSlider7 = {
  nav: false,
  dots: true,
  items: 3,
  margin: 20,
  loop: true,
  responsive: {
    0: {
      items: 1,
    },
    768: {
      items: 2,
    },
    992: {
      items: 3,
    },
    1200: {
      items: 3,
      nav: true,
    },
  },
};

export const mainSlider8 = {
  nav: false,
  dots: false,
  margin: 20,
  loop: false,
  items: 2,
  responsive: {
    768: {
      items: 3,
    },
    992: {
      items: 4,
    },
    1200: {
      items: 4,
      dots: false,
    },
    1400: {
      nav: true,
      items: 4,
    },
  },
};

export const mainSlider9 = {
  nav: true,
  dots: false,
  items: 4,
  margin: 20,
  loop: false,
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 3,
    },
    992: {
      items: 4,
    },
  },
};

export const mainSlider10 = {
  loop: false,
  dots: false,
  responsive: {
    772: {
      nav: true,
    },
  },
};

export const mainSlider11 = {
  nav: false,
  dots: true,
  margin: 30,
  loop: false,
  responsive: {
    0: {
      items: 2,
    },
    420: {
      items: 3,
    },
    600: {
      items: 4,
    },
    900: {
      items: 5,
    },
    1024: {
      items: 6,
      nav: true,
      dots: false,
    },
  },
};

export const mainSlider12 = {
  nav: true,
  dots: false,
  margin: 20,
  loop: false,
  autoplay: false,
  responsive: {
    0: {
      items: 2,
    },
    480: {
      items: 2,
    },
    768: {
      items: 3,
    },
    992: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  },
};

export const featureSlider1 = {
  nav: false,
  dots: false,
  margin: 30,
  loop: false,
  responsive: {
    0: {
      items: 2,
    },
    420: {
      items: 3,
    },
    600: {
      items: 4,
    },
    900: {
      items: 5,
    },
    1024: {
      items: 6,
    },
  },
};

export const featureSlider2 = {
  nav: false,
  dots: false,
  margin: 0,
  loop: false,
  responsive: {
    0: {
      items: 2,
    },
    420: {
      items: 3,
    },
    600: {
      items: 4,
    },
    900: {
      items: 5,
    },
    1024: {
      items: 6,
    },
    1360: {
      items: 7,
    },
  },
};

export const featureSlider3 = {
  nav: false,
  dots: false,
  margin: 0,
  items: 6,
  loop: false,
  responsive: {
    0: {
      items: 1,
    },
    360: {
      items: 2,
    },
    600: {
      items: 3,
    },
    992: {
      items: 4,
    },
    1200: {
      items: 5,
    },
    1500: {
      items: 6,
    },
  },
};

export const featureSlider4 = {
  nav: false,
  dots: false,
  margin: 20,
  loop: false,
  responsive: {
    0: {
      items: 2,
    },
    480: {
      items: 2,
    },
    768: {
      items: 3,
    },
    992: {
      items: 4,
    },
    1200: {
      items: 5,
    },
  },
};

export const introSlider = {
  nav: false,
  dots: true,
  loop: true,
};

export const applicationSlider = {
  nav: true,
  dots: false,
  loop: true,
};

export const applicationTabsSlider = {
  nav: true,
  dots: false,
  margin: 0,
  loop: true,
  responsive: {
    0: {
      items: 1,
    },
    420: {
      items: 1,
    },
    600: {
      items: 2,
    },
    900: {
      items: 3,
    },
    1024: {
      items: 4,
    },
    1360: {
      items: 4,
    },
  },
};

export const projectReferenceInnerSlider = {
  nav: true,
  dots: true,
  margin: 20,
  loop: true,
  // navText: ["<img src='assets/images/arrow-left.png'>", "<img src='assets/images/arrow-right.svg'>"],
  responsive: {
    0: {
      items: 1,
    },
    420: {
      items: 1,
    },
    600: {
      items: 2,
    },
    900: {
      items: 3,
    },
    1024: {
      items: 4,
    },
    1360: {
      items: 4,
    },
  },
};

export const fabricFinishedSlider = {
  nav: true,
  dots: true,
  center: true,
  margin: 10,
  loop: true,
  responsive: {
    0: {
      items: 1,
    },
    420: {
      items: 1,
    },
    600: {
      items: 2,
    },
    900: {
      items: 2,
    },
    1024: {
      items: 3,
    },
    1360: {
      items: 3,
    },
  },
};

export const dealSlider = {
  nav: false,
  dots: true,
  loop: true,
};

export const brandSlider = {
  nav: false,
  dots: false,
  margin: 0,
  loop: false,
  responsive: {
    0: {
      items: 2,
    },
    420: {
      items: 3,
    },
    600: {
      items: 4,
    },
    900: {
      items: 5,
    },
    1024: {
      items: 6,
    },
    1360: {
      items: 7,
    },
  },
};

export const productSlider = {
  nav: false,
  dots: true,
  margin: 20,
  loop: false,
  autoHeight: true,
  responsive: {
    320: {
      items: 2,
    },
    768: {
      items: 3,
    },
    1200: {
      items: 4,
    },
    1600: {
      items: 5,
      nav: true,
      dots: false,
    },
  },
};

export const blogSlider = {
  nav: false,
  dots: true,
  items: 3,
  margin: 20,
  loop: false,
  autoHeight: true,
  autoplay: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    992: {
      items: 3,
      dots: true,
    },
  },
};
