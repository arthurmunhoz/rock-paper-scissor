export interface ChipData {
    choice: ChoiceData,
    onClick?: Function
}

export interface ChoiceData {
    id: number,
    title: string,
    imageSrc: string,
    color: string,
}