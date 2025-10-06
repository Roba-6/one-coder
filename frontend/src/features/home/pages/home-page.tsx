import { CommonResponse, getApi } from 'one-public-ui'
import { loadComplete } from 'one-public-ui/common/app-slice'
import { useAppDispatch } from 'one-public-ui/common/hooks/use-store'
import { setUrlParams } from 'one-public-ui/lib/utils'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router'

import { CONSTANT } from '@/common/constants.ts'
import type { Post } from '@/features/admin/posts/types/post'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const [postData, setPostData] = React.useState<Post[]>([])

  useEffect(() => {
    getData()
    dispatch(loadComplete())
  }, [dispatch])

  const getData = () => {
    getApi<CommonResponse>(CONSTANT.API_URL.POST, {}).then((res: CommonResponse) => {
      setPostData(res.results as Post[])
    })
  }

  return (
    <div className="single-page">
      <div className="container mx-auto min-h-[100vh]">
        <ul>
          {postData.map((post) => (
            <li key={post.id}>
              <NavLink to={setUrlParams(CONSTANT.ROUTE_URL.POST_ID, post.id)}>
                {post.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HomePage
