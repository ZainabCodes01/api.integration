import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      animate={{
        x: mousePosition.x - 10, // adjust -10 to center the circle
        y: mousePosition.y - 10,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      className="fixed top-0 left-0 w-3 h-3 rounded-full bg-sky-500 pointer-events-none z-50"
    />
  );
}
