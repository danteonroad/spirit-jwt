import TableComponent from '@/components/widget/Table.vue';


export default {
    install(Vue, options) {
        Vue.component('spirit-table', TableComponent);
    }
}