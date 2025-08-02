import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from 'one-public-ui'
import {Provider} from "react-redux";
import {store} from "one-public-ui";
import './index.css'
import { Route } from 'react-router'
import Box from "./box.tsx";
import i18n from "one-public-ui/locales/configs";

i18n.addResources('en', 'translation', {
  abc: 'A bc！',
  bbb: 'What',
});

i18n.addResources('ja', 'translation', {
  abc: 'テストde',
  bbb: '日本語x',
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        <div>{import.meta.env.UI_NAME}</div>
        <App>
            <Route path="/aaa" element={<Box />} />
        </App>
    </Provider>
  </StrictMode>,
)
