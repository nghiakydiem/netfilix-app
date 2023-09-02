import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function Motion({
  children,
  variantsOption,
  delay,
  slideMotion = false,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  const variantsList = {
    bottomToTop: {
      hidden: { opacity: 0, y: 150 },
      visible: { opacity: 1, y: 0 },
    },
    opacity: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  };

  const variants = variantsList[variantsOption] || variantsList.bottomToTop;

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView]);

  return (
    <div>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: delay || 0.25 }}
        ref={ref}
      >
        {children}
      </motion.div>
      {slideMotion && (
        <motion.div
          variants={{
            hidden: { left: 0 },
            visible: { left: "100%" },
          }}
          initial="hidden"
          animate={slideControls}
          transition={{ duration: 0.5, delay: "0.25" }}
          ref={ref}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
