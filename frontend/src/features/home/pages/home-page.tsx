import { CalendarDays, SquareCode } from 'lucide-react'
import { completed, formatDay, useGoogleAnalytics4 } from 'one-public-ui'
import {
  type CommonResponse,
  getApi,
  setUrlParams,
  useAppDispatch,
} from 'one-public-ui'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router'

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card'
import { CONSTANT } from '@/common/constants'
import type { Post } from '@/features/admin/posts/types/post'

const HomePage = (): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const [postData, setPostData] = React.useState<Post[]>([])

  useGoogleAnalytics4()

  useEffect(() => {
    getData()
    completed()
  }, [dispatch])

  const getData = () => {
    getApi<CommonResponse>(CONSTANT.API_URL.POST, { orderBy: 'updated_at_desc' }).then(
      (res: CommonResponse) => {
        setPostData(res.results as Post[])
      }
    )
  }

  return (
    <React.Fragment>
      <div className="mx-auto">
        <ul className="card-list">
          {postData.map((post: Post) => (
            <li key={post.id} className="card-item">
              <NavLink to={setUrlParams(CONSTANT.ROUTE_URL.POST_ID, post.id)}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="">
                      <SquareCode className="icon inline-block" />
                      <span className="ms-1 relative top-0.5">{post.title}</span>
                    </CardTitle>
                    <CardDescription className="card-description">
                      {post.overview}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="relative bottom-0 ms-auto">
                    <small>
                      <CalendarDays
                        size={16}
                        className="me-1 inline-block align-text-bottom"
                      />
                      {formatDay(post?.createdAt as string, 'date')}
                    </small>
                  </CardFooter>
                </Card>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  )
}

export default HomePage
