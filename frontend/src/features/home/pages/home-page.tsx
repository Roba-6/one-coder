import '../styles/home-page.css'

import { completed } from 'one-public-ui'
import { CommonResponse, getApi, setUrlParams, useAppDispatch } from 'one-public-ui'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router'

import { CONSTANT } from '@/common/constants'
import type { Post } from '@/features/admin/posts/types/post'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const [postData, setPostData] = React.useState<Post[]>([])

  useEffect(() => {
    getData()
    completed()
  }, [dispatch])

  const getData = () => {
    getApi<CommonResponse>(CONSTANT.API_URL.POST, {}).then((res: CommonResponse) => {
      setPostData(res.results as Post[])
    })
  }

  return (
    <div className="single-page">
      <div className="container mx-auto min-h-[100vh]">
        <div className="post-card-list">
          <ul className="">
            {postData.map((post: Post) => (
              <li key={post.id}>
                <NavLink to={setUrlParams(CONSTANT.ROUTE_URL.POST_ID, post.id)}>
                  <h4 className="py-2 text-foreground">{post.title}</h4>
                  {post.overview && <p className="text-justify">{post.overview}</p>}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HomePage
