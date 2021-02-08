<template>
    <div class="LabelingTool"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {},
})
export default class LabelingTool extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.LabelingTool {
    background-color: $color-steel-gray;
    height: 100%;
}
</style>
