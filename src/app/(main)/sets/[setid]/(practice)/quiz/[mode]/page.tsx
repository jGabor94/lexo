
import QuizMain from "@/features/practice/components/quiz/QuizMain";
import { PracticeMode } from "@/features/practice/types";
import { FC } from "react";


const Page: FC<{ params: Promise<{ mode: PracticeMode }> }> = async ({ params }) => {

    const { mode } = await params

    return (

        <QuizMain mode={mode} />
    )
};

export default Page;
