import moment from 'moment'

// 格式时间的显示
export const createTimeFormat = (val) => {
    return moment(val).format('YYYY-MM-DD HH:mm:ss')
}

// 小于10转化格式
export const timeFormat = (val) => {
    return val > 10 ? val : '0'+val
}  