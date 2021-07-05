import React, {useState, useEffect} from 'react'

const ScrollToTop = () => {
     const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top coordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);


    return (
        <div className="scroll-to-top">
      {isVisible && 
        <div onClick={scrollToTop}>
          <i className="fa fa-arrow-circle-up scroll-up"></i>
        </div>}
    </div>
    )
}

export default ScrollToTop
