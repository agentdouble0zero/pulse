'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

// Mock data for demonstration
const articles = [
  {
    id: 1,
    title: 'The Future of AI in Healthcare',
    summary: 'AI is revolutionizing healthcare with improved diagnostics and personalized treatments.',
    link: '#',
  },
  {
    id: 2,
    title: 'SpaceX Successfully Launches Starship',
    summary: 'SpaceX achieves a major milestone in space exploration with the successful launch of Starship.',
    link: '#',
  },
  // Add more mock articles as needed
]

export function ArticleList() {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateArticle = () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <Card key={article.id}>
          <CardHeader>
            <CardTitle>{article.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{article.summary}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <a href={article.link} target="_blank" rel="noopener noreferrer">Read More</a>
            </Button>
            <Button onClick={handleGenerateArticle} disabled={isGenerating}>
              {isGenerating ? 'Generating...' : 'Generate Article'}
            </Button>
          </CardFooter>
        </Card>
      ))}
      {isGenerating && (
        <Card>
          <CardHeader>
            <Skeleton className="h-4 w-2/3" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

