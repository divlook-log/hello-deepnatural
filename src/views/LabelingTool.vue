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
                            <DNProgressBar :completed="43" :total="51" />
                        </p>
                    </div>
                </div>
            </div>

            <!-- Center -->
            <div class="PanelItem Panel-Center">
                <div class="card">
                    <div class="card-body">
                        <template v-for="msg in info.messages">
                            <DNMessage
                                :key="msg.id"
                                :id="msg.id"
                                :body="msg.body"
                                :created-at="msg.createdAt"
                                :my-msg="msg.isMyMsg"
                                :selected="state.selectedMsgId === msg.id"
                                @click="() => onClickMsg(msg)"
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
                        @click="() => {}"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DNProgressBar from '@/components/DNProgressBar.vue'
import DNMessage from '@/components/DNMessage.vue'
import DNTable from '@/components/DNTable.vue'
import { Message, TaskAssign } from '@/type'

@Component({
    components: {
        DNProgressBar,
        DNMessage,
        DNTable,
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
        selectedMsgId: 0,
    }

    mounted() {
        this.getTaskAssignApi()
    }

    async getTaskAssignApi() {
        try {
            const res = await fetch('/api/task-assign.json')

            if (!res.ok) {
                throw new Error('Network response was not ok.')
            }

            const data: TaskAssign = await res.json()

            this.info = data
        } catch (error) {
            console.error(error)
        }
    }

    onClickMsg(msg: Message) {
        if (!msg.isMyMsg) {
            return
        }

        if (this.state.selectedMsgId === msg.id) {
            this.state.selectedMsgId = 0
            return
        }

        this.state.selectedMsgId = msg.id
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

                .card-body {
                    padding: 10px 0;
                }
            }

            &.Panel-Right {
                width: 430px;
                height: 100%;

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
