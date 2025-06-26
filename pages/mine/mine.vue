<template>
	<view>
		<pyh-nv :config="config"></pyh-nv>
		<view class="container">
			<view class="HeaderBox">
				<view class="cardBox">
					<t-avatar icon="user" :image="userInfo.avatarUrl" size="88px" class="avatarBox"
						t-class-icon="avatarIcon" />
					<t-button v-if="!userInfo" t-class="cardBoxbtn" theme="primary" size="small" shape="round"
						hover-class="none" @tap="toLogin">登录</t-button>
					<view v-else class="nickName">{{userInfo.nickName}}</view>
				</view>
			</view>
			<view class="content">
				<view class="hd">
					<image class="wave" src="../../static/wave_fff.png" mode="aspectFill"></image>
					<image class="wave-bg" src="../../static/wave.png" mode="aspectFill"></image>
				</view>
				<view class="bd" style="height: 120rpx;">
				</view>
			</view>
		</view>
		<view class="fuwuCard">
			<view class="fuwuText"></view>
			<t-grid class="block" :column="4">
				<t-grid-item v-for="(item, index) in serveList" :key="index" :text="item.title" image="slot"
					t-class-image="gridImg1" @click="toServePage(item.url,item.type)">
					<view slot="image">
						<image class="gridImage" :src="item.image"></image>
					</view>
				</t-grid-item>
			</t-grid>
		</view>
		<view style="height: 20rpx;"></view>
		<view class="cellCard">
			<!-- <t-cell t-class="t-cell-classTop" title="使用帮助" data-title="使用帮助" leftIcon="help-circle" hover arrow
				@tap="toMore" /> -->
				<t-cell t-class="t-cell-classTop" title="设备同步" data-title="设备同步" leftIcon="backup" hover arrow
					@tap="toBafaSet" />
			<t-cell title="意见反馈" leftIcon="mark-as-unread" hover arrow @tap="toFeedback" />
			<t-cell title="反馈记录" leftIcon="mail" hover arrow @tap="toFeedbackRecord" />
			<button class="textBtn" open-type="contact"><t-cell leftIcon="service" title="在线客服" hover arrow/></button>
			<t-cell t-class="t-cell-classBom" data-title="关于我们" title="关于我们" leftIcon="info-circle" hover arrow
				bordered="false" @tap="toMore" />
		</view>
		<t-popup :visible="secretKeyVisible" @visible-change="onVisibleChange" placement="center">
			<view class="de_block">
				<view class="deId_box">
					<view class="deId_Tip">设备密钥(点击复制)</view>
					<view class="deId_text" @tap="copySecretKey(secret_key)">{{secret_key}}</view>
					<view v-if="bafaKey" class="deId_Tip">巴法云密钥(点击复制)</view>
					<view v-if="bafaKey" class="deId_text" @tap="copySecretKey(bafaKey)">{{bafaKey}}</view>
					<!-- <t-icon name="file-copy" size="25" @tap="copySecretKey" /> -->
				</view>
				<t-icon t-class="close-btn" name="close-circle" size="32" color="#fff" @tap="closeSecretKeyVis" />
			</view>
		</t-popup>
	</view>
</template>

