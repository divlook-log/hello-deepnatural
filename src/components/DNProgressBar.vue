<template>
    <div class="DNProgressBar">
        <div class="Header">
            Teaching Progress
            <div class="Percentage">
                {{ percentage }}({{ completed }}/{{ total }})
            </div>
        </div>
        <div class="ProgressBar">
            <div
                class="ProgressBar-Fill"
                :style="{
                    width: percentage,
                }"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DNProgressBar extends Vue {
    @Prop({
        default: 0,
    })
    private completed!: number

    @Prop({
        required: true,
    })
    private total!: number

    get percentage() {
        const percent = Math.floor((this.completed / this.total) * 100)

        return `${percent}%`
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.DNProgressBar {
    .Header {
        font-size: 10px;
        font-weight: 400;
        color: rgba($color: #fff, $alpha: 0.5);
        margin-bottom: 8px;
        overflow: hidden;

        .Percentage {
            float: right;
            color: #fff;
            font-weight: 600;
        }
    }
    .ProgressBar {
        height: 8px;
        border-radius: 12px;
        background-color: rgba($color: #000, $alpha: 0.5);

        .ProgressBar-Fill {
            background-color: $color-cerulean;
            border-radius: inherit;
            height: inherit;
        }
    }
}
</style>
