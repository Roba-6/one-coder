import '../styles/post-page.css'

import {
  CommonResponse,
  getApi,
  loadComplete,
  setUrlParams,
  useAppDispatch,
  useGoogleAnalytics4,
} from 'one-public-ui'
import React, { useEffect } from 'react'
import Markdown from 'react-markdown'
import { useParams } from 'react-router'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import { CONSTANT } from '@/common/constants.ts'
import type { Post } from '@/features/admin/posts/types/post'

const PostPage = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const [postData, setPostData] = React.useState<Post>()

  useGoogleAnalytics4()

  useEffect(() => {
    console.log(id)
    getData()
    dispatch(loadComplete())
  }, [id, dispatch])

  const getData = () => {
    getApi<CommonResponse>(setUrlParams(CONSTANT.API_URL.POST_ID, id), {}).then(
      // getApi<CommonResponse>(CONSTANT.API_URL.POST, { targetId: id }).then(
      (res: CommonResponse) => {
        setPostData(res.results as Post)
      }
    )
  }

  return (
    <div className="single-page">
      <div className="container mx-auto min-h-[100vh]">
        <h1 className="post-title">{postData?.title}</h1>
        <p className="post-overview">{postData?.overview}</p>
        <div className="post-content">
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
        </div>
      </div>
    </div>
  )
}

export default PostPage
