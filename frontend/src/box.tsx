import { getLocalMessage, loadComplete, useAppDispatch } from 'one-public-ui'
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