<script>
	import {userTest} from"@/request/api.js"
	export default {
		data() {
			return {
				config: {
					title: "个人中心",
					back: {
						iconForce: false,
						hide: true
					},
					bgColor: "linear-gradient(to bottom, #56ccf2, #42a6ef)",
					color: "#fff"
				},
				userInfo: null,
				serveList: [{
						title: "远程控制",
						image: "../../static/images/ctrl_select .png",
						url: '/pages/remoteControl/remoteControl',
						type: 'tabBar'
					},
					{
						title: "情景模式",
						image: "../../static/images/scene_select.png",
						url: '/pages/scenarioMode/scenarioMode',
						type: 'tabBar'
					},
					{
						title: "设备密钥",
						image: "../../static/images/secretKey.png",
						url: '/pages/identificationRecord/identificationRecord',
						type: 'secretKey'
					},
					{
						title: "个人设置",
						image: "../../static/images/user_select.png",
						url: '/pages/mySetting/mySetting',
						type: 'none'
					}
				],
				secretKeyVisible: false,
				secret_key: '',
				bafaKey:''
			}
		},
		onLoad() {

		},
		onShow() {
			this.isLogin()
		},
		methods: {
			toServePage(url, type) {
				if (type == 'tabBar') {
					uni.switchTab({
						url: url
					})
				} else if (type == 'none') {
					uni.navigateTo({
						url: url,
					})
				} else if (type == 'secretKey') {
					this.secretKeyVisible = true
				}
			},
			isLogin() {
				userTest().then(res => {
					let userInfo = uni.getStorageSync('userInfo')
					this.userInfo = userInfo
					this.secret_key = userInfo.secretKey
					this.bafaKey = userInfo.bafaKey
				})
			},
			toLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			toFeedback() {
				uni.navigateTo({
					url: '/pages/feedback/feedback'
				})
			},
			toFeedbackRecord() {
				uni.navigateTo({
					url: "/pages/feedbackRecord/feedbackRecord"
				})
			},
			toMore(e) {
				let title = e.target.dataset.title
				if (title === '使用帮助') {
					uni.navigateTo({
						url: `/pages/help/help?title=${title}`
					})
				} else if (title === '关于我们') {
					uni.navigateTo({
						url: `/pages/about/about?title=${title}`
					})
				}
			},
			toBafaSet(e){
				let bafaKey = uni.getStorageSync('userInfo').bafaKey
				if(bafaKey!==null){
					uni.navigateTo({
						url: '/pages/bafaDevices/bafaDevices'
					})
				}
				else{
					uni.navigateTo({
						url: '/pages/bafaLogin/bafaLogin'
					})
				}
			},
			toFunctionPage(e) {
				let url = e.target.dataset.id
				console.log(url)
				uni.navigateTo({
					url: `/pages/${url}/${url}`
				});
			},
			onVisibleChange(e) {
				this.secretKeyVisible = e.detail.visible
			},
			//复制
			copySecretKey(data) {
				uni.setClipboardData({
					data: data,
					success: function() {
						uni.showToast({
							title: '复制成功',
							icon: 'success'
						});
					}
				});
			},
			closeSecretKeyVis() {
				this.secretKeyVisible = false
			}
		}
	}
</script>

