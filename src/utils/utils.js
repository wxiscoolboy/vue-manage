//工具 js文件

//获取中国时间

export let getchinatime = (utime) => {

    let date = (typeof utime == 'string' ? new Date(utime) : utime)

    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
}