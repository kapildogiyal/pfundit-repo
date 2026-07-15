'use client';

import React from 'react';
import { motion } from 'framer-motion';

type TalkToUsButtonProps = {
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
};

export function TalkToUsButton({ onClick, type = 'button' }: TalkToUsButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className="btn-hero-primary inline-flex items-center justify-center rounded-full px-7 py-3 text-[0.95rem] font-semibold tracking-[-0.01em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0f1b3d]/95"
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
    >
      <span className="relative z-10">Write to Us</span>
    </motion.button>
  );
}

export default TalkToUsButton;