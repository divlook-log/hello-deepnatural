import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/assets/style/global.scss'
import utilsPlugin from '@/plugins/utils'

Vue.config.productionTip = false

Vue.use(utilsPlugin)

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
