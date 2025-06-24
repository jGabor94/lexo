import FlashCardMain from "@/features/practice/components/flashCard/FlashCardMain";
import { PracticeMode } from "@/features/practice/types";
import { FC } from "react";


const Page: FC<{ params: Promise<{ mode: PracticeMode }> }> = async ({ params }) => {

    const { mode } = await params

    return (
        <FlashCardMain mode={mode} />
    )
};

export default Page;
