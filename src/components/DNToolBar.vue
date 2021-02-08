<template>
    <div class="DNToolBar">
        <div
            class="Btn"
            :class="{
                disabled: prevDisabled,
            }"
            @click="() => onClick('prev')"
        >
            <img
                src="@/assets/img/toolbar/ic-24-m-prev-w@2x.png"
                alt="avatar"
                width="24px"
            />
            PREV
        </div>

        <div
            class="Btn"
            :class="{
                disabled: nextDisabled,
            }"
            @click="() => onClick('next')"
        >
            <img
                src="@/assets/img/toolbar/ic-24-m-next-w@2x.png"
                alt="avatar"
                width="24px"
            />
            NEXT
        </div>

        <div
            class="Btn"
            :class="{
                disabled: submitDisabled,
            }"
            @click="() => onClick('submit')"
        >
            <img
                src="@/assets/img/toolbar/ic-24-m-finish-w@2x.png"
                alt="avatar"
                width="24px"
            />
            SUBMIT
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DNToolBar extends Vue {
    @Prop({
        type: Boolean,
        default: false,
    })
    readonly prevDisabled!: boolean

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly nextDisabled!: boolean

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly submitDisabled!: boolean

    onClick(type: 'prev' | 'next' | 'submit') {
        switch (type) {
            case 'prev': {
                if (this.prevDisabled) return
                break
            }

            case 'next': {
                if (this.nextDisabled) return
                break
            }

            case 'submit': {
                if (this.submitDisabled) return
                break
            }
        }

        this.$emit(type)
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.DNToolBar {
    height: 64px;
    background-color: rgba($color: $color-steel-gray, $alpha: 0.98);
    box-shadow: 0 -4px 8px rgba($color: #000, $alpha: 0.1), 0  1px 0 rgba($color: #000, $alpha: 0.5);
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;

    .Btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 64px;
        height: 64px;
        color: #fff;
        font-size: 11px;
        font-weight: 600;
        line-height: 12px;
        margin-right: 20px;

        img {
            display: block;
            margin: 10px auto;
        }

        &:not(.disabled) {
            cursor: pointer;
        }

        &.disabled {
            opacity: 0.4;
        }

        &:last-child {
            margin-right: 0;
            margin-left: 80px;
        }
    }
}
</style>
