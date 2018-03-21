import Vue from 'vue';
import Component from 'vue-class-component';
import { apiService } from '@/plugins/axios-plugin';

@Component
export default class TableUtil extends Vue {

    url = '';

    // 公共的分页请求参数
    pages = {
        datas: [], // 数据
        page: 1, // 当前页
        pageSize: 20, // 每页显示条数
        pageSizes: [20, 40, 60], // 每页显示条数选项
        total: 0, // 总条数
        sort: '', // 排序字段
        order: '', // 排序顺序
        q: {}, // 查询参数
    };

    loadData() {
        apiService.post(this.url, {
                page: this.pages.page,
                sort: this.pages.sort,
                order: this.pages.order,
                rows: this.pages.pageSize,
                q: this.pages.q
            })
            .then(resp => {
                const result = resp.data;
                this.pages.datas = result.rows;
                this.pages.total = result.total;
            })
    };

    handleCurrentChange(val) {
        this.pages.page = val;
        this.loadData();
    };

    handleSizeChange(val) {
        this.pages.pageSize = val;
        this.loadData();
    };

    remoteSort({ column, prop, order }) {
        if (column && column.sortable == 'custom') {
            this.pages.sort = prop;
            this.pages.order = order == 'ascending' ? 'asc' : 'desc';
            this.loadData();
        }
    };

    created() {
        this.loadData();
    };

}