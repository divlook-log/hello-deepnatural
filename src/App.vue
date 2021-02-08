<template>
    <div class="App">
        <DNHeader />

        <main>
            <router-view />
        </main>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DNHeader from '@/components/DNHeader.vue'

@Component({
    components: {
        DNHeader,
    },
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/style/constant.scss';

.App {
    display: flex;
    flex-direction: column;
    height: 100%;

    main {
        flex: 1;
    }
}
</style>
