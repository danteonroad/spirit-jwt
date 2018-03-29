<template>
  <div>
    <el-table
      :data="pages.datas"
      stripe
      :highlight-current-row="true"
      :max-height="maxHeight"
      :default-sort="table.defaultSort"
      @sort-change="remoteSort"
      header-row-class-name="spirit-table-header"
      row-class-name="spirit-table-row"
      style="width: 100%;">
      <el-table-column v-if="table.seq.show"
        type="index"
        :width="table.seq.width"
        fixed
        header-align="center"
        align="center"/>
      <el-table-column v-for="(item, key, index) in table.col"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :fixed="item.fixed"
        :sortable="item.sortable"
        :align="item.align?item.align:'center'"
        header-align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column v-if="table.operation.enable" fixed="right" :label="table.operation.label?table.operation.label:'操作'" :width="table.operation.width" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button type="text" plain size="small" icon="el-icon-edit" @click.native="handleRowEdit(scope.row.id)"></el-button>
          <el-button v-if="table.operation.rowdelete" type="text" plain size="small" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="table.page.enable"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :page-sizes="pages.pageSizes"
      :page-size="pages.pageSize"
      :current-page="pages.page"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
    props: {
        url: String,
        table: Object,
        pages: Object,
        remoteSort: Function,
        handleCurrentChange: Function,
        handleSizeChange: Function,
        handleRowEdit: Function,
        handleRowDel: Function,
    },
    computed: {
        maxHeight() {
            const mainHeight = this.$store.getters.mainHeight;
            const searchHeight = this.table.searchHeight;
            if(this.table.page.enable) {
                return mainHeight - 46 - searchHeight;
            } else {
                return mainHeight - 4 - searchHeight;
            }
        }
    }
}
</script>

<style lang="less">
    @color: #333;

    .el-pagination {
        margin-top: 10px;
        text-align: center;
    }
    .spirit-table-header{
        height: 30px;
        font-size: 14px;
        color: @color;
        font-family: 'Monospaced Number,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif';
    }
    .spirit-table-row {
        height: 25px;
        font-size: 12px;
        font-family: 'Monospaced Number,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif';
    }
    .searchForm {
      font-size: 12px;
      text-align: left;
    }
</style>


