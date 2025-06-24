'use client'

import useModalControl from '@/hooks/useModalControl'
import { Button } from '@mui/material'
import { FC, Fragment } from 'react'
import { SubmitHandler } from 'react-hook-form'

const CreateClass: FC<{}> = () => {

    const modalControl = useModalControl()


    const submit: SubmitHandler<any> = async (data) => {


        return

    }


    return (
        <Fragment>
            <Button variant="contained" color="button" sx={{ width: "fit-content", fontSize: 20, fontWeight: 400 }} size="large" onClick={modalControl.handleOpen}>Osztály létrehozása</Button>

            {/*<ClassForm modalControl={modalControl} onSubmit={submit} label="Osztály létrehozása" submitLabel='Létrehozás' /> */}

        </Fragment>

    )
}

export default CreateClass


