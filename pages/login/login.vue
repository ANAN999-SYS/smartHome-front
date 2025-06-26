<template>
	<view>
		<pyh-nv :config="config"></pyh-nv>
		<view>
			<view>
				<view class='header'>
					<image src='../../static/logo.png'></image>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像等)</text>
				</view>
				<button class='bottom' type='primary' lang="zh_CN" @tap="getUserProfile">
					授权登录
				</button>
			</view>
		</view>
		<t-toast id="t-toast" />
	</view>
</template>

<script>
	import {
		userLoginAuthLogin,
		userLoginSessionId
	} from '@/request/api.js'
	export default {
		data() {
			return {
				config: {
					title: "登录",
					back: {
						iconForce: true
					},
					bgColor:"linear-gradient(to bottom, #56ccf2, #42a6ef)",
					color:"#fff"
				},
				encryptedData: "",
				iv: "",
				sessionId: ""
			}
		},
		methods: {
			async getUserProfile(e) {
				uni.showToast({
					title: '正在登录',
					icon: 'loading',
					duration:5000
				});
				uni.getUserProfile({
					desc: '业务需要',
					success: async res => {
						this.encryptedData = res.encryptedData;
						this.iv = res.iv;
						uni.login({
							success: async loginRes => {
								const code = loginRes.code;
								console.log(code);
								if (loginRes.code) {
									try {
										userLoginSessionId(code, '').then(sessionRes => {
											console.log(sessionRes);
											this.sessionId = sessionRes
											let data = {
												"encryptedData": this.encryptedData,
												"iv": this.iv,
												"sessionId": this.sessionId
											}
											userLoginAuthLogin(data).then(res => {
												uni.hideLoading()
												if(res.code==0){
													let userInfo = res.data
													let token = res.data.token;
													uni.setStorageSync('userInfo',
														userInfo);
													uni.setStorageSync('token',
														token);
													uni.showToast({
														title: '登录成功',
														icon: 'success',
													});
													let pages =
														getCurrentPages(); // 获取页面栈
													let beforePage = pages[pages
														.length -
														2]; // 前一个页面
													setTimeout(() => {
														uni.navigateBack({
															delta: 1,
															success: () => {
																beforePage
																	.onLoad();
															}
														});
													}, 1000);
												}
												else{
													uni.showToast({
														title: res.message,
														icon: 'error',
													});
												}
											}).catch(err => {
												uni.showToast({
													title: '登录失败！',
													icon: 'error',
												});
											})
										}).catch(err => {
											uni.showToast({
												title: '登录失败！',
												icon: 'error',
											});
											return;
										})
									} catch (error) {
										console.log("获取用户登录状态失败!" + error.errMsg);
									}
								}
							}
						});
					}
				});
			},
			handleCancel() {
				wx.navigateBack({
					delta: 1,
				});
			},
		}
	}
</script>

<style>
	.header {
		display: flex;
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 400rpx;
		line-height: 350rpx;
		align-items: center;
		justify-content: center;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #575555;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
		background: #409eff !important;
	}

</style>
