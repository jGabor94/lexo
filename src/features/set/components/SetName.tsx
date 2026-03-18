"use client"

import { FC } from 'react'
import useSet from '../hooks/useSet'

const SetName: FC<{}> = () => {

    const { set } = useSet()

    return <>{set.name}</>

}

export default SetName