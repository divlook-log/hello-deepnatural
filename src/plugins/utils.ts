import { VueConstructor } from 'vue'

export function numberFormat(number: number) {
    return new Intl.NumberFormat('ko-KR', { currency: 'KRW' }).format(number)
}

declare module 'vue/types/vue' {
    // global property
    interface VueConstructor {
        numberFormat: typeof numberFormat
    }

    // instance property
    interface Vue {
        $numberFormat: typeof numberFormat
    }
}

export default {
    install(Vue: VueConstructor) {
        Vue.numberFormat = numberFormat
        Vue.prototype.$numberFormat = numberFormat
    },
}
