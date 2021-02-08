<template>
    <div class="LabelingTool">
        <div class="Panels">
            <!-- Left -->
            <div class="PanelItem Panel-Left">
                <div class="card">
                    <div class="card-header">
                        <sub>
                            <strong>TASK Instruction</strong>
                        </sub>
                        <br />
                        <h3>
                            <strong>{{ info.title || '...' }}</strong>
                        </h3>
                    </div>

                    <div class="card-body">
                        <p>{{ info.body }}</p>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h3>
                            <strong>Good Job!</strong>
                        </h3>
                        <p>
                            I think AI will be smart soon :)<br />
                            <br />
                            <DNProgressBar :completed="completedMyMsgCount" :total="myMsgCount" />
                        </p>
                    </div>
                </div>
            </div>

            <!-- Center -->
            <div class="PanelItem Panel-Center">
                <div class="card">
                    <div class="card-body">
                        <template v-for="(msg, index) in info.messages">
                            <DNMessage
                                :key="index"
                                :id="msg.id"
                                :body="msg.body"
                                :created-at="msg.createdAt"
                                :my-msg="msg.isMyMsg"
                                :selected="state.selectedMsgIndex === index"
                                @click="() => onClickMsg(msg, index)"
                            />
                        </template>
                    </div>
                </div>
            </div>

            <!-- Right -->
            <div class="PanelItem Panel-Right">
                <div class="card">
                    <div class="card-header">
                        <h3>SELECTABLE LABELS</h3>
                        <p>{{ info.labelDescription }}</p>
                    </div>

                    <DNTable
                        :head="['TOPIC', 'DESCRIPTION']"
                        :body="info.selectableLabels"
                        :active-id="activeLabelId"
                        @click="(label) => onClickLabel(label)"
                    />
                </div>
            </div>
        </div>

        <DNToolBar
            :prev-disabled="prevMyMsgIndex === -1"
            :next-disabled="nextMyMsgIndex === -1"
            :submit-disabled="!isFinish"
            @prev="movePrevMsg"
            @next="moveNextMsg"
            @submit="submit"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DNProgressBar from '@/components/DNProgressBar.vue'
import DNMessage from '@/components/DNMessage.vue'
import DNTable from '@/components/DNTable.vue'
import DNToolBar from '@/components/DNToolBar.vue'
import { Message, TaskAssign, SelectableLabel } from '@/type'

@Component({
    components: {
        DNProgressBar,
        DNMessage,
        DNTable,
        DNToolBar,
    },
})
export default class LabelingTool extends Vue {
    info: TaskAssign = {
        title: '',
        body: '',
        messages: [],
        labelDescription: '',
        selectableLabels: [],
    }

    state = {
        selectedMsgIndex: -1,
        taskId: 1,
    }

    get myMsgs() {
        return this.info.messages.filter((row) => row.isMyMsg)
    }

    get myMsgCount() {
        return this.myMsgs.length
    }

    get completedMyMsgs() {
        return this.myMsgs.filter(row => row.labelId)
    }

    get completedMyMsgCount() {
        return this.completedMyMsgs.length
    }

    get selectedMsg() {
        const index = this.state.selectedMsgIndex

        if (index === -1) {
            return null
        }

        return this.info.messages[index]
    }

    get prevMyMsgIndex() {
        const messages = this.info.messages

        let index = this.state.selectedMsgIndex

        if (index === -1) {
            return -1
        }

        for (index--; index >= 0; index--) {
            const msg = messages[index]

            if (msg.isMyMsg) {
                return index
            }
        }

        return -1
    }

    get nextMyMsgIndex() {
        const messages = this.info.messages
        const len = messages.length

        let index = this.state.selectedMsgIndex

        for (index++ ; index < len; index++) {
            const msg = messages[index]

            if (msg.isMyMsg) {
                return index
            }
        }

        return -1
    }

    get activeLabelId() {
        const labelId = this.selectedMsg?.labelId ?? 0

        return labelId
    }

    get isFinish() {
        if (!this.myMsgCount) return false
        return this.completedMyMsgCount === this.myMsgCount
    }

    mounted() {
        this.getTaskAssignApi()
    }

    async getTaskAssignApi(taskId = this.state.taskId) {
        if (taskId > 2) {
            taskId = 1
        }

        if (this.state.taskId !== taskId) {
            this.state.taskId = taskId
        }

        try {
            const res = await fetch(`/api/task/assign/${taskId}.json`)

            if (!res.ok) {
                throw new Error('Network response was not ok.')
            }

            const data: TaskAssign = await res.json()

            data.messages = data.messages.map(msg => {
                if (!msg.labelId) msg.labelId = 0
                return msg
            })

            this.info = data
        } catch (error) {
            console.error(error)
        }
    }

    async sendTaskResultApi() {
        const { taskId } = this.state

        const body = this.myMsgs.map(msg => {
            const { id, labelId } = msg

            return {
                msgId: id,
                labelId,
            }
        })

        console.log(`POST /task/result/${taskId}`, body)

        this.$store.commit('increaseMyCoin', 10000)
        this.state.selectedMsgIndex = -1
        this.getTaskAssignApi(this.state.taskId + 1)
    }

    onClickMsg(msg: Message, index: number) {
        if (!msg.isMyMsg) {
            return
        }

        if (this.state.selectedMsgIndex === index) {
            this.state.selectedMsgIndex = -1
            return
        }

        this.state.selectedMsgIndex = index
    }

    onClickLabel(label: SelectableLabel) {
        if (!this.selectedMsg) {
            return
        }

        const prevLabelId = this.selectedMsg.labelId

        this.selectedMsg.labelId = label.id

        if (prevLabelId === 0) {
            this.moveNextMsg()
        }
    }

    movePrevMsg() {
        if (this.prevMyMsgIndex !== -1) {
            this.state.selectedMsgIndex = this.prevMyMsgIndex
        }
    }

    moveNextMsg() {
        if (this.nextMyMsgIndex !== -1) {
            this.state.selectedMsgIndex = this.nextMyMsgIndex
        }
    }

    submit() {
        if (!this.isFinish) {
            return
        }

        this.sendTaskResultApi()
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.LabelingTool {
    background-color: $color-steel-gray;
    height: 100%;
    display: flex;

    .Panels {
        flex: 1;
        padding: 10px;
        display: flex;
        flex-flow: wrap;
        margin-bottom: 64px;

        .PanelItem {
            margin-right: 10px;

            & > .card {
                margin-bottom: 10px;
            }

            &.Panel-Left {
                width: 340px;
            }

            &.Panel-Center {
                min-width: 300px;
                flex: 1;
                height: 100%;

                .card {
                    max-height: 100%;
                    overflow: auto;

                    .card-body {
                        padding: 10px 0;
                    }
                }
            }

            &.Panel-Right {
                width: 430px;
                height: 100%;
                margin-right: 0;

                .card {
                    display: flex;
                    flex-direction: column;
                    height: 100%;

                    > div:last-child {
                        flex: 1;
                    }
                }
            }
        }
    }
}

@media (max-width: 1200px) {
    .LabelingTool {
        .Panels {
            .PanelItem.Panel-Right {
                width: 100%;
            }
        }
    }
}

@media (max-width: 800px) {
    .LabelingTool {
        .Panels {
            .PanelItem.Panel-Left {
                width: 100%;
            }
        }
    }
}
</style>
