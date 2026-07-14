import { Divider, Stack } from '@mui/material'
import { env } from 'process'
import { FC, Fragment } from 'react'
import CredentialsSingIn from './CredentialsSingIn'
import GoogleSignInButton from './GoogleSignInButton'

const LoginForm: FC<{ redirect?: string }> = ({ redirect }) => (
    <Stack sx={{ width: 300, maxWidth: "100%", gap: 3 }}>
        {env.VERCEL_ENV !== "preview" && (
            <Fragment>
                <GoogleSignInButton redirect={redirect} />
                <Divider flexItem>vagy</Divider>
            </Fragment>

        )}
        <CredentialsSingIn redirect={redirect} />
    </Stack>
)


export default LoginForm