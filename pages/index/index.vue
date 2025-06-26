<template>
	<view>
		<pyh-nv :config="config"></pyh-nv>
		<view class="container">
			<view class="HeaderBox">
				<t-grid :column="2" t-class="gridItemBox" align="center">
					<t-grid-item image="slot" text="室内温度" :description="`${infoCard.temperature}℃`" t-class="gridItem"
						t-class-text="gridItemLabel" t-class-image="gridItemImgBox" t-class-description="des_temp">
						<view slot="image">
							<image class="gridItemImg" src="../../static/infoCard/temperature.png"></image>
						</view>
					</t-grid-item>
					<t-grid-item image="slot" :description="`${infoCard.humidity}%RH`" text="室内湿度" t-class="gridItem"
						t-class-text="gridItemLabel" t-class-image="gridItemImgBox" t-class-description="des_humidity">
						<view slot="image">
							<image class="gridItemImg" src="../../static/infoCard/humidity.png"></image>
						</view>
					</t-grid-item>
					<t-grid-item image="slot" :description="`${infoCard.light}LX`" text="光照强度" t-class="gridItem"
						t-class-text="gridItemLabel" t-class-description="des_light" t-class-image="gridItemImgBox">
						<view slot="image">
							<image class="gridItemImg" src="../../static/infoCard/light.png"></image>
						</view>
					</t-grid-item>
					<t-grid-item image="slot" :description="infoCard.smoke" text="危险气体" t-class="gridItem"
						t-class-text="gridItemLabel" t-class-image="gridItemImgBox"
						:t-class-description="infoCard.smoke === '异常' ? 'des_warning' : 'des_weather'">
						<view slot="image">
							<image class="gridItemImg" src="../../static/infoCard/smoke.png"></image>
						</view>
					</t-grid-item>
				</t-grid>
			</view>
			<view class="content">
				<view class="hd">
					<image class="wave" src="../../static/wave_fff.png" mode="aspectFill"></image>
					<image class="wave-bg" src="../../static/wave.png" mode="aspectFill"></image>
				</view>
				<view class="bd" style="height: 100rpx;">
				</view>
			</view>
		</view>
		<t-notice-bar :visible="noticeVis" theme="warning" t-class="noticeBox" :marquee="marquee" :content="noticeData">
		</t-notice-bar>
		<view class="echartCard">
			<uni-ec-canvas class="uni-ec-canvas" id="line-chart" canvas-id="Temp" :ec="TempOption" />
		</view>
		<view class="echartCard">
			<uni-ec-canvas class="uni-ec-canvas" id="line-chart" canvas-id="Light" :ec="LightOption" />
		</view>
		<view style="height: 30rpx;"></view>
	</view>
</template>

