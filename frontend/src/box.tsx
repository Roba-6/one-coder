import * as React from "react"
import {getLocalMessage} from "one-public-ui/lib/utils";
import { useAppDispatch } from 'one-public-ui/common/hooks/use-store'
import {useEffect} from "react";
import {loadComplete} from "one-public-ui/common/app-slice"

const Box = (): React.ReactNode => {
      const dispatch = useAppDispatch()

    useEffect(() => {
    dispatch(loadComplete())
  }, [dispatch])

    return <div>{getLocalMessage("abc")} - {getLocalMessage("bbb")}</div>
}

export default Box
