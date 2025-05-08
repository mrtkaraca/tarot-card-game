export type TPortalProps = {
    id:string;
    children:React.ReactNode
}

export type PortalHookProps = Pick<TPortalProps,
    'id' |
    'children'
>