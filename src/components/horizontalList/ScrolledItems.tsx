"use client"

import SetCard from '@/features/set/components/ui/SetCard'
import { SetListItem } from '@/features/set/types'
import { Box, IconButton, Stack } from '@mui/material'
import type { } from '@mui/material/themeCssVarsAugmentation'
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'
import { FC, useEffect, useRef, useState } from 'react'

const ScrolledItems: FC<{ sets: SetListItem[] }> = ({ sets }) => {

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const [isAtStart, setIsAtStart] = useState(false);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setIsAtStart(scrollLeft === 0);
            setIsAtEnd(scrollLeft + clientWidth + 1 >= scrollWidth);
        }
    };

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollAmount = clientWidth / 2; // lépés mérete (felezett szélesség)

            scrollContainerRef.current.scrollTo({
                left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", checkScrollPosition);
            checkScrollPosition(); // Azonnal frissítjük, hogy az alapértelmezett pozíció is helyes legyen
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", checkScrollPosition);
            }
        };
    }, []);

    return (
        <Box sx={(theme) => ({
            position: "relative",
            "&::before": !isAtStart && {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: 150,
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none',
                boxShadow: `inset 120px 0px 50px -38px ${theme.vars.palette.background.default}`
            },
            "&::after": !isAtEnd && {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                width: 150,
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none',
                boxShadow: `inset -120px 0px 50px -38px ${theme.vars.palette.background.default}`
            },
        })}>
            <Stack position="relative" direction="row" alignItems="center">
                {!isAtStart && (
                    <IconButton onClick={() => scroll("left")}
                        sx={{
                            position: "absolute",
                            left: 0,
                            zIndex: 100,

                        }}>
                        <ArrowBigLeft strokeWidth={1} size={50} />
                    </IconButton>
                )}

                <Stack direction="row" flexWrap="nowrap" py={1} sx={{
                    overflowX: "scroll",
                    "::-webkit-scrollbar": {
                        display: "none"
                    },
                    position: "relative",
                    scrollSnapType: 'x mandatory',
                }} ref={scrollContainerRef} gap={3}>
                    {sets.map((set) => (
                        <SetCard key={set.id} {...{ set, href: `/sets/${set.id}` }} />
                    ))}

                </Stack>
                {!isAtEnd && (
                    <IconButton onClick={() => scroll("right")}
                        sx={{
                            position: "absolute",
                            right: 0,
                            zIndex: 100,

                        }}>
                        <ArrowBigRight strokeWidth={1} size={50} />
                    </IconButton>
                )}

            </Stack>
        </Box>

    )
}

export default ScrolledItems