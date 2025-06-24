import SA_LangDetection from "@/features/term/actions/langDetection";


const langDetector = async (text: string) => {

    const res = await SA_LangDetection(text)
    if (res.statusCode !== 200) throw new Error(res.error)
    return res.payload.lang

};

export default langDetector