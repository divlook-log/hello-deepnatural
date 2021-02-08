<template>
    <div class="DNTable">
        <div class="TableHead">
            <div class="TableRow">
                <template v-for="(row, key) in head">
                    <div :key="key" class="TableCell">
                        {{ row }}
                    </div>
                </template>
            </div>
        </div>

        <div class="TableBody">
            <template v-for="row in body">
                <div
                    :key="row.id"
                    class="TableRow"
                    :class="{
                        active: activeId === row.id,
                    }"
                    @click="() => onClick(row)"
                >
                    <div class="TableCell" :class="{ bold: row.important }">
                        {{ row.topic }}
                    </div>

                    <div class="TableCell">
                        {{ row.description }}
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { SelectableLabel } from '@/type'

@Component
export default class DNTable extends Vue {
    @Prop({
        type: Array,
        required: true,
    })
    readonly head!: string[]

    @Prop({
        type: Array,
        required: true,
    })
    readonly body!: SelectableLabel[]

    @Prop({
        type: Number,
        default: 0,
    })
    readonly activeId!: number

    onClick(label: SelectableLabel) {
        this.$emit('click', label)
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.DNTable {
    .TableRow {
        padding: 0 20px;
        overflow: hidden;
    }

    .TableCell {
        display: flex;
        align-items: center;
        font-size: 13px;
        text-align: left;
        float: left;

        &:first-child {
            min-width: 130px;
        }
    }

    .TableHead {
        .TableCell {
            line-height: 20px;
            color: rgba($color: #fff, $alpha: 0.5);
            height: 48px;
            font-weight: 400;
        }
    }

    .TableBody {
        .TableRow {
            cursor: pointer;

            .TableCell {
                line-height: 16px;
                color: #fff;
                height: 32px;

                &:first-child {
                    font-weight: 500;
                    padding-right: 6px;

                    &.bold {
                        font-weight: 600;
                    }
                }

                &:last-child {
                    color: $color-regent-gray;
                }
            }

            &.active {
                background-color: $color-pickled-bluewood;
            }
        }
    }
}
</style>
