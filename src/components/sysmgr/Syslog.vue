<template>
    <div id="sysLog">
        <el-table
            :data="rows"
            stripe
            :highlight-current-row="true"
            :max-height="530"
            style="width: 100%; height: 100%;">
            <el-table-column
                type="index"
                width="50"
                fixed
                header-align="center"/>
            <el-table-column
                prop="account"
                label="帐号"
                width="100"
                fixed
                header-align="center">
            </el-table-column>
            <el-table-column
                prop="ip"
                label="IP"
                width="130"
                fixed
                header-align="center">
            </el-table-column>
            <el-table-column
                prop="visitTime"
                label="访问时间"
                fixed
                width="180"
                sortable="custom"
                header-align="center">
            </el-table-column>
            <el-table-column
                prop="spendTime"
                label="消耗时间"
                width="110"
                sortable
                header-align="center">
            </el-table-column>
            <el-table-column
                prop="uri"
                label="访问地址"
                width="180"
                header-align="center">
            </el-table-column>
            <el-table-column
                prop="clazz"
                label="处理类"
                width="180"
                header-align="center">
            </el-table-column>
            <el-table-column
                prop="methodName"
                label="方法"
                header-align="center">
            </el-table-column>
        </el-table>
        <el-pagination
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :page-sizes="[20, 40, 60]"
            :page-size="pages.pageSize"
            :current-page="pages.page"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pages.total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rows: [],
            pages: {
                page: 1,
                pageSize: 20,
                total: 0,
                sort: 'visitTime'
            }
        }
    },
    methods: {
        loadData() {
            this.$http.post('/sysmgr/syslog/query_page', {
                page: this.pages.page,
                sort: this.pages.sort,
                rows: this.pages.pageSize
            })
            .then(resp => {
                console.log(resp.data);
                this.rows = resp.data.rows;
                this.pages.total = resp.data.total;
            });
        },
        handleCurrentChange(val) {
            this.pages.page = val;
            this.loadData();
        },
        handleSizeChange(val) {
            this.pages.pageSize = val;
            this.loadData();
        }
    },
    created() {
        this.loadData();
        
    }
}
</script>

<style lang="less" scoped>

</style>
