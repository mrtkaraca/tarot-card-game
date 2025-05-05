export default undefined

export type TTarotGameSelectionSectionProps = {
    selection:{
        id:string | number,
        name:string
    }
    isSelected:boolean
    selectionOpacitiyColor:string
    handleOnSelect:()=>void
}

export type TTarotGameSelectionSectionHookProps = Pick<TTarotGameSelectionSectionProps,
    'isSelected' |
    'handleOnSelect'
>