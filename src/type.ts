export interface Message {
    id: number
    isMyMsg: boolean
    body: string
    createdAt: string
}

export interface SelectableLabel {
    id: number
    topic: string
    description: string
    important: boolean
}

export interface TaskAssign {
    title: string
    body: string
    messages: Message[]
    selectableLabels: SelectableLabel[]
}
