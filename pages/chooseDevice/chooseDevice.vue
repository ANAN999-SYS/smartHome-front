<template>
	<view>
		<pyh-nv :config="config"></pyh-nv>
		<view class="nav">
			<t-tabs :sticky='true' defaultValue="0" :space-evenly="false" @change="onTabsChange" >
				<t-tab-panel label="全屋" :value="0" />
				<t-tab-panel v-for="(item, index) in roomList" :key="index" :label="item.name" :value="index+1" />
			</t-tabs>
		</view>
		<view style="height: 120rpx;"></view>
		<t-fab icon="check" :draggable="true" style="position: fixed;z-index: 3;" @click="addDevice"></t-fab>
		<t-checkbox-group v-if="divicesList" t-class="deviceBox" :value="checkDivices" @change="onCheck">
			<view v-for="(item,index) in divicesList" :key="index"
				:class="['card', {'card--active': inArr(checkDivices,item)}]">
				<t-icon v-if="inArr(checkDivices,item)" name="check" t-class="card__icon" :ariaHidden="true" />
				<t-checkbox t-class="checkbox" :value="item" icon="none" :borderless="true">
					<view class="cardHeaderBox1">
						<view class="cardImgBox1">
							<image class="cardImg1" :src="`../../static/device/${item.iconId}.png`"></image>
						</view>
						<view>
							<view class="cardTips1">{{item.roomName}}</view>
							<view class="cardTitle1">{{item.name}}</view>
						</view>
					</view>
				</t-checkbox>
			</view>
		</t-checkbox-group>
		<view v-else class="noneCard">
			<view class="noneTitle">暂未添加设备</view>
		</view>
		<view style="height: 60rpx;"></view>
	</view>
</template>

<script>
	import{getDevicesList,getRoomList}from'@/request/api.js'
	export default {
		data() {
			return {
				config: {
					title: "添加设备",
					back: {
						iconForce: true,
					},
					bgColor: "linear-gradient(to bottom, #56ccf2, #42a6ef)",
					color: "#fff"
				},
				roomList: null,
				divicesList: null,
				checkDivices: []
			}
		},
		onLoad() {
			this.getDevicesData('全屋')
			this.getRoomData()
		},
		methods: {
			getRoomData(){
				getRoomList().then(res=>{
					this.roomList=res.data
				})
			},
			getDevicesData(roomName){
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
				this.getDevicesData(e.detail.label)
			},
			inArr(objectsArray, targetObject) {
				let exists = objectsArray.some(obj => obj.deId === targetObject.deId)
				return exists
			},
			
			onCheck(e) {
				let obj = e.detail.value[0]
				if (this.checkDivices.length == 0 || !this.inArr(this.checkDivices, obj)) {
					this.checkDivices.push(obj)
				} else {
					this.checkDivices = this.checkDivices.filter(objr => objr.deId !== obj.deId)
				}
			},
			addDevice() {
				uni.setStorageSync('checkDivices', this.checkDivices)
				uni.navigateBack({
					delta: 1,
					 success() {
						 this.checkDivices=[]
					 }
				})
			}
		}
	}
</script>

<style>
	page {
		background: #f6f6f6;
	}

	.deviceBox {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
		margin: 10rpx 22rpx 0 22rpx;
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

	.cardTips1 {
		color: #b7b7b7;
		font-size: 28rpx;
		font-weight: 480;
	}

	.cardTitle1 {
		font-size: 32rpx;
		font-weight: 550;
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

	.nav {
		position: fixed;
		height: 180rpx;
		width: 100%;
		z-index: 5;
	}

	.card {
		position: relative;
		border-radius: 12rpx;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
		height: 200rpx;
		width: 100%;
		display: flex;
		align-items: center;
		background: #fff;
		border: 3rpx solid #fff;
	}

	.card--active {
		border-color: #42a6ef;
	}

	.card--active::after {
		content: '';
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		width: 0;
		border: 14px solid #42a6ef;
		border-bottom-color: transparent;
		border-right-color: transparent;
	}

	.card__icon {
		color: #fff;
		position: absolute;
		left: 1.5px;
		top: 1.5px;
		z-index: 1;
	}
	.checkbox{
		width: 100% !important;
	}
</style>
