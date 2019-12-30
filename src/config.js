const EmployerStatus = [{
    label: '待认证',
    value: 'created'
}, {
    label: '审核中',
    value: 'auditing'
}, {
    label: '已认证',
    value: 'audited'
}, {
    label: '认证失败',
    value: 'failure'
}];
const ArrivalStatus = [{
    label: '未到岗',
    value: 'arrival'
}, {
    label: '已到岗',
    value: 'arrivaled'
}];
const EnableStatus = [
    {
        label: '可用',
        value: 0
    }, {
        label: '禁用',
        value: 1
    }
];
const GenderEnum = [
    {
        label: '女',
        value: 'woman'
    }, {
        label: '男',
        value: 'man'
    }, {
        label: '不限',
        value: 'all'
    }
];
const JobStatus = [
    {
        label: '待提交',
        value: 'created'
    },
    {
        label: '审核中',
        value: 'auditing'
    },
    {
        label: '审核失败',
        value: 'failure'
    },
    {
        label: '招聘中',
        value: 'recruiting'
    },
    {
        label: '待结算',
        value: 'settling'
    },
    {
        label: '关闭',
        value: 'closed'
    },
];
const OfferStatus = [
    {
        label: '未录用',
        value: 'sign'
    },
    {
        label: '决绝录用',
        value: 'reject'
    },
    {
        label: '已录用',
        value: 'offer'
    },
    {
        label: '接受',
        value: 'accept'
    },
    {
        label: '决绝',
        value: 'refuse'
    }
];
const OrderStatus = [
    {
        label: '待支付',
        value: 'paying'
    },
    {
        label: '已经支付',
        value: 'payed'
    }
];
const SettleStatus = [
    {
        label: '未结算',
        value: 'Unsettled'
    },
    {
        label: '已结算',
        value: 'Settled'
    },
    {
        label: '待确认',
        value: 'SettleUnconfirmed'
    },
    {
        label: '已决绝',
        value: 'SettleReject'
    }
];
export {SettleStatus, EmployerStatus, ArrivalStatus, EnableStatus, GenderEnum, JobStatus, OfferStatus, OrderStatus}
