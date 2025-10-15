import { CircleChevronRight } from 'lucide-react'
import {
  CommonResponse,
  getApi,
  loadComplete,
  setUrlParams,
  useAppDispatch,
} from 'one-public-ui'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router'

import { CONSTANT } from '@/common/constants'
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
        <ul className="py-32 px-12">
          {postData.map((post: Post) => (
            <li key={post.id}>
              <NavLink to={setUrlParams(CONSTANT.ROUTE_URL.POST_ID, post.id)}>
                <CircleChevronRight size={14} className="me-1 inline" />
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
