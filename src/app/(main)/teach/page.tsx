import CreateClass from '@/features/teach/components/CreateClass'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { CircleCheck } from 'lucide-react'
import { FC } from 'react'

const page: FC<{}> = () => {



  return (
    <Stack gap={12} sx={{ width: "100%", }}>
      <Stack gap={4} sx={{
        pt: 12, px: 4, width: "100%", flexDirection: { xs: "column-reverse", md: "row" }
      }}>
        <Stack sx={{ flex: { xs: 1, md: 0.5 }, alignItems: "flex-end" }}>
          <Stack sx={{ width: { xs: "100%", md: 600 }, gap: 6, }}>
            <Typography sx={({
              fontSize: 60, fontWeight: 600, lineHeight: 1.2, background: "linear-gradient(90deg, #3CC8AF 0%, #3CC8F4 100%)",
              backgroundClip: "text",
              textFillColor: "transparent",
              textDecoration: "none",
            })}>
              Hozd létre első osztályod!
            </Typography>
            <Typography sx={({ fontSize: 20, fontWeight: 500, textAlign: "justify", textWrap: "pretty" })}>
              Szervezd a diákjaidat csoportba, ossz ki szókincs- és kvízfeladatokat, és kövesd nyomon a fejlődésüket egy helyen.
            </Typography>
            <Stack gap={2}>
              <Stack direction="row" gap={2}>
                <CircleCheck color="#3CC8F4" />
                <Typography sx={{ fontSize: 17, fontWeight: 500 }}>Egyéni vagy iskolai osztályok támogatása</Typography>
              </Stack>
              <Stack direction="row" gap={2}>
                <CircleCheck color="#3CC8F4" />
                <Typography sx={{ fontSize: 17, fontWeight: 500 }}>Automatikus feladatszétosztás szógyűjteményekkel</Typography>
              </Stack>
              <Stack direction="row" gap={2}>
                <CircleCheck color="#3CC8F4" />
                <Typography sx={{ fontSize: 17, fontWeight: 500 }}>Haladás és teljesítmény követése vizuálisan</Typography>
              </Stack>
            </Stack>
            <CreateClass />

          </Stack>

        </Stack>
        <Stack sx={{ flex: { xs: 1, md: 0.5 } }}>
          <Box component={"img"} src="/teacher.png" width={{ xs: "100%", md: 500 }} display={{ xs: "none", md: "block" }} />

        </Stack>


      </Stack>

      <Divider flexItem />

    </Stack>
  )
}

export default page