<style>
	page {
		background: #f6f6f6;
	}

	.container {
		background: linear-gradient(to bottom, #42a6ef, #2f80ed);
		align-items: stretch;
		padding: 0;
		height: 100%;
		overflow: hidden;
	}

	.content {
		flex: 1;
		display: flex;
		z-index: 2;
		flex-direction: column;
		align-items: stretch;
		justify-content: center;
		position: relative;
		width: 100%;
		height: 100%;
		padding-bottom: 450rpx;
		background: -webkit-gradient(linear, left top, left bottom, from(rgba(244, 244, 244, 0)), color-stop(0.1, #f4f4f4), to(#f4f4f4));
		opacity: 0;
		transform: translate3d(0, 100%, 0);
		animation: rise 3s cubic-bezier(0.19, 1, 0.22, 1) .25s forwards;
	}

	@keyframes rise {
		0% {
			opacity: 0;
			transform: translate3d(0, 100%, 0);
		}

		50% {
			opacity: 1;
		}

		100% {
			opacity: 1;
			transform: translate3d(0, 450rpx, 0);
		}
	}

	@keyframes show {
		0% {
			opacity: 0;
		}

		100% {
			opacity: .95;
		}
	}

	.hd {
		position: absolute;
		top: -30rpx;
		left: 50%;
		width: 1000rpx;
		margin-left: -500rpx;
		height: 200rpx;
		transition: all .35s ease;
	}

	@keyframes sway {
		0% {
			transform: translate3d(0, 20rpx, 0) rotate(-15deg);
		}

		17% {
			transform: translate3d(0, 0rpx, 0) rotate(25deg);
		}

		34% {
			transform: translate3d(0, -20rpx, 0) rotate(-20deg);
		}

		50% {
			transform: translate3d(0, -10rpx, 0) rotate(15deg);
		}

		67% {
			transform: translate3d(0, 10rpx, 0) rotate(-25deg);
		}

		84% {
			transform: translate3d(0, 15rpx, 0) rotate(15deg);
		}

		100% {
			transform: translate3d(0, 20rpx, 0) rotate(-15deg);
		}
	}

	.wave {
		position: absolute;
		z-index: 2;
		right: 0;
		bottom: 0;
		opacity: 1;
		height: 260rpx;
		width: 2250rpx;
		animation: wave 10s linear infinite;
	}

	.wave-bg {
		position: absolute;
		right: 0;
		bottom: 0;
		opacity: 0.725;
		height: 260rpx;
		width: 2250rpx;
		z-index: 1;
		animation: wave-bg 10.25s linear infinite;
	}

	@keyframes wave {
		from {
			transform: translate3d(125rpx, 0, 0);
		}

		to {
			transform: translate3d(1125rpx, 0, 0);
		}
	}

	@keyframes wave-bg {
		from {
			transform: translate3d(375rpx, 0, 0);
		}

		to {
			transform: translate3d(1375rpx, 0, 0);
		}
	}

	.bd {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		animation: bd-rise 2s cubic-bezier(0.23, 1, 0.32, 1) .75s forwards;
		opacity: 0;
	}

	@keyframes bd-rise {
		from {
			opacity: 0;
			transform: translate3d(0, 60rpx, 0);
		}

		to {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}

	.HeaderBox {
		height: 360rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		z-index: 0;
		width: 100%;
	}

	.cardBox {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.avatarBox {
		margin-top: 50rpx;
		margin-bottom: 30rpx;
	}

	.nickName {
		font-size: 36rpx;
		color: #fff;
	}

	.avatarIcon {
		background-color: #f1f1f1;
		border-radius: 50%;
		color: #c9c9c9;
	}

	.cardBoxbtn {
		background: #fff !important;
		color: #2f80ed !important;
		width: 160rpx !important;
		--td-button-primary-border-color: #2f80ed;
	}

	.fuwuCard {
		background: #fff;
		margin: 20rpx;
		border-radius: 16rpx;
		padding-bottom: 20rpx;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
	}


	.fuwuText {
		font-size: 32rpx;
		font-weight: 500;
		padding-top: 20rpx;
		padding-left: 20rpx;
	}

	.tjText {
		font-size: 32rpx;
		font-weight: 500;
		padding-top: 20rpx;
		padding-left: 20rpx;
	}

	.gridImg {
		width: 96rpx !important;
		height: 96rpx !important;
		overflow: hidden;
	}

	.gridImg1 {
		width: 64rpx !important;
		height: 64rpx !important;
		overflow: hidden;
	}

	.gridImage {
		width: 64rpx;
		height: 64rpx;
	}

	.cellCard {
		margin-left: 20rpx;
		margin-right: 20rpx;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
	}

	.t-cell-classTop {
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
	}

	.t-cell-classBom {
		border-bottom-left-radius: 16rpx;
		border-bottom-right-radius: 16rpx
	}

	.de_block {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 350px;
		min-height: 120px;
		background: #fff;
		border-radius: 16rpx;
	}

	.deId_box {
		margin-top: 8rpx;
	}

	.deId_text {
		margin-bottom: 20rpx;
	}

	.deId_Tip {
		margin-bottom: 30rpx;
		text-align: center;
	}

	.close-btn {
		position: absolute;
		left: 50%;
		margin-left: -32rpx;
		bottom: calc(-1 * (48rpx + 64rpx));
	}
	.textBtn {
		padding: 0 !important;
		height: auto !important;
		line-height: normal !important;
		background-color: transparent;
	}
	button::after{
		border: 0 none
	}
</style>
