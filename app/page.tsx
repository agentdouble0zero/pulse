import { Sidebar } from '@/components/sidebar'
import { ArticleList } from '@/components/article-list'
import { ConfigMenu } from '@/components/config-menu'

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Pulse</h1>
            <ConfigMenu />
          </div>
          <ArticleList />
        </div>
      </main>
    </div>
  )
}

