<template>
	<view>
		<pyh-nv :config="config"></pyh-nv>
		<view class="roomList" v-if="devicesList">
			<view class="roomCard" v-for="(item,index) in devicesList" :key="index">
				<t-swipe-cell>
					<t-cell :bordered="false" :title="item.name" :description="item.roomName" note="左划操作">
						<view slot="image">
							<image class="cellImg" :src="`../../static/device/${item.iconId}.png`"></image>
						</view>
					</t-cell>
					<view slot="right" class="btn-wrapper">
						<view class="btn edit-btn column" @tap="onEdit(item)">
							<t-icon class="padding-bottom" name="edit" size="32rpx"></t-icon>
							编辑
						</view>
						<view class="btn delete-btn column" @tap="onDelete(item)">
							<t-icon class="padding-bottom" name="delete" size="32rpx"></t-icon>
							删除
						</view>
					</view>
				</t-swipe-cell>
			</view>
		</view>
		<view v-else class="noneData">
			<view>暂无设备信息</view>
		</view>
		<view style="height: 50rpx;"></view>
		<t-fab icon="add" :draggable="true" style="position: fixed;z-index: 3;" @click="addDevice"></t-fab>
		<t-popup :visible="popupVisible" @visible-change="onVisibleChange" placement="center">
			<view class="block">
				<view class="popHeard">{{operateTitle}}</view>
				<t-cell title="选择图标" :note="devicesData.code" arrow hover @click="onDevPop">
					<view slot="image">
						<image class="PopcellImg"
							:src="`../../static/device/${devicesData.iconId ? devicesData.iconId : 'setting'}.png`">
						</image>
					</view>
				</t-cell>
				<t-input label="名称" type="text" :value="devicesData.name" clearable @blur="getDeviceName" />
				<t-cell title="选择房间" :note="devicesData.roomName" arrow hover @click="onCityPicker" />
				<view class="btnBox">
					<t-button t-class="cardBoxbtn" theme="primary" size="medium" shape="round" hover-class="none"
						@tap="saveDevice">保存
					</t-button>
				</view>
			</view>
		</t-popup>
		<t-picker :visible="roomVisible" data-key="room" title="选择房间" cancelBtn="取消" confirmBtn="确认"
			@confirm="onPickerConfirm" @cancel="onPickerCancel">
			<t-picker-item :options="roomList"></t-picker-item>
		</t-picker>
		<t-popup :visible="devVisible" @visible-change="onVisibleIconChange" placement="bottom">
			<view class="devBlock">
				<view class="devHeader">
					<view class="devTitle">选择图标</view>
				</view>
			</view>
			<view>
				<scroll-view scroll-y style="height: 335rpx;">
				    <view class="container">
				    	<view v-for="(item,index) in iconList" :key="index" :data-code="item.code" class="columnIcon">
				    		<image class="columnImg" :src="`../../static/device/${item.icon}.png`" @tap="chooseImg(item)">
				    		</image>
				    	</view>
				    </view>
				</scroll-view>
			</view>
			<view style="height: 30rpx;"></view>
		</t-popup>
	</view>
</template>

