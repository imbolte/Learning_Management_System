import React, { FC } from 'react'
import {Box, Modal} from "@mui/material"

type ComponentProps = {
    setOpen: (open: boolean) => void;
    setRoute?: (route: string) => void;
    refetch?: (() => void) | (() => Promise<void>);
};

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem?: unknown;
    component: React.ComponentType<ComponentProps>;
    setRoute?: (route: string) => void;
    refetch?: (() => void) | (() => Promise<void>);
}

const CustomModel: FC<Props> = ({open, setOpen, setRoute, component:Component,refetch}) => {
  return (
    <Modal 
    open={open}
    onClose={() => setOpen(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
        <Box 
        className="absolute top-[15%] left-[50%] -translate-x-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[12px] shadow p-4 outline-none"
        >
            <Component setOpen={setOpen} setRoute={setRoute} refetch={refetch}/>
        </Box>
    </Modal>
  )
}

export default CustomModel