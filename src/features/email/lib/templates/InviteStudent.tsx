import { InviteType } from "@/features/teach/types"

export type InviteStudentEmailProps = {
    className: string
    inviteUrl: string
    teacherName?: string
    classCode?: string
    recipientName?: string
    type: InviteType
}

const InviteStudentLight = ({
    className,
    inviteUrl,
    teacherName = "A tanárod",
    type,
    classCode,
    recipientName,
}: InviteStudentEmailProps) => {
    return (
        <html>
            <head>
                <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body style={{ margin: 0, padding: 0, backgroundColor: "#F3F2F8", fontFamily: "Arial, Helvetica, sans-serif", color: "#1f2937" }}>
                <div style={{ display: "none", overflow: "hidden", lineHeight: "1px", opacity: 0, maxHeight: 0, maxWidth: 0 }}>
                    {teacherName} meghívott a(z) {className} osztályhoz a Lexo felületen.
                </div>

                <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={{ width: "100%", backgroundColor: "#F3F2F8" }}>
                    <tbody>
                        <tr>
                            <td align="center" style={{ padding: "24px 12px" }}>
                                <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={{ width: "100%", maxWidth: "560px", backgroundColor: "#FFFFFF", borderRadius: "20px", overflow: "hidden", border: "1px solid #DCDAE7" }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ padding: "32px 24px 24px" }}>
                                                <table role="presentation" width="100%" cellPadding={0} cellSpacing={0}>
                                                    <tbody>
                                                        <tr>
                                                            <td align="center" style={{ textAlign: "center" }}>
                                                                <div style={{ width: "72px", height: "72px", lineHeight: "72px", borderRadius: "999px", backgroundColor: "#3CC8F4", color: "#FFFFFF", fontSize: "30px", fontWeight: 800, textAlign: "center", margin: "0 auto 24px" }}>8</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center" style={{ textAlign: "center" }}>
                                                                <div style={{ margin: "0 0 12px", color: "#6b7280", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                                                                    {teacherName} meghívott egy osztályba
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center" style={{ textAlign: "center" }}>
                                                                <h1 style={{ margin: "0 auto 16px", maxWidth: "420px", color: "#1f2937", fontSize: "30px", lineHeight: 1.35, fontWeight: 700 }}>
                                                                    Csatlakozás a(z) <span style={{ fontWeight: 800, color: "#22aad3" }}>{className}</span> osztályhoz mint {type === "student" ? "tanuló" : "tanár"}.
                                                                </h1>
                                                            </td>
                                                        </tr>
                                                        {recipientName ? (
                                                            <tr>
                                                                <td align="center" style={{ textAlign: "center" }}>
                                                                    <p style={{ margin: "0 auto 12px", maxWidth: "420px", color: "#1f2937", fontSize: "16px", lineHeight: 1.75, fontWeight: 500 }}>
                                                                        {recipientName}, elfogadás után azonnal beléphetsz a közös tanulási térbe és látni fogod a neked kiosztott feladatokat.
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        ) : null}
                                                        <tr>
                                                            <td align="center" style={{ textAlign: "center" }}>
                                                                <p style={{ margin: "0 auto", maxWidth: "420px", color: "#6b7280", fontSize: "14px", lineHeight: 1.7 }}>
                                                                    A meghívás elfogadása után látni fogod az osztályhoz tartozó feladatokat és a közös tanulási teret.
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ padding: "24px 0 8px", textAlign: "center" }}>
                                                                <table role="presentation" cellPadding={0} cellSpacing={0} style={{ margin: "0 auto", width: "84px", tableLayout: "fixed", borderCollapse: "collapse" }}>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width="28" style={{ width: "28px", padding: 0, overflow: "visible" }}>
                                                                                <div style={{ width: "34px", height: "34px", lineHeight: "34px", borderRadius: "999px", textAlign: "center", verticalAlign: "middle", fontSize: "13px", fontWeight: 700, border: "2px solid #FFFFFF", backgroundColor: "#3CC8F4", color: "#FFFFFF" }}>L</div>
                                                                            </td>
                                                                            <td width="28" style={{ width: "28px", padding: 0, overflow: "visible" }}>
                                                                                <div style={{ width: "34px", height: "34px", lineHeight: "34px", borderRadius: "999px", textAlign: "center", verticalAlign: "middle", fontSize: "13px", fontWeight: 700, border: "2px solid #FFFFFF", backgroundColor: "#3CC8AF", color: "#FFFFFF" }}>X</div>
                                                                            </td>
                                                                            <td width="28" style={{ width: "28px", padding: 0, overflow: "visible" }}>
                                                                                <div style={{ width: "34px", height: "34px", lineHeight: "34px", borderRadius: "999px", textAlign: "center", verticalAlign: "middle", fontSize: "13px", fontWeight: 700, border: "2px solid #FFFFFF", backgroundColor: "#F3F2F8", color: "#676284" }}>8</div>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ padding: "16px 0 24px" }}>
                                                                <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td align="center" style={{ backgroundColor: "#1f2937", borderRadius: "12px" }}>
                                                                                <a href={inviteUrl} style={{ display: "block", padding: "14px 20px", color: "#FFFFFF", textDecoration: "none", fontSize: "16px", lineHeight: "20px", fontWeight: 700, borderRadius: "12px" }}>
                                                                                    Meghívó elfogadása
                                                                                </a>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ paddingBottom: "8px" }}>
                                                                <p style={{ margin: "0 0 8px", color: "#6b7280", fontSize: "14px", lineHeight: 1.7 }}>
                                                                    Ha a gomb nem működik, másold be ezt a linket a böngészőbe:
                                                                </p>
                                                                <p style={{ margin: 0, color: "#28b59c", fontSize: "14px", lineHeight: 1.6, wordBreak: "break-all" }}>{inviteUrl}</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ padding: "20px 24px 24px", backgroundColor: "#F8F7FC", borderTop: "1px solid #E6E3EF", textAlign: "center" }}>
                                                <p style={{ margin: "0 0 6px", color: "#6b7280", fontSize: "13px", lineHeight: 1.6 }}>
                                                    Ezt az megíhvó E-mailt a Lexo küldte. Ha nem vártál ilyen üzenetet, nyugodtan figyelmen kívül hagyhatod.

                                                </p>

                                                <div style={{ paddingTop: "18px", textAlign: "center" }}>
                                                    <img src="https://htwdwjmewfxwsblmlfei.supabase.co/storage/v1/object/public/static/Lexo.svg" width={100} />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </html>
    )
}

export default InviteStudentLight