"use client"
import { DATA } from '@/data/resume'
import { motion, AnimatePresence } from 'motion/react'
import React, { useState, useEffect, useMemo } from 'react'

const Badge = () => {
  const items = useMemo(() => {
    return DATA.whoIam
      .flatMap(item => item.split(',').map(s => s.trim()))
      .filter(Boolean);
  }, []);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items]);

  const currentItem = items[index] || "";

  if (items.length === 0) return null;

  return (
      <motion.div 
      className="flex  select-none">
      <AnimatePresence mode="wait">
      <motion.div
        layout
        className=" text-neutral-600 dark:text-neutral-400 rounded-md flex items-center justify-center px-2 py-1 border border-solid border-neutral-200 dark:border-neutral-800 w-auto h-fit overflow-hidden"
      >
      <AnimatePresence mode="wait">
          <motion.span
            key={currentItem}
            initial={{ opacity: 0, y: -18 ,filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0 ,filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 18 }}
            transition={{
            duration:1,
            ease:'easeInOut'
            }}
            className="text-sm font-medium tracking-tight whitespace-nowrap"
          >
            {currentItem}
          </motion.span>
      </AnimatePresence>
      </motion.div>
        </AnimatePresence>
    </motion.div>
  )
}

export default Badge