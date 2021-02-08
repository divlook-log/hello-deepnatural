export interface Messages {
    id: number
    isMyMsg: boolean
    body: string
    createdAt: string
}

export interface SelectableLabel {
    topic: string
    description: string
    important: boolean
}

export interface TaskAssign {
    title: string
    body: string
    selectableLabels: SelectableLabel[]
}
