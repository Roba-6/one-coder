import { loadComplete } from 'one-public-ui/common/app-slice'
import { useAppDispatch } from 'one-public-ui/common/hooks/use-store'
import { getLocalMessage } from 'one-public-ui/lib/utils'
import * as React from 'react'
import { useEffect } from 'react'

const Box = (): React.ReactNode => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadComplete())
  }, [dispatch])

  return (
    <div>
      {getLocalMessage('abc')} - {getLocalMessage('bbb')}
    </div>
  )
}

export default Box
