<template>
    <div
        class="DNMessage"
        :class="{
            'DNMessage-MyMsg': myMsg,
            'DNMessage-Active': active,
            'DNMessage-Selected': selected,
        }"
    >
        <template v-if="!myMsg">
            <div class="Avatar" />
        </template>
        <div class="Body" @click="onClick">{{ body }}</div>
        <div class="Created">{{ createdAt }}</div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DNMessage extends Vue {
    @Prop({
        required: true,
    })
    readonly id!: number

    @Prop({
        required: true,
    })
    readonly myMsg!: boolean

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly active!: boolean

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly selected!: boolean

    @Prop({
        default: '',
    })
    readonly body!: string

    @Prop({
        required: true,
    })
    readonly createdAt!: string

    onClick(e: unknown) {
        this.$emit('click', e)
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.DNMessage {
    display: flex;
    padding: 6px 16px;

    .Avatar {
        width: 38px;
        height: 38px;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 10px;
    }

    .Body {
        font-size: 15px;
        font-weight: 500;
        line-height: 24px;
        color: $color-regent-gray;
        background-color: rgba($color: $color-regent-gray, $alpha: 0.2);
        white-space: pre-line;
        border-radius: 4px;
        padding: 7px 16px;
        max-width: 160px;
    }

    .Created {
        color: $color-regent-gray;
        font-size: 9px;
        line-height: 14px;
        margin: 0 4px;
        display: flex;
        align-items: flex-end;
    }

    &.DNMessage-MyMsg {
        flex-direction: row-reverse;
    }

    &.DNMessage-Active {
        .Body {
            background-color: $color-pickled-bluewood;
            color: $color-aqua;
        }
    }

    &.DNMessage-Selected {
        background-color: rgba($color: #fff, $alpha: 0.04);
    }
}
</style>
