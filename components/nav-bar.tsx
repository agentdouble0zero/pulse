'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'

export function NavBar() {
  return (
    <motion.header 
      className="fixed top-0 w-full z-50 bg-[#000B3D]/80 backdrop-blur-sm border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Pulse
        </Link>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Search className="h-5 w-5" />
          </Button>
          <Button className="bg-[#40F8FF] hover:bg-[#40F8FF]/90 text-[#000B3D] font-semibold">
            Sign In
          </Button>
        </div>
      </nav>
    </motion.header>
  )
}

