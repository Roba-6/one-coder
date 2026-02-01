import './index.css'

import { App, getAdminPath, i18n, store } from 'one-public-ui'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Route } from 'react-router'

import CategoryEditPage from '@/features/admin/categories/pages/edit-page'
import CategoryListPage from '@/features/admin/categories/pages/list-page'
import AddPostPage from '@/features/admin/posts/pages/add-page'
import PostListPage from '@/features/admin/posts/pages/list-page'
import UpdatePostPage from '@/features/admin/posts/pages/update-page.tsx'
import HomePage from '@/features/home/pages/home-page'
import PostPage from '@/features/home/pages/post-page'

import Box from './box'

i18n.addResources('en', 'translation', {
  abc: 'A bc！',
  bbb: 'What',
})

i18n.addResources('ja', 'translation', {
  abc: 'テストde',
  bbb: '日本語x',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App
        children={{
          // default: <HomePage />,
          adminRouter: (
            <>
              <Route path="categories/edit" element={<CategoryEditPage />} />
              <Route path="categories" element={<CategoryListPage />} />
              <Route path="posts/:id/edit" element={<UpdatePostPage />} />
              <Route path="posts" element={<PostListPage />} />
              <Route path="posts/new" element={<AddPostPage />} />
            </>
          ),
          publicOutlet: (
            <>
              <Route index element={<HomePage />} />
              <Route path="posts/:id" element={<PostPage />} />
              <Route path="/aaa" element={<Box />} />
            </>
          ),
        }}
        menu={{
          blogs: {
            isOpened: false,
            items: [
              {
                name: 'menus.posts',
                url: getAdminPath() + '/posts',
                icon: 'CircleGauge',
              },
            ],
          },
        }}
      />
    </Provider>
  </StrictMode>
)
