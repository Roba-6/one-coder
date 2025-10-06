import { CommonResponse, getApi } from 'one-public-ui'
import { loadComplete } from 'one-public-ui/common/app-slice'
import { useAppDispatch } from 'one-public-ui/common/hooks/use-store'
import { setUrlParams } from 'one-public-ui/lib/utils'
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
        <h1>{postData?.title}</h1>
        <p>{postData?.overview}</p>
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
