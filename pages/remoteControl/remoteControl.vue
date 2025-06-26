<template>
	<view>
		<pyh-nv :config="config"></pyh-nv>
		<view class="nav">
			<view class="container">
				<view class="heardBox">
					<image class="headerImg" :src="`../../static/time/${tips.imageUrl}.png`"></image>
					<view class="headerTextBox">
						<view class="headerTitle">{{tips.period}}!</view>
						<view class="headerTip">欢迎回家</view>
					</view>
				</view>
				<view class="content">
					<view class="hd">
						<image class="wave" src="../../static/wave_fff.png" mode="aspectFill"></image>
						<image class="wave-bg" src="../../static/wave.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<t-tabs :sticky='true' :defaultValue="0" :space-evenly="false" @change="onTabsChange" >
				<t-tab-panel label="全屋" :value="0" />
				<t-tab-panel v-for="(item, index) in roomList" :key="index" :label="item.name" :value="index+1" />
			</t-tabs>
		</view>
		<view style="height: 280rpx;"></view>
		<t-fab icon="houses" :draggable="true" style="bottom: 100px;position: fixed;z-index: 3;" @click="toRoomSet">
		</t-fab>
		<t-fab icon="remote-wave" :draggable="true" style="position: fixed;z-index: 3;" @click="toDevicesSet">
		</t-fab>
		<view class="deviceBox" v-if="divicesList">
			<view :class="isNight ? 'deviceCard2' : 'deviceCard1'" v-for="(item,index) in divicesList" :key="index"
				:data-deId="item.deId" @click="toDevicesCtrl(item.deId)">
				<view class="cardIconBox1">
					<!-- <t-icon :class="isNight ? 'cardIcon2' : 'cardIcon1'" name="close" size="26" data-name="close"
						@click="delDevice" /> -->
				</view>
				<view class="cardHeaderBox1">
					<view :class="isNight ? 'cardImgBox2' : 'cardImgBox1'">
						<image class="cardImg1" :src="`../../static/device/${item.iconId}.png`"></image>
					</view>
					<view>
						<view :class="isNight ? 'cardTips2' : 'cardTips1'">{{item.roomName}}</view>
						<view :class="isNight ? 'cardTitle2' : 'cardTitle1'">{{item.name}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else :class="isNight ? 'noneCard1' : 'noneCard'">
			<view :class="isNight ? 'noneTitle1' : 'noneTitle'">暂未添加设备</view>
		</view>
		<view style="height: 60rpx;"></view>
	</view>
</template>

<script>
	import{getRoomList,getDevicesList} from"@/request/api.js"
	export default {
		data() {
			return {
				config: {
					title: "远程控制",
					back: {
						iconForce: false,
						hide: true
					},
					bgColor: "linear-gradient(to bottom, #56ccf2, #42a6ef)",
					color: "#fff"
				},
				tips: {
					period: '',
					imageUrl: ''
				},
				roomList: null,
				isNight: false,
				divicesList: null,
				label:null
			}
		},
		onShow() {
			this.isNight = false
			const now = new Date();
			const currentHour = now.getHours();
			let period, imageUrl;
			if (currentHour >= 6 && currentHour < 12) {
				period = '早上好'
				imageUrl = 'morning'
			} else if (currentHour >= 12 && currentHour < 14) {
				period = '中午好'
				imageUrl = 'noon'
			} else if (currentHour >= 14 && currentHour < 18) {
				period = '下午好'
				imageUrl = 'Afternoon'
			} else {
				period = '晚上好'
				imageUrl = 'AtNight'
				this.isNight = true
			}
			this.tips = {
				period,
				imageUrl
			}
			this.getRoomData()
			if(this.label){
				this.getDevicesData(this.label)
			}
			else{
				this.getDevicesData("全屋")
			}
		},
		onLoad() {
			
		},
		methods: {
			getRoomData(){
				getRoomList().then(res=>{
					this.roomList=res.data
				})
			},
			getDevicesData(roomName){
				console.log(roomName)
				let data={
					room:roomName
				}
				getDevicesList(data).then(res=>{
					if(res.data.length==0){
						this.divicesList=null
					}
					else{
						this.divicesList=res.data
					}
				})
			},
			onTabsChange(e) {
				this.label=e.detail.label
				this.getDevicesData(e.detail.label)
			},
			toDevicesSet(e) {
				uni.navigateTo({
					url:"/pages/deviceSet/deviceSet"
				})
			},
			toRoomSet(e) {
				uni.navigateTo({
					url:"/pages/roomSet/roomSet"
				})
			},
			toDevicesCtrl(deId){
				uni.navigateTo({
					url:`/pages/switchCtrl/switchCtrl?deId=${deId}`
				})
			}
		}
	}
</script>

<style>
	page {
		background: #f6f6f6;
	}

	.heardBox {
		display: flex;
		align-items: center;
		padding-left: 40rpx;
		padding-top: 10rpx;
	}

	.headerImg {
		width: 64px;
		height: 64px;
	}

	.headerTextBox {
		margin-left: 30rpx;
	}

	.headerTitle {
		color: #fff;
		font-size: 38rpx;
		font-weight: 500;
	}

	.headerTip {
		font-size: 42rpx;
		font-weight: 500;
		color: #fff;
	}
	.noneCard{
		margin: 20rpx;
		height: 300rpx;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 16rpx;
	}
	.noneTitle{
		font-size: 32rpx;
		font-weight: 500;
	}
	.noneCard1{
		margin: 20rpx;
		height: 300rpx;
		background: #42a6ef;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 16rpx;
	}
	.noneTitle1{
		font-size: 32rpx;
		font-weight: 500;
		color: #fff;
	}
	.deviceBox {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
		margin: 10rpx 22rpx 0 22rpx;
	}

	.deviceCard1 {
		background: #fff;
		border-radius: 16rpx;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
		height: 200rpx;
		width: 100%;
		display: flex;
		align-items: center;
		position: relative;
	}

	.cardHeaderBox1 {
		display: flex;
		align-items: center;
	}

	.cardImgBox1 {
		background: #eeeeee;
		border-radius: 50%;
		width: 106rpx;
		height: 106rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.cardImg1 {
		width: 76rpx;
		height: 76rpx;
	}

	.cardIconBox1 {
		position: absolute;
		top: 0;
		right: 0;
	}

	.cardIconBox1 {
		margin: 12rpx;
	}

	.cardIcon1 {
		color: #b7b7b7 !important;
	}

	.cardTips1 {
		color: #b7b7b7;
		font-size: 28rpx;
		font-weight: 480;
	}

	.cardTitle1 {
		font-size: 32rpx;
		font-weight: 550;
	}

	.deviceCard2 {
		background: #42a6ef;
		border-radius: 16rpx;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
		height: 200rpx;
		width: 100%;
		display: flex;
		align-items: center;
		position: relative;
	}

	.cardImgBox2 {
		background-color: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(30px);
		-webkit-backdrop-filter: blur(30px);
		border: 0px solid rgba(255, 255, 255, 0.18);
		box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
		-webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
		-webkit-border-radius: 12px;
		border-radius: 50%;
		width: 106rpx;
		height: 106rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}


	.cardIcon2 {
		color: #fff !important;
	}

	.cardTips2 {
		color: #fff;
		font-size: 28rpx;
		font-weight: 480;
	}

	.cardTitle2 {
		font-size: 32rpx;
		font-weight: 550;
		color: #fff;
	}
	.nav{
		position: fixed;
		height: 180rpx;
		width: 100%;
		z-index: 5;
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
		padding-bottom: 50rpx;
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
		top: -180rpx;
		left: 50%;
		width: 1000rpx;
		margin-left: -500rpx;
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
