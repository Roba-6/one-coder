import { CalendarDays, FilePenLine } from 'lucide-react'
import {
  type CommonResponse,
  formatDay,
  getApi,
  loadComplete,
  selectAppSettings,
  type Setting,
  setUrlParams,
  useAppDispatch,
  useAppSelector,
  useGoogleAnalytics4,
} from 'one-public-ui'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Markdown from 'react-markdown'
import { useParams } from 'react-router'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import { CONSTANT } from '@/common/constants'
import type { Post } from '@/features/admin/posts/types/post'

SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('tsx', tsx)

const PostPage = (): React.JSX.Element => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const [postData, setPostData] = React.useState<Post>()
  const appSettings: Setting = useAppSelector(selectAppSettings)

  useGoogleAnalytics4()

  useEffect(() => {
    getData()
    dispatch(loadComplete())
  }, [id, dispatch])

  useEffect(() => {
    if (!postData?.title) return

    document.title = `${postData.title} | ${appSettings.name}`
  }, [appSettings.name, postData?.title])

  const getData = () => {
    getApi<CommonResponse>(setUrlParams(CONSTANT.API_URL.POST_ID, id), {}).then(
      // getApi<CommonResponse>(CONSTANT.API_URL.POST, { targetId: id }).then(
      (res: CommonResponse) => {
        setPostData(res.results as Post)
      }
    )
  }

  return (
    <>
      {postData?.title && (
        <Helmet>
          <meta name="description" content={postData?.overview} />
        </Helmet>
      )}

      <div className="post-panel">
        <header className="post-header">
          <time>
            <small className="me-3">
              <CalendarDays size={16} className="me-1 inline-block align-text-bottom" />
              {formatDay(postData?.createdAt as string, 'date')}
            </small>
            <small>
              <FilePenLine size={16} className="me-1 inline-block align-text-bottom" />
              {formatDay(postData?.updatedAt as string, 'date')}
            </small>
          </time>
          <h1 className="post-title">{postData?.title}</h1>
        </header>
        <p className="post-description">{postData?.overview}</p>
        <article className="post-content">
          <Markdown
            rehypePlugins={[rehypeRaw, remarkGfm]}
            components={{
              code(props) {
                const { children, className } = props
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <SyntaxHighlighter
                    PreTag="div"
                    language={match[1]}
                    style={tomorrow}
                    showLineNumbers={true}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className}>{children}</code>
                )
              },
            }}
          >
            {postData?.content}
          </Markdown>
        </article>
      </div>
    </>
  )
}

export default PostPage
