import SA_Translate from "@/features/term/actions/translate";

export const hasMultipleWords = (str: string) => str.trim().includes(" ");

const translate = async (from: string, to: string, text: string) => {


    if (from === to) throw new Error('Identical languages inputs')

    const res = await SA_Translate(from, to, text)
    if (res.statusCode !== 200) throw new Error(res.error)

    return res.payload

}

export default translate 