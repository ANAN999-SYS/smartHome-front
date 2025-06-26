<template>
	<view>
		<pyh-nv :config="config"></pyh-nv>
		<view class="roomList" v-if="roomList">
			<view class="roomCard">
				<t-cell :bordered="false" title="全屋" note="无法改动" />
			</view>
			<view class="roomCard" v-for="(item,index) in roomList" :key="index">
				<t-swipe-cell>
					<t-cell :bordered="false" :title="item.name" note="左划操作" />
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
			<view>暂无房间信息</view>
		</view>
		<view style="height: 50rpx;"></view>
		<t-fab icon="add" :draggable="true" style="position: fixed;z-index: 3;" @click="addRoom"></t-fab>
		<t-popup :visible="popupVisible" @visible-change="onVisibleChange" placement="center">
			<view class="block">
				<view class="popHeard">{{popupTitle}}</view>
				<view class="inputBox">
					<t-input label="名称" type="text" :value="roomName" clearable @blur="getDeviceName" />
				</view>
				<view class="btnBox">
					<t-button t-class="cardBoxbtn" theme="primary" size="medium" shape="round" hover-class="none"
						@tap="subRoom">保存</t-button>
				</view>
			</view>
		</t-popup>
		<t-dialog id="t-dialog" />
	</view>
</template>

<script>
	import {
		addRoomList,
		editRoomList,
		deleteRoomList,
		getRoomList
	} from "@/request/api.js"
	import Dialog from '@/wxcomponents/tdesign/dialog/index.js'
	export default {
		data() {
			return {
				config: {
					title: "房间管理",
					back: {
						iconForce: true,
					},
					bgColor: "linear-gradient(to bottom, #56ccf2, #42a6ef)",
					color: "#fff"
				},
				roomList: [],
				roomName: '',
				popupVisible: false,
				popupTitle: '',
				operate: '',
				editData: null
			}
		},
		onLoad() {
			this.getRoomData()
		},
		methods: {
			getRoomData() {
				getRoomList().then(res => {
					if(res.data.length==0){
						this.roomList=null
					}
					else{
						this.roomList = res.data
					}
				})
			},
			onVisibleChange(e) {
				this.popupVisible = e.detail.visible
			},
			getDeviceName(e) {
				this.roomName = e.detail.value
			},
			addRoom() {
				this.popupVisible = true
				this.popupTitle = '添加房间'
				this.operate = 'add'
				this.roomName = ''
			},
			onEdit(item) {
				this.popupVisible = true
				this.popupTitle = '编辑房间'
				this.operate = 'edit'
				this.editData = {
					...item
				}
			},
			onDelete(item) {
				const dialogConfig = {
					context: this,
					title: '提示',
					content: '删除房间后该房间设备将平铺在全部分类下',
					cancelBtn: '取消',
					confirmBtn: '确认'
				};

				Dialog.confirm(dialogConfig)
					.then(() => {
						console.log('点击确定');
						deleteRoomList(item).then(res=>{
							uni.showToast({
								title: '删除成功',
								icon: 'success'
							});
							this.getRoomData()
						})
					})
					.catch(() => {
						console.log('点击取消');
					});
			},
			addRoomData() {
				let userInfo = uni.getStorageSync('userInfo')
				console.log(userInfo)
				let data = {
					name: this.roomName,
					author: userInfo.openId
				}
				console.log(data)
				addRoomList(data).then(res => {
					uni.showToast({
						title: '添加成功',
						icon: 'success'
					});
					this.roomName = ''
					this.operate = ''
					this.popupVisible = false
					this.getRoomData()
				})
			},
			editRoomData() {
				let data=this.editData
				data.name=this.roomName
				editRoomList(data).then(res => {
					uni.showToast({
						title: '修改成功',
						icon: 'success'
					});
					this.roomName = ''
					this.operate = ''
					this.editData = null
					this.popupVisible = false
					this.getRoomData()
				})
			},
			subRoom() {
				if (this.roomName !== '') {
					if (this.operate === 'add') {
						this.addRoomData()
					} else if (this.operate === 'edit') {
						this.editRoomData()
					}
				} else {
					uni.showToast({
						title: '请输入完整信息',
						icon: 'error'
					});
				}
			}
		},
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
		height: 240px;
		background: #fff;
		border-radius: 16rpx;
		position: relative;
	}

	.popHeard {
		text-align: center;
		font-size: 36rpx;
		margin-top: 20rpx;
	}

	.inputBox {
		height: 60%;
		display: flex;
		align-items: center;
		margin-left: 20rpx;
		margin-right: 20rpx;
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
