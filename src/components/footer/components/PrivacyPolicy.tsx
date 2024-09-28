"use client"

import useModalControl from "@/lib/hooks/useModalControl";
import { Box, Divider, Link, Modal, Paper, Stack, Typography } from "@mui/material";
import { FC, Fragment } from "react";

const PrivacyPolicy: FC<{}> = () => {

    const { open, handleOpen, handleClose } = useModalControl()

    return (
        <Fragment>
            <Link onClick={handleOpen} sx={{ cursor: "pointer", width: "fit-content", textDecoration: "none", }}>
                Privacy Policy
            </Link>
            <Modal open={open} onClose={handleClose}>
                <Box
                    component={Paper}
                    sx={{
                        boxShadow: 10,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 700,
                        maxWidth: "95%",
                        outline: "none",
                    }}
                >
                    <Stack gap={2} sx={{ p: 2, height: 600, overflowY: "scroll" }}>
                        <Typography fontWeight={600} fontSize={25}>
                            Privacy Policy
                        </Typography>
                        <Divider flexItem />

                        <Typography>
                            Welcome to Lexo! This privacy policy outlines how we collect, use, and protect your personal data when using our language learning platform.
                        </Typography>

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
                                We do not share your personal information with third parties unless necessary for the operation of Lexo or required by law. Your vocabulary collections may be viewed by other users, as per platform functionality.
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

                        <Stack>
                            <Typography fontWeight={600} fontSize={20}>
                                6. Contact
                            </Typography>
                            <Typography>
                                For any privacy-related questions or concerns, feel free to contact us through the provided contact information on the platform.
                            </Typography>
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
                </Box>
            </Modal>
        </Fragment>



    )

}

export default PrivacyPolicy