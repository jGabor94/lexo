import { Box, BoxProps, IconButton, Paper } from '@mui/material';
import { X } from 'lucide-react';
import { forwardRef, ReactNode, Ref } from 'react';

interface Props extends BoxProps {
    onClose: () => any,
    children: ReactNode,
}



const ModalOverlay = forwardRef<Ref<HTMLDivElement>, Props>(({ children, onClose, ...boxProps }, ref) => {
    return (<Box component={Paper} ref={ref} {...boxProps} sx={{
        boxShadow: 10,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: "95%",
        outline: "none",
        p: 2,
        ...boxProps.sx
    }} >
        <IconButton sx={{ position: "absolute", top: 2, right: 2 }} onClick={onClose}>
            <X />
        </IconButton>
        {children}
    </Box>
    )
}

)

ModalOverlay.displayName = "ModalOverlay"

export default ModalOverlay