<template>
	<view>
		<pyh-nv :config="config"></pyh-nv>
		<view class="container">
			<view class="content">
				<view class="hd" :style="{ transform: 'rotateZ(' + angle + 'deg)' }">
					<image class="logo" src="../../static/logo.png"></image>
					<image class="wave" src="../../static/wave.png" mode="aspectFill"></image>
					<image class="wave wave-bg" src="../../static/wave.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view>
			<t-cell title="作者" note="纸凤孤凰" />
			<t-cell title="微信" note="19862976571" bordered="false" />
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				config: {
					title: "关于我们",
					back: {
						iconForce: true
					},
					bgColor: "linear-gradient(to bottom, #56ccf2, #42a6ef)",
					color: "#fff"
				},
				angle: 0
			}
		},
		onLoad() {

		},
		onShow() {
			uni.startAccelerometer({
				interval: 'game'
			});

			uni.onAccelerometerChange((res) => {
				let angle = -(res.x * 30).toFixed(1);
				if (angle > 14) {
					angle = 14;
				} else if (angle < -14) {
					angle = -14;
				}
				if (this.angle !== angle) {
					this.angle = angle;
				}
			});
		},
		onHide() {
			uni.stopAccelerometer();
		},
		methods: {

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
		/* position: relative; */
		z-index: 2;
		flex-direction: column;
		align-items: stretch;
		justify-content: center;
		width: 100%;
		/* height: 100%; */
		padding-bottom: 400rpx;
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
		top: -50;
		left: 50%;
		width: 1000rpx;
		margin-left: -500rpx;
		height: 200rpx;
		transition: all .35s ease;
	}

	.logo {
		position: absolute;
		z-index: 2;
		left: 50%;
		bottom: 200rpx;
		width: 160rpx;
		height: 160rpx;
		margin-left: -80rpx;
		border-radius: 160rpx;
		animation: sway 10s ease-in-out infinite;
		opacity: .95;
		background-color: white;
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
