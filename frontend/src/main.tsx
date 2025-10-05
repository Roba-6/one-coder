import './index.css'

import { App, store } from 'one-public-ui'
import i18n from 'one-public-ui/locales/configs'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Route } from 'react-router'

import CategoryEditPage from '@/features/categories/pages/edit-page.tsx'
import CategoryListPage from '@/features/categories/pages/list-page.tsx'
import PostEditPage from '@/features/posts/pages/edit-page.tsx'
import PostListPage from '@/features/posts/pages/list-page.tsx'

import Box from './box.tsx'

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
          adminRouter: (
            <>
              <Route path="categories/edit" element={<CategoryEditPage />} />
              <Route path="categories" element={<CategoryListPage />} />
              <Route path="posts/edit" element={<PostEditPage />} />
              <Route path="posts" element={<PostListPage />} />
              <Route path="ccb" element={<div>{import.meta.env.UI_NAME}</div>} />
            </>
          ),
          publicRouter: <Route path="/aaa" element={<Box />} />,
        }}
      />
    </Provider>
  </StrictMode>
)
