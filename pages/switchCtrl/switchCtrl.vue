<template>
	<view>
		<pyh-nv :config="config"></pyh-nv>
		<view class="nav">
			<view class="container">
				<view class="content">
					<view class="hd">
						<view class="logoBox">
							<image class="logo" :src="`../../static/device/${deviceInfo.iconId}.png`"></image>
						</view>
						<image class="wave" src="../../static/wave.png" mode="aspectFill"></image>
						<image class="wave wave-bg" src="../../static/wave.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="deviceInfo">
			<view class="deviceInfoTitle">设备信息(点击复制)</view>
			<t-cell title="名称" :note="deviceInfo.name" @click="copyData(deviceInfo.name)" />
			<t-cell title="房间" :note="deviceInfo.roomName" @click="copyData(deviceInfo.roomName)"/>
			<t-cell title="设备类别码" :note="deviceInfo.code" @click="copyData(deviceInfo.code)"/>
			<t-cell title="巴法云同步" :note="deviceInfo.state=='false' ? '未同步' : '已同步'" @click="copyData(deviceInfo.state)"/>
			<!-- <t-cell title="订阅主题" t-class-note="noteText" :note="deviceInfo.topic" bordered="false" @click="copyData(deviceInfo.topic)"/> -->
			<t-cell title="订阅主题"  :note="`${deviceInfo.iconId}`+'_ctrl'" bordered="false" @click="copyData(deviceInfo.topic)"/>
		</view>
		<view class="deviceCtrl">
			<view class="deviceInfoTitle">控制指令</view>
			<view class="btnBox">
				<view class="btnCard">
					<t-button t-class="turnOn" size="large" icon="poweroff" shape="circle" @tap="deviceCtrl('us')"></t-button>
					<view class="cardTip">开启</view>
				</view>
				<view class="btnCard" v-if="deviceInfo.iconId =='curtain'">
					<t-button t-class="stop" size="large" icon="stop-circle" shape="circle" @tap="deviceCtrl('o')"></t-button>
					<view class="cardTip">暂停</view>
				</view>
				<view class="btnCard" v-if="deviceInfo.iconId!=='lock'">
					<t-button t-class="turnOff" size="large" icon="poweroff" shape="circle" @tap="deviceCtrl('u{v')"></t-button>
					<view class="cardTip">关闭</view>
				</view>
				<view class="btnCard">
					<t-button t-class="rotate" size="large" icon="rotate" shape="circle" @tap="deviceCtrl('xv~')"></t-button>
					<view class="cardTip">重置</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import{getDevicesById,ctrlDevice}from'@/request/api.js'
	export default {
		data() {
			return {
				config: {
					title: "远程控制",
					back: {
						iconForce: true
					},
					bgColor: "linear-gradient(to bottom, #56ccf2, #42a6ef)",
					color: "#fff"
				},
				deviceInfo: null
			}
		},
		onLoad(opt) {
			this.getDevicesInfo(opt.deId)
		},
		methods: {
			getDevicesInfo(data){
				let id={
					deId:data
				}
				getDevicesById(id).then(res=>{
					this.deviceInfo=res.data
				})
			},
			copyData(devData){
				uni.setClipboardData({
					data: devData,
					success: function() {
						uni.showToast({
							title: '复制成功',
							icon: 'success',
							duration:500
						});
					}
				});
			},
			deviceCtrl(operate){
				let data={
					state:this.deviceInfo.state,
					topic:this.deviceInfo.topic,
					operate:operate,
					deName:this.deviceInfo.name,
					deType:this.deviceInfo.type,
					deRoom:this.deviceInfo.roomName,
					author:this.deviceInfo.author
				}
				console.log(data)
				ctrlDevice(data).then(res=>{
					uni.showToast({
						title: '指令已发送',
						icon: 'success',
					});
				})
			},
			
		}
	}
</script>

<style>
	page {
		background: #f6f6f6;
	}

	image {
		max-width: none;
	}

	/* 	.nav {
		position: relative;
		height: 180rpx;
		width: 100%;
		z-index: 5;
	} */
	.deviceInfo {
		margin: 10rpx 20rpx 30rpx 20rpx;
	}

	.deviceInfoTitle {
		padding-left: 8rpx;
		margin-bottom: 10rpx;
	}

	.deviceCtrl {
		margin: 0 20rpx 30rpx 20rpx;
	}

	.btnBox {
		height: 200rpx;
		width: 100%;
		background: #fff;
		display: flex;
		flex-wrap: wrap;
	}
	.noteText{
		font-size: 13px !important;
	}
	.btnCard{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.cardTip{
		margin-top: 8rpx;
		color: #b7b7b7;
	}
	.turnOn{
		background-color: #22b861 !important;
		color: #fff !important;
		--td-button-default-border-color:#22b861;
		--td-button-default-active-border-color:#1b934e;
		--td-button-default-active-bg-color:#1b934e;
	}
	.turnOff{
		background-color: #f15a5a !important;
		color: #fff !important;
		--td-button-default-border-color:#f15a5a;
		--td-button-default-active-border-color:#d74141;
		--td-button-default-active-bg-color:#d74141;
	}
	.stop{
		background-color: #f1c083 !important;
		color: #fff !important;
		--td-button-default-border-color:#f1c083;
		--td-button-default-active-border-color:#d7a769;
		--td-button-default-active-bg-color:#d7a769;
	}
	.rotate{
		background-color: #2f80ed !important;
		color: #fff !important;
		--td-button-default-border-color:#2f80ed;
		--td-button-default-active-border-color:#2666be;
		--td-button-default-active-bg-color:#2666be;
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
		align-items: stretch;
		justify-content: center;
		width: 100%;
		padding-bottom: 240rpx;
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
		top: -20rpx;
		left: 50%;
		width: 1000rpx;
		margin-left: -500rpx;
		transition: all .35s ease;
	}

	.logoBox {
		position: absolute;
		z-index: 2;
		left: 50%;
		bottom: 220rpx;
		width: 160rpx;
		height: 160rpx;
		margin-left: -80rpx;
		border-radius: 50%;
		/* 	animation: sway 10s ease-in-out infinite;
		opacity: .95; */
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.logo {
		width: 140rpx;
		height: 140rpx;
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
		z-index: 3;
		right: 0;
		bottom: 0;
		opacity: 0.725;
		height: 260rpx;
		width: 2250rpx;
		animation: wave 10s linear infinite;
	}

	.wave-bg {
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
</style>
