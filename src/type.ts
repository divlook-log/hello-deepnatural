export interface Messages {
    id: number
    isMyMsg: boolean
    body: string
    createdAt: string
}

export interface TaskAssign {
    title: string
    body: string
    messages: Messages[]
}
