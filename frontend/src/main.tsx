import './index.css'

import { App, store } from 'one-public-ui'
import i18n from 'one-public-ui/locales/configs'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Route } from 'react-router'

import CategoryEditPage from '@/features/admin/categories/pages/edit-page'
import CategoryListPage from '@/features/admin/categories/pages/list-page'
import PostEditPage from '@/features/admin/posts/pages/edit-page'
import PostListPage from '@/features/admin/posts/pages/list-page'
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
          default: <HomePage />,
          adminRouter: (
            <>
              <Route path="categories/edit" element={<CategoryEditPage />} />
              <Route path="categories" element={<CategoryListPage />} />
              <Route path="posts/edit" element={<PostEditPage />} />
              <Route path="posts" element={<PostListPage />} />
              <Route path="ccb" element={<div>{import.meta.env.UI_NAME}</div>} />
            </>
          ),
          publicRouter: (
            <>
              <Route path="posts/:id" element={<PostPage />} />
              <Route path="/aaa" element={<Box />} />
            </>
          ),
        }}
      />
    </Provider>
  </StrictMode>
)
