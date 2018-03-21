export default {
    seq: { show: true, width: 50 },
    col: [
        { prop: 'account', label: '帐号', width: 100, fixed: true },
        { prop: 'ip', label: 'IP', width: 130, fixed: true },
        { prop: 'visitTime', label: '访问时间', width: 180, fixed: true, sortable: 'custom' },
        { prop: 'spendTime', label: '消耗时间', width: 110, sortable: true },
        { prop: 'uri', label: '访问地址', width: 180 },
        { prop: 'clazz', label: '处理类', width: 180 },
        { prop: 'methodName', label: '方法' },
    ],
    page: { enable: true },
    searchHeight: 0
}