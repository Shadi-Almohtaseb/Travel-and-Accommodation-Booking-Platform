import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const useAnimationInView = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return { controls, ref };
};

export default useAnimationInView;
