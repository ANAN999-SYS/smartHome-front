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
		</view>
		<view style="height: 200rpx;"></view>
		<t-fab icon="application" :draggable="true" style="position: fixed;z-index: 3;" @click="toScensSet">
		</t-fab>
		<view class="scenarioBox" v-if="scenarioList">
			<view :class="isNight ? 'scenarioCard1' : 'scenarioCard'" v-for="(item,index) in scenarioList" :key="index" @tap="ctrlScens(item)">
				<view class="cardIconBox">
					<!-- <t-icon :class="isNight ? 'cardIcon1' : 'cardIcon'" name="close" size="26" data-name="close"
						@click="delDevice" /> -->
				</view>
				<view class="contentBox">
					<view :class="isNight ? 'cardImgBox1' : 'cardImgBox'">
						<image class="cardImg" :src="`../../static/scens/${item.iconId}.png`" mode="aspectFill"></image>
					</view>
					<view class="cardText">
						<view :class="isNight ? 'cardTitle1' : 'cardTitle'">{{item.name}}</view>
						<view :class="isNight ? 'cardTips1' : 'cardTips'">{{item.mode}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else :class="isNight ? 'noneCard1' : 'noneCard'">
			<view :class="isNight ? 'noneTitle1' : 'noneTitle'">暂未添加情景模式</view>
		</view>
		<view style="height: 60rpx;"></view>
		<view style="height: 40rpx;"></view>
	</view>
</template>

<script>
	import{getScenario,ctrlScenario}from"@/request/api.js"
	export default {
		data() {
			return {
				config: {
					title: "情景模式",
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
				isNight: false,
				scenarioList:null
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
			this.getScenarioList()
		},
		methods: {
			getScenarioList(){
				getScenario().then(res=>{
					if(res.data.length!==0){
						this.scenarioList=res.data
					}
				})
			},
			ctrlScens(item){
				ctrlScenario(item).then(res=>{
					uni.showToast({
						title: '指令已发送',
						icon: 'success',
					});
				})
			},
			toScensSet(e) {
				uni.navigateTo({
					url:"/pages/scenarioSet/scenarioSet"
				})
			}
		}
	}
</script>

<style>
	page {
		background: #f6f6f6;
	}

	.scenarioBox {
		margin: 20rpx 20rpx 0 20rpx;
	}

	.scenarioCard {
		width: 100%;
		background: #fff;
		height: 200rpx;
		border-radius: 16rpx;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
		display: flex;
		align-items: center;
		position: relative;
		margin-bottom: 20rpx;
	}

	.contentBox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.cardImgBox {
		background: #eeeeee;
		border-radius: 50%;
		width: 150rpx;
		height: 150rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 30rpx;
	}

	.cardImg {
		width: 100rpx;
		height: 100rpx;
	}

	.cardText {
		margin-right: 60rpx;
	}

	.cardTitle {
		font-size: 40rpx;
		font-weight: 520;
	}

	.cardTips {
		color: #a5a5a5;
	}

	.cardIconBox {
		position: absolute;
		top: 3rpx;
		right: 8rpx;
	}

	.cardIcon {
		color: #a5a5a5 !important;
	}

	.scenarioCard1 {
		width: 100%;
		background: #42a6ef;
		height: 200rpx;
		border-radius: 16rpx;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
		display: flex;
		align-items: center;
		position: relative;
		margin-bottom: 20rpx;
	}

	.cardImgBox1 {
		background-color: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(30px);
		-webkit-backdrop-filter: blur(30px);
		border: 0px solid rgba(255, 255, 255, 0.18);
		box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
		-webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
		-webkit-border-radius: 12px;
		border-radius: 50%;
		width: 150rpx;
		height: 150rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 30rpx;
	}

	.cardTitle1 {
		color: #fff;
		font-size: 40rpx;
		font-weight: 520;
	}

	.cardTips1 {
		color: #fff;
	}

	.cardIcon1 {
		color: #fff !important;
	}

	.noneCard {
		margin: 20rpx;
		height: 300rpx;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 16rpx;
	}

	.noneTitle {
		font-size: 32rpx;
		font-weight: 500;
	}

	.noneCard1 {
		margin: 20rpx;
		height: 300rpx;
		background: #42a6ef;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 16rpx;
	}

	.noneTitle1 {
		font-size: 32rpx;
		font-weight: 500;
		color: #fff;
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

	.nav {
		position: fixed;
		width: 100%;
		height: 200rpx;
		z-index: 9;
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
