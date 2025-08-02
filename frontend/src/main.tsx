import './index.css'

import { App } from 'one-public-ui'
import { store } from 'one-public-ui'
import i18n from 'one-public-ui/locales/configs'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Route } from 'react-router'

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
      <div>{import.meta.env.UI_NAME}</div>
      <App>
        <Route path="/aaa" element={<Box />} />
      </App>
    </Provider>
  </StrictMode>
)
