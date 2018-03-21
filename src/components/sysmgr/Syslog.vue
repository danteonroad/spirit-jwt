<template>
    <div id="sysLog">
			<el-form ref="syslogForm" :model="query" :inline="true" class="searchForm" size="mini">
				<el-form-item label="帐号">
                    <el-input placeholder="帐号" v-model="query.account"></el-input>
				</el-form-item>
                <el-form-item label="IP">
                    <el-input placeholder="ip" v-model="query.ip"></el-input>
				</el-form-item>
                <el-form-item label="访问时间">
                    <el-date-picker
                        v-model="query.daterange" 
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                </el-col>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
				</el-form-item>
			</el-form>
        <spirit-table
            ref="syslogTable"
            :table="table" 
            :url="url" 
            :pages="pages"
            :remoteSort="remoteSort"
            :handleCurrentChange="handleCurrentChange"
            :handleSizeChange="handleSizeChange">
        </spirit-table>
    </div>
</template>

<script>
import Component from 'vue-class-component';
import Config from './syslog-config';
import BaseTable from '@/util/table-util';
import { format, addDays } from 'date-fns';

@Component
export default class Syslog extends BaseTable {

    url = '/sysmgr/syslog/query_page';
    table = Config;
    searchFormHeight = 0;

    query = {
        account: '',
        ip: '',
        startDate: '',
        endDate: '',
        daterange: ''
    };

    initDate() {
        this.query.startDate = format(Date.now(), 'YYYY-MM-DD');
        this.query.endDate = format(addDays(Date.now(), 7), 'YYYY-MM-DD');
        this.query.daterange = [this.query.startDate, this.query.endDate];
    }

    search() {
        if(this.query.daterange) {
            this.query.startDate = this.query.daterange[0];
            this.query.endDate = this.query.daterange[1];
        } else {
            this.initDate();
        }
        this.loadData();
    }

    created () {
        this.initDate();
        this.pages.q = this.query;
        // this.loadData();
    }

    mounted () {
        this.table.searchHeight = this.$refs.syslogForm.$el.clientHeight;
        const that = this;
        window.onresize = function temp() {
            that.table.searchHeight = that.$refs.syslogForm.$el.clientHeight;
        };
    }
}
</script>

<style lang="less" scoped>
    .searchForm {
        font-size: 12px;
        text-align: left;
    }
</style>
