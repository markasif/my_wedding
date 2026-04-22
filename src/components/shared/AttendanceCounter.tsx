"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export function AttendanceCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Initial Fetch
    const fetchInitialCount = async () => {
      const { data, error } = await supabase
        .from('rsvps')
        .select('guests_count')
        .eq('attending', true);

      if (error) {
        console.error("Error fetching count:", error);
        return;
      }

      const total = data.reduce((acc, curr) => acc + (curr.guests_count || 0), 0);
      setCount(total);
      setIsVisible(true);
    };

    fetchInitialCount();

    // 2. Real-time Subscription
    const channel = supabase
      .channel('rsvp-changes')
      .on(
        'postgres_changes',
        { event: '*', table: 'rsvps', schema: 'public' },
        () => {
          // Re-fetch count on any change for accuracy
          fetchInitialCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (!isVisible || count === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-3 px-5 py-2 bg-burgundy/5 border border-gold/20 rounded-full backdrop-blur-sm shadow-sm"
    >
   
      <div className="flex items-baseline gap-1.5">
        <AnimatePresence mode="wait">
          <motion.span
            key={count}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="font-serif text-lg font-bold text-burgundy transition-all duration-500"
          >
            {count}
          </motion.span>
        </AnimatePresence>
        <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-gold font-bold">
          {count === 1 ? 'Guest' : 'Guests'} Attending
        </span>
      </div>
    </motion.div>
  );
}
