"use client";
import { motion } from "motion/react";

const pulseAnimations = [
  {
    size: "200px",
    color: "bg-blue-500",
    delay: 1,
    position: { top: "10%", left: "15%" },
  },
  {
    size: "150px",
    color: "bg-teal-400",
    delay: 2,
    position: { bottom: "20%", right: "10%" },
  },
  {
    size: "100px",
    color: "bg-purple-500",
    delay: 3,
    position: { top: "30%", right: "20%" },
  },
  {
    size: "180px",
    color: "bg-yellow-400",
    delay: 1.5,
    position: { bottom: "5%", left: "30%" },
  },
  {
    size: "120px",
    color: "bg-red-500",
    delay: 2.5,
    position: { top: "50%", left: "5%" },
  },
  {
    size: "90px",
    color: "bg-green-400",
    delay: 3.5,
    position: { top: "10%", right: "5%" },
  },
  {
    size: "160px",
    color: "bg-indigo-500",
    delay: 0.5,
    position: { bottom: "10%", left: "50%" },
  },
];

export const ClickAnimation = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {pulseAnimations.map((animation, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0.5, opacity: 0, ...animation.position }}
          animate={{ scale: [0.5, 1.2, 1], opacity: [0, 0.8, 0] }}
          transition={{
            duration: 2,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: animation.delay,
          }}
          className={`absolute rounded-full ${animation.color}`}
          style={{ width: animation.size, height: animation.size }}
        />
      ))}
    </div>
  );
};