<script>
	import uniEcCanvas from '@/components/uni-ec-canvas/uni-ec-canvas.vue'
	export default {
		components: {
			uniEcCanvas,
		},
		data() {
			return {
				config: {
					title: "智能监测",
					back: {
						iconForce: false,
						hide: true
					},
					bgColor: "linear-gradient(to bottom, #56ccf2, #42a6ef)",
					color: "#fff",
				},
				noticeVis: true,
				marquee: {
					speed: 60,
					loop: -1,
					delay: 0,
				},
				noticeData: "室内一切正常",
				infoCard: {
					temperature: 0,
					humidity: 0,
					light: 0,
					smoke: '正常'
				},
				TempOption: {
					option: {
						title: {
							text: '温湿度变化',
							left: 'left'

						},
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'cross',
								crossStyle: {
									color: '#999'
								}
							}
						},
						toolbox: {
							show: true,
							feature: {
								magicType: { type: ['line', 'bar'] },
								restore: {},
							}
						},
						legend: {
							data: ['湿度', '室内温度']
						},
						xAxis: [{
							type: 'category',
							data: [],
							axisPointer: {
								type: 'shadow'
							}
						}],
						yAxis: [{
								type: 'value',
								name: '湿度(%RH)',
								min: 0,
								max: 3,
								interval: 1,
								axisLabel: {
									formatter: '{value}'
								}
							},
							{
								type: 'value',
								name: '室内温度 (°C)',
								min: 0,
								max: 3,
								interval: 1,
								axisLabel: {
									formatter: '{value}'
								}
							}
						],
						series: [{
								name: '湿度',
								type: 'bar',
								tooltip: {
									valueFormatter: function(value) {
										return value + ' %RH';
									}
								},
								itemStyle: {
									normal: {
										//这里是重点
										color: '#8849EC',
										left: '5rpx'
									}
								},
								data: []
							},
							{
								name: '室内温度',
								type: 'line',
								yAxisIndex: 1,
								tooltip: {
									valueFormatter: function(value) {
										return value + ' °C';
									}
								},
								itemStyle: {
									normal: {
										color: '#E41D1D'
									}
								},
								data: []
							}
						]
					}
				},
				LightOption: {
					option: {
						title: {
							text: '光照强度',
							left: 'left'

						},
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'cross',
								crossStyle: {
									color: '#999'
								}
							}
						},
						toolbox: {
							feature: {
								dataView: {
									show: false,
									readOnly: false
								},
								magicType: {
									show: true,
									type: ['line', 'bar']
								},
								restore: {
									show: true
								},
								saveAsImage: {
									show: false
								}
							}
						},
						legend: {
							data: ['光照强度']
						},
						xAxis: [{
							type: 'category',
							data: [],
							axisPointer: {
								type: 'shadow'
							}
						}],
						yAxis: [{
							type: 'value',
							name: '光照强度(LX)',
							min: 0,
							max: 5,
							interval: 1,
							axisLabel: {
								formatter: '{value} lx'
							}
						}, ],
						series: [{
							name: '光照强度',
							type: 'line',
							tooltip: {
								valueFormatter: function(value) {
									return value + ' ml';
								}
							},
							itemStyle: {
								normal: {
									color: '#F7B438'
								}
							},
							data: []
						}]
					}
				}
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.wacthWebsocket()
		},
		methods: {
			//获取当前时间
			getTime(){
			  let currentDate = new Date();
			  //小时
			  let hours = currentDate.getHours();
			  // 获取分钟数
			  let minutes = currentDate.getMinutes();
			  let seconds = currentDate.getSeconds();
			  return `${hours}:${minutes}:${seconds}`
			},
			 //数据队列操作
			 enqueue(queue,element) {
			  if (queue.length < 5) {
			    queue.push(element);
			  } else {
			    queue.shift();
			    queue.push(element);
			  }
			},
			// 出队操作
			dequeue(queue) {
			  if (queue.length > 0) {
			    return queue.shift();
			  } else {
			    return null;
			  }
			},
			//启动ws数据获取并赋值
			wacthWebsocket(){
				this.$socket.getMessage(res=>{
					console.log(res);
					this.infoCard={...res}
					this.noticeData=''
					if(res.temperature>=30){
						this.noticeData='室内温度过高，请及时采取降温措施'
					}
					else if(res.smoke==='异常'){
						this.noticeData='易燃气体泄露，自动打开通风，请及时离开房屋并报警'
					}
					else{
						this.noticeData='室内一切正常'
						console.log(123333)
					}
					console.log("infoCard",this.infoCard)
					//温湿度
					let xTime=this.TempOption.option.xAxis[0].data
					let yHum=this.TempOption.option.series[0].data
					let yTemp=this.TempOption.option.series[1].data
					let yData=this.TempOption.option.yAxis
					this.enqueue(xTime,this.getTime())
					this.enqueue(yTemp,res.temperature)
					this.enqueue(yHum,res.humidity)
					let maxTemp=Math.max(...yTemp)
					let maxHu= Math.max(...yHum)
					yData[0].max= maxHu+3
					yData[1].max=maxTemp+3
					yData[0].interval=Math.ceil((maxHu+3)/5)
					yData[1].interval=Math.ceil((maxTemp+3)/5)
					//光强
					let lightTime=this.LightOption.option.xAxis[0].data
					let ylight=this.LightOption.option.series[0].data
					let lData=this.LightOption.option.yAxis
					this.enqueue(lightTime,this.getTime())
					this.enqueue(ylight,res.light)
					let maxLight=Math.max(...ylight)
					lData[0].max=maxLight+10
					lData[0].interval=Math.ceil((maxLight+10)/8)
				})
			}
		}
	}
</script>

<style>
	page {
		background: #f6f6f6;
	}
	.HeaderBox{
		position: absolute;
		width: 100%;
		padding-bottom: 30rpx;
	}


	.noticeBox {
		background: #fff !important;
	}

	.gridItemBox {
		background-color: rgba(0, 0, 0, 0) !important;
	}

	.gridItem {
		background-color: rgba(0, 0, 0, 0) !important;
	}


	.gridItemTip {
		font-size: 20px;
		margin-top: 18rpx;
	}

	.gridItemImgBox {
		width: 64rpx !important;
		height: 64rpx !important;
	}

	.gridItemImg {
		width: 64rpx;
		height: 64rpx;
	}

	.gridItemLabel {
		color: #fff !important;
	}

	.smokeText {}

	.des_weather {
		font-size: 25rpx !important;
		text-align: center;
		font-weight: 550;
		color: rgb(17, 189, 103) !important;
	}

	.des_warning {
		font-size: 25rpx !important;
		text-align: center;
		font-weight: 550;
		color: rgb(189, 17, 17) !important;
	}

	.des_temp {
		font-size: 25rpx !important;
		font-weight: 550;
		color: rgb(228, 29, 29) !important;
		text-align: center;
	}

	.des_humidity {
		font-size: 25rpx !important;
		font-weight: 550;
		color: rgb(136, 73, 236) !important;
		text-align: center;
	}

	.des_light {
		font-size: 25rpx !important;
		font-weight: 550;
		color: rgb(247, 180, 56) !important;
		text-align: center;
	}

	.echartCard {
		margin: 20rpx 20rpx 0 20rpx;
		height: 550rpx;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 16rpx;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
	}

	.uni-ec-canvas {
		width: 100%;
		height: 100%;
		display: block;
		margin: 20rpx 5rpx 0 5rpx;
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
		padding-bottom: 480rpx;
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
		top: 15rpx;
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
		bottom: -3rpx;
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
		animation: wave-bg 10.3s linear infinite;
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
</style>
