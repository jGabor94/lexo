"use client"

import ModalOverlay from "@/components/ui/ModalOverlay";
import useModalControl from "@/hooks/useModalControl";
import { Divider, Link, Modal, Stack, Typography } from "@mui/material";
import { FC, Fragment } from "react";
import Contact from "./Contact";

const PrivacyPolicy: FC<{}> = () => {

    const { open, handleOpen, handleClose } = useModalControl()

    return (
        <Fragment>
            <Link onClick={handleOpen} sx={{ cursor: "pointer", width: "fit-content", textDecoration: "none", }}>
                Privacy Policy
            </Link>
            <Modal open={open} onClose={handleClose}>
                <ModalOverlay width={700} onClose={handleClose}>
                    <Stack gap={2} sx={{ p: 1 }}>
                        <Typography fontWeight={600} fontSize={25}>
                            Privacy Policy
                        </Typography>
                        <Divider flexItem />
                        <Stack gap={2} sx={{ height: 600, overflowY: "scroll" }}>
                            <Stack>
                                <Typography fontWeight={600} fontSize={20}>
                                    Welcome to Lexo!
                                </Typography>
                                <Typography>
                                    This privacy policy outlines how we collect, use, and protect your personal data when using our language learning platform.
                                </Typography>
                            </Stack>

                            <Stack>
                                <Typography fontWeight={600} fontSize={20}>
                                    1. Collected Information
                                </Typography>
                                <Typography>
                                    When you register on Lexo using your Google account, we collect your name, email address, and profile picture. Additionally, we store the vocabulary collections you create and any progress you make in practice exercises.
                                </Typography>
                            </Stack>

                            <Stack>
                                <Typography fontWeight={600} fontSize={20}>
                                    2. Data Management and Security
                                </Typography>
                                <Typography>
                                    Your personal data is securely stored, and access is limited to authorized personnel who manage the platform. We do not share your data with third parties unless required by law or for operational purposes.
                                </Typography>
                            </Stack>

                            <Stack>
                                <Typography fontWeight={600} fontSize={20}>
                                    3. Cookies and Tracking Technologies
                                </Typography>
                                <Typography>
                                    Lexo uses cookies and other tracking technologies to enhance your experience, manage your session, and track your progress in exercises.
                                </Typography>
                            </Stack>

                            <Stack>
                                <Typography fontWeight={600} fontSize={20}>
                                    4. Data Sharing
                                </Typography>
                                <Typography>
                                    We do not share your personal information with third parties unless necessary for the operation of Lexo or required by law. Your vocabulary collections may be viewed by other usersTable, as per platform functionality.
                                </Typography>
                            </Stack>

                            <Stack>
                                <Typography fontWeight={600} fontSize={20}>
                                    5. User Rights
                                </Typography>
                                <Typography>
                                    You have the right to access, modify, or delete your personal data, including the information provided through Google login. You can adjust your settings or contact us directly for data-related requests.
                                </Typography>
                            </Stack>

                            <Stack gap={1}>
                                <Stack>
                                    <Typography fontWeight={600} fontSize={20}>
                                        6. Contact
                                    </Typography>
                                    <Typography>
                                        If you have any questions or concerns about privacy, please contact us at one of the following:
                                    </Typography>
                                </Stack>
                                <Contact />
                            </Stack>

                            <Stack>
                                <Typography fontWeight={600} fontSize={20}>
                                    7. Updates
                                </Typography>
                                <Typography>
                                    This privacy policy may be updated periodically to reflect changes in our practices or legal requirements. Please revisit this page regularly to stay informed.
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </ModalOverlay>
            </Modal>
        </Fragment>



    )

}

export default PrivacyPolicy