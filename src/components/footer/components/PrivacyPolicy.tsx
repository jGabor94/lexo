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
            <Link onClick={handleOpen} sx={{ cursor: "pointer", width: "fit-content", textDecoration: "none", fontWeight: 500 }}>
                Adatvédelmi szabályzat
            </Link>
            <Modal open={open} onClose={handleClose}>
                <ModalOverlay width={700} onClose={handleClose}>
                    <Stack gap={2} sx={{ p: 1 }}>
                        <Typography fontWeight={600} fontSize={25}>
                            Adatvédelmi szabályzat
                        </Typography>
                        <Divider flexItem />
                        <Stack gap={2} sx={{ height: 600, overflowY: "scroll" }}>
                            <Stack>
                                <Typography fontWeight={600} fontSize={20}>
                                    Üdvözlünk a Lexo-n!
                                </Typography>
                                <Typography>
                                    Ez az adatvédelmi szabályzat bemutatja, hogyan gyűjtjük, használjuk fel és védjük személyes adataidat nyelvtanuló platformunk használata során.
                                </Typography>
                            </Stack>
                            <Stack>
                                <Typography fontWeight={600} fontSize={20}>
                                    1. Gyűjtött adatok
                                </Typography>
                                <Typography>
                                    Amikor Google-fiókkal regisztrálsz a Lexo-ra, begyűjtjük a nevedet, e-mail címedet és profilképedet. Ezen kívül elmentjük az általad létrehozott szógyűjteményeket és a gyakorlások során elért előrehaladásodat is.
                                </Typography>
                            </Stack>

                            <Stack>
                                <Typography fontWeight={600} fontSize={20}>
                                    2. Adatkezelés és biztonság
                                </Typography>
                                <Typography>
                                    Személyes adataid biztonságosan tároljuk, és csak az arra jogosult munkatársak férhetnek hozzá a platform működtetése érdekében. Harmadik fél számára nem adjuk át adataidat, kivéve, ha jogszabály írja elő, vagy működési okból szükséges.
                                </Typography>
                            </Stack>

                            <Stack>
                                <Typography fontWeight={600} fontSize={20}>
                                    3. Sütik és követési technológiák
                                </Typography>
                                <Typography>
                                    A Lexo sütiket (cookie-kat) és más követési technológiákat használ a felhasználói élmény fokozására, munkameneted kezelésére és a gyakorlási előrehaladásod nyomon követésére.
                                </Typography>
                            </Stack>

                            <Stack>
                                <Typography fontWeight={600} fontSize={20}>
                                    4. Adatmegosztás
                                </Typography>
                                <Typography>
                                    Személyes adataidat nem osztjuk meg harmadik féllel, kivéve ha ez a Lexo működéséhez szükséges vagy jogszabály írja elő. Az általad létrehozott szógyűjtemények más felhasználók számára is láthatók lehetnek, a platform működésének megfelelően.
                                </Typography>
                            </Stack>

                            <Stack>
                                <Typography fontWeight={600} fontSize={20}>
                                    5. Felhasználói jogok
                                </Typography>
                                <Typography>
                                    Jogod van hozzáférni a személyes adataidhoz, módosítani vagy törölni azokat, beleértve a Google-fiókkal megadott információkat is. A beállításaidban vagy közvetlen kapcsolatfelvétellel kérheted adataid módosítását vagy törlését.
                                </Typography>
                            </Stack>

                            <Stack gap={1}>
                                <Stack>
                                    <Typography fontWeight={600} fontSize={20}>
                                        6. Kapcsolat
                                    </Typography>
                                    <Typography>
                                        Ha bármilyen kérdésed vagy aggályod merül fel az adatvédelemmel kapcsolatban, lépj kapcsolatba velünk az alábbi elérhetőségek egyikén:
                                    </Typography>
                                </Stack>
                                <Contact />
                            </Stack>

                            <Stack>
                                <Typography fontWeight={600} fontSize={20}>
                                    7. Frissítések
                                </Typography>
                                <Typography>
                                    Az adatvédelmi szabályzatot időről időre frissíthetjük a gyakorlataink vagy jogszabályi követelmények változásai miatt. Kérjük, rendszeresen nézd meg ezt az oldalt, hogy naprakész maradj.
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