<template>
    <div class="DNHeader">
        <img
            src="@/assets/img/logo-white@2x.png"
            alt="logo"
            width="182px"
        />

        <div class="UserInfo">
            <div class="MyCoin">
                <img
                    src="@/assets/img/header/ic-24-coin@2x.png"
                    alt="coin"
                    width="24px"
                />
                <span>21,000</span>
            </div>

            <div class="Avatar">
                <img
                    src="@/assets/img/header/avatar@2x.png"
                    alt="avatar"
                    width="100%"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DNHeader extends Vue {
    @Prop() private msg!: string
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.DNHeader {
    height: 64px;
    background-color: $color-martinique;
    display: flex;
    padding: 0 20px;
    align-items: center;
    justify-content: space-between;

    .UserInfo {
        display: flex;
        align-items: center;
    }

    .MyCoin {
        min-width: 100px;
        height: 24px;
        border-radius: 20px;
        background-color: rgba($color: #fff, $alpha: 0.08);
        padding: 8px;
        display: inline-flex;
        align-items: center;
        margin-right: 20px;
        color: #fff;
        font-weight: 600;

        img {
            display: block;
            margin-right: 8px;
        }
    }

    .Avatar {
        width: 40px;
        height: 40px;

        img {
            display: block;
        }
    }
}
</style>
