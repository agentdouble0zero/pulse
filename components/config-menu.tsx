'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Settings } from 'lucide-react'

export function ConfigMenu() {
  const [timeFrame, setTimeFrame] = useState('7')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Open configuration menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Configuration</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Time Frame</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={timeFrame} onValueChange={setTimeFrame}>
          <DropdownMenuRadioItem value="1">1 Day</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="7">7 Days</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="30">30 Days</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

