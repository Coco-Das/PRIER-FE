import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

// eslint-disable-next-line react/prop-types
const LottieComponent = ({ animationData, loop = true, autoplay = true, ...restProps }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay,
      animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    });

    return () => {
      animation.destroy();
    };
  }, [animationData, loop, autoplay]);

  return <div ref={containerRef} {...restProps} />;
};

export default LottieComponent;
