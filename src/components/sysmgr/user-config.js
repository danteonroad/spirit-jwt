export default {
    seq: { show: true, width: 50 },
    defaultSort: { prop: 'account', order: 'desc' },
    col: [
        { prop: 'account', label: '帐号', width: 130 },
        { prop: 'name', label: '姓名', width: 130 },
        { prop: 'email', label: '邮箱', width: 180 },
        { prop: 'status', label: '状态', width: 80 },
        { prop: 'updateUserName', label: '更新人', width: 180 },
        { prop: 'updateDate', label: '更新时间' },
    ],
    operation: { enable: true, label: '', width: 100, rowdelete: false },
    page: { enable: true },
    searchHeight: 0
}