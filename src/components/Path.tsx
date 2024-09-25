import { Breadcrumbs, Typography } from "@mui/material"
import Link from "next/link"
import { FC } from "react"

const Path: FC<{ breadCrumbs: Array<{ href: string, label: string }> }> = ({ breadCrumbs }) => (
    <Breadcrumbs aria-label="breadcrumb" sx={{
        '.MuiBreadcrumbs-ol': {
            flexWrap: 'nowrap'
        },
        '.MuiBreadcrumbs-li': {
            textWrap: 'nowrap'
        },
        '.MuiBreadcrumbs-separator': {
            flexShrink: 0
        },
        '.MuiBreadcrumbs-li:not(:last-of-type)': {
            overflow: 'hidden'
        }

    }}>
        {breadCrumbs.map((breadCrumb, index) => index !== breadCrumbs.length - 1 ? (
            <Typography
                key={index}
                component={Link}
                href={breadCrumb.href}
                prefetch={false}
                shallow={true}
                sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
            >
                {breadCrumb.label}
            </Typography>
        ) : (
            <Typography key={index} sx={{ fontWeight: 700 }}>
                {breadCrumb.label}
            </Typography>
        ))}
    </Breadcrumbs>
)

export default Path