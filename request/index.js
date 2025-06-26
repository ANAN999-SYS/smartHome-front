// 全局请求封装
// const base_url = 'http://127.0.0.1:9999'
const base_url = 'https://wx.wlsx.fun:9999'
// 请求超出时
const timeout = 5000
//跳转登录
let flag=true
//弹窗
let isPop=true
// 需要修改token，和根据实际修改请求头
export default (params) => {
	let url = params.url;
	let type=params.type;
	let method = params.method || "get";
	let data = params.data || {};
	let header = {
		'Authorization': uni.getStorageSync('token') || '',
		'Content-Type': 'application/json;charset=UTF-8',
		// 'Tenant-Id': uni.getStorageSync('tenantId') || 'xxx', // avue配置相关
		...params.header
	}
	if (method == "post") {
		header = {
			'Content-Type': 'application/json',
			'Authorization': uni.getStorageSync('token') || '',
			...params.header
		};
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: base_url+url,
			method: method,
			header: header,
			data: data,
			timeout: timeout,
			success(response) {
				const res = response
				// 根据返回的状态码做出对应的操作
				//获取成功
				if (res.statusCode == 200) {
					resolve(res.data)
				} else {
					uni.clearStorageSync()
					switch (res.statusCode) {
						case 401:
							uni.removeStorageSync('userInfo')
							uni.removeStorageSync('token')
							if(isPop){
								isPop=false
								uni.showModal({
									title: "提示",
									content: "请先登录",
									showCancel: false,
									success() {
										if(flag){
											setTimeout(() => {
												uni.navigateTo({
													url: "/pages/login/login",
												})
												flag=false
											}, 1000);
										}
									},
								});
							}
							break;
						case 404:
							uni.showToast({
								title: '请求地址不存在...',
								duration: 2000,
							})
							break;
						default:
							uni.showToast({
								title: '请重试...',
								duration: 2000,
							})
							break;
					}
				}
			},
			fail(err) {
				console.log(err)
				if (err.errMsg.indexOf('request:fail') !== -1) {
					uni.showToast({
						title: '网络异常',
						icon: "error",
						duration: 2000
					})
				} else {
					uni.showToast({
						title: '未知异常',
						duration: 2000
					})
				}
				reject(err);

			},
			complete() {
				// 不管成功还是失败都会执行
				uni.hideLoading();
				uni.hideToast();
			}
		});
	}).catch(() => {});
};
