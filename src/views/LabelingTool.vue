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
                        {{ info.body }}
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h3>
                            <strong>Good Job!</strong>
                        </h3>
                        I think AI will be smart soon :)<br />
                        <br />
                        <DNProgressBar :completed="43" :total="51" />
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
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DNProgressBar from '@/components/DNProgressBar.vue'
import DNMessage from '@/components/DNMessage.vue'
import { Messages, TaskAssign } from '@/type'

@Component({
    components: {
        DNProgressBar,
        DNMessage,
    },
})
export default class LabelingTool extends Vue {
    info: TaskAssign = {
        title: '',
        body: '',
        messages: [],
    }

    state = {
        selectedMsgId: 0,
    }

    // - 화면 좌측 패널의 작업 가이드 내용 (제목과 본문)
    // - 화면 중앙의 대화 내용
    // - 화면 우측 패널의 내용 (패널의 제목, 설명, 그리고 레이블 내용)

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

    onClickMsg(msg: Messages) {
        if (msg.isMyMsg) {
            this.state.selectedMsgId = msg.id
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.LabelingTool {
    background-color: $color-steel-gray;
    height: 100%;

    .Panels {
        padding: 10px;
        display: flex;
        flex-flow: wrap;

        .PanelItem {
            margin-right: 10px;

            & > .card {
                margin-bottom: 10px;
            }

            &.Panel-Left {
                max-width: 340px;
            }

            &.Panel-Center {
                min-width: 630px;

                .card-body {
                    padding: 10px 0;
                }
            }
        }
    }
}
</style>