<script>
	import {
		getRoomList,
		getDevicesList,
		editDevicesList,
		addDevicesList,
		deleteDevicesList
	} from "@/request/api.js"
	export default {
		data() {
			return {
				config: {
					title: "设备管理",
					back: {
						iconForce: true,
					},
					bgColor: "linear-gradient(to bottom, #56ccf2, #42a6ef)",
					color: "#fff"
				},
				popupVisible: false,
				roomVisible: false,
				devicesData: {
					name: '',
					type: '',
					iconId: '',
					roomId:'',
					roomName: '',
					code: '',
					author:'',
				},
				chooseIcon: {
					iconId: '',
					code: ''
				},
				devicesList: null,
				roomList: null,
				devVisible: false,
				operateTitle: '',
				operateType:'',
				iconList: [{
						icon: 'light',
						code: '002'
					},
					{
						icon: 'curtain',
						code: '009'
					},
					{
						icon: 'wind',
						code: '003'
					},
					{
						icon: 'lock',
						code: '006'
					},
					{
						icon: 'airConditioning',
						code: '005'
					},
					{
						icon: 'receptacle',
						code: '001'
					}
				]
			}
		},
		onLoad() {
			this.getRoomData()
			this.getDevicesData()
		},
		methods: {
			getRoomData(){
				getRoomList().then(res=>{
					this.roomList=res.data.map(item=>{
						return{label:item.name,value:item.roomId}
					})
					this.roomList.unshift({label:'全屋',value:'quanwu'})
				})
				if(this.roomList==null){
					this.roomList=[{label:'全屋',value:'quanwu'}]
				}
			},
			getDevicesData(){
				let data={
					room:'全屋'
				}
				getDevicesList(data).then(res=>{
					if(res.data.length!==0){
						this.devicesList=res.data
					}
					else{
						this.divicesList=null
					}
				})
			},
			addDevicesData(){
				addDevicesList(this.devicesData).then(res=>{
					uni.showToast({
						title: '添加成功',
						icon: 'success'
					});
					this.popupVisible=false
					this.operate = ''
					this.getDevicesData()
				})
			},
			editDevicesDate(){
				editDevicesList(this.devicesData).then(res=>{
					uni.showToast({
						title: '修改成功',
						icon: 'success'
					});
					this.popupVisible=false
					this.operate = ''
					this.getDevicesData()
				})
			},
			onVisibleChange(e) {
				if (!this.devVisible) {
					this.popupVisible = e.detail.visible
				}
			},
			onVisibleIconChange(e) {
				this.devVisible = e.detail.visible
			},

			addDevice() {
				let userInfo = uni.getStorageSync('userInfo')
				this.popupVisible = true
				this.operateTitle = '添加设备'
				this.operateType='add',
				this.devicesData = {
					name: '',
					type: '',
					iconId: '',
					roomId:'',
					roomName: '',
					code: '',
					author:userInfo.openId
				}
			},
			onEdit(item) {
				this.popupVisible = true
				this.operateTitle = '编辑设备'
				this.devicesData = item
				this.operateType='edit'
			},
			onDelete(item) {
				deleteDevicesList(item).then(res=>{
					uni.showToast({
						title: '删除成功',
						icon: 'success'
					});
					this.getDevicesData()
				})
			},
			checkObject(obj) {
			  return Object.values(obj).every(value => value !== '');
			},
			saveDevice() {
				let flag=this.checkObject(this.devicesData)
				if (flag) {
					if(this.operateType=='add'){
						this.addDevicesData()
					}
					else if(this.operateType=='edit'){
						this.editDevicesDate()
					}
				}
				else{
					uni.showToast({
						title: '请输入完整信息',
						icon: 'error'
					});
				}
			},
			onCityPicker(e) {
				this.roomVisible = true
			},

			onPickerCancel(e) {
				this.roomVisible = false
				console.log(e, '取消');
			},
			onPickerConfirm(e) {
				this.roomVisible = false
				this.devicesData.roomName = e.detail.label[0]
				this.devicesData.roomId=e.detail.value[0]
				console.log(e)
			},
			getDeviceName(e) {
				this.devicesData.name = e.detail.value
			},
			onDevPop() {
				this.devVisible = true
			},
			chooseImg(item) {
				this.devicesData.code = item.code
				this.devicesData.iconId = item.icon
				this.devicesData.type=item.icon
				this.devVisible = false
			}
		}
	}
</script>

<style>
	page {
		background: #f6f6f6;
	}

	.roomList {
		margin-top: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.roomCard {
		margin-bottom: 20rpx;
	}

	.btn-wrapper {
		height: 100%;
	}

	.btn {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 120rpx;
		height: 100%;
		color: white;
	}

	.delete-btn {
		background-color: #e34d59;
	}

	.edit-btn {
		background-color: #ed7b2f;
	}

	.favor-btn {
		background-color: #0052d9;
	}

	.column {
		flex-direction: column;
	}

	.padding-bottom {
		padding-bottom: 8rpx;
	}

	.block {
		width: 80vw;
		height: 300px;
		background: #fff;
		border-radius: 16rpx;
		position: relative;
	}

	.popHeard {
		text-align: center;
		font-size: 36rpx;
		margin-top: 20rpx;
		margin-bottom: 10rpx;
	}

	.inputBox {
		height: 60%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.btnBox {
		position: absolute;
		bottom: 10rpx;
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.cardBoxbtn {
		background: #00aaff !important;
		--td-button-primary-border-color: #00aaff;
	}

	.cellImg {
		width: 72rpx;
		height: 72rpx;
	}

	.PopcellImg {
		width: 64rpx;
		height: 64rpx;
	}

	.devBlock {
		/*background: #fff;*/
		color: #333;
		align-items: center;
		justify-content: center;
	}

	.devWrapper {
		margin: 32rpx;
		display: block;
	}

	.devHeader {
		display: flex;
		align-items: center;
		height: 116rpx;
	}

	.devTitle {
		flex: 1;
		text-align: center;
		font-weight: 600;
		font-size: 36rpx;
	}

	.container {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
	}

	.columnIcon {
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
	}


	.columnImg {
		width: 96rpx;
		height: 96rpx;
	}

	.noneData {
		display: flex;
		margin-top: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		height: 300rpx;
		align-items: center;
		justify-content: center;
		background: #fff;
		border-radius: 16rpx;
	}
</style>
