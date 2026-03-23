import ClassLanding from '@/features/teach/components/ClassLanding'
import ClassListPreview from '@/features/teach/components/ClassListPreview'
import { getOwnClasses } from '@/features/teach/dal/queries'
import { Stack } from '@mui/material'
import { FC } from 'react'

const page: FC<{}> = async () => {

  const classesResult = await getOwnClasses()
  if (!classesResult.success) return <>Hiba: {classesResult.error.type}</>

  const { data: classes } = classesResult

  return (
    <Stack gap={12} sx={{ width: "100%", }}>
      {classes.length === 0 ? (
        <ClassLanding />
      ) : (
        <ClassListPreview classes={classes} />
      )}


    </Stack>
  )
}

export default page
