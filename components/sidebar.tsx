'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

const topics = [
  'Technology',
  'Science',
  'Politics',
  'Business',
  'Health',
  'Entertainment',
  'Sports',
  'Environment',
]

export function Sidebar() {
  const [selectedTopic, setSelectedTopic] = useState(topics[0])

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Topics</h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {topics.map((topic) => (
            <Button
              key={topic}
              variant="ghost"
              className={cn(
                'w-full justify-start mb-1',
                selectedTopic === topic && 'bg-gray-100 dark:bg-gray-700'
              )}
              onClick={() => setSelectedTopic(topic)}
            >
              {topic}
            </Button>
          ))}
        </ScrollArea>
      </div>
    </div>
  )
}

