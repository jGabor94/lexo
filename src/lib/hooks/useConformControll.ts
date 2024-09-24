import { useState } from "react"

const useConfirmControll = () => {

    const [open, setOpen] = useState(false)

    const [promise, setPromise] = useState<{
        resolve: (value: unknown) => void,
        reject: (reason?: unknown) => void
    } | null>(null)

    const dialogProcess = () => new Promise((resolve, reject) => {
        setOpen(true)
        setPromise({ resolve, reject })
    })

    return { promise, dialogProcess, setOpen, open }
}

export default useConfirmControll