'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function HoldingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000B3D]">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold mb-6 text-white">Welcome to Pulse</h1>
        <p className="text-xl mb-8 text-blue-100 max-w-md mx-auto">
          Discover AI-powered news summaries and insights from your favorite topics.
        </p>
        <Button className="bg-[#40F8FF] hover:bg-[#40F8FF]/90 text-[#000B3D] font-semibold text-lg px-8 py-3">
          Sign In to Explore
        </Button>
      </motion.div>
    </div>
  )
}

