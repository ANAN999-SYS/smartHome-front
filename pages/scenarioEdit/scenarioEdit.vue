<template>
	<view>
		<pyh-nv :config="config"></pyh-nv>
		<view class="HeaderBox">
			<view class="deviceTitle">情景信息</view>
			<t-cell t-class="cellBox" title="选择图标" :note="scensData.iconId" hover arrow @click="getIcon">
				<view slot="image">
					<image class="cellImg"
						:src="`../../static/scens/${scensData.iconId ? scensData.iconId : 'setting'}.png`"></image>
				</view>
			</t-cell>
			<t-cell title="情景名称" :note="scensData.name ? scensData.name :'未设置'" hover arrow :bordered="false"
				@click="getScensName" />

		</view>
		<view class="deviceBox">
			<view class="deviceTitle">设备信息</view>
			<view v-for="(item,index) in scensData.operate" :key="index">
				<t-swipe-cell>
					<t-cell t-class="cellBox" :title="item.name" :description="item.room" hover>
						<t-switch :defaultValue="item.operate ? item.operate :false" :value="item.operate" slot="note"
							:icon="['wifi','wifi-off']" @change="onAndOff(item)"/>
					</t-cell>
					<view slot="right" class="btn delete-btn" @tap="onDelete(item,index)">删除</view>
				</t-swipe-cell>
			</view>
			<view class="addCard" @tap="chooseDevice">
				<t-icon name="add-circle" color="#42a6ef" size="48rpx" data-name="add-circle" bind:click="onIconTap" />
				<view style="margin-left: 8rpx;">添加设备</view>
			</view>
		</view>
		<view style="height: 50rpx;"></view>
		<t-fab icon="check" :draggable="true" style="position: fixed;z-index: 3;" @click="addScens"></t-fab>
		<t-popup :visible="scensVisible" @visible-change="onVisibleIconChange" placement="bottom">
			<view class="devBlock">
				<view class="devHeader">
					<view class="devTitle">选择图标</view>
				</view>
			</view>
			<view>
				<scroll-view scroll-y style="height: 335rpx;">
				<view class="container">
					<view v-for="(item,index) in iconList" :key="index" :data-code="item.code" class="columnIcon">
						<image class="columnImg" :src="`../../static/scens/${item.icon}.png`" @tap="chooseImg(item)">
						</image>
					</view>
				</view>
				</scroll-view>
			</view>
			<view style="height: 30rpx;"></view>
		</t-popup>
		<t-popup :visible="nameVisible" @visible-change="onVisibleChangeinput" placement="center">
			<view class="block">
				<view class="popHeard">情景名称</view>
				<view class="inputBox">
					<t-input placeholder="请输入名称" type="text" clearable @blur="getName" />
				</view>
				<view class="btnBox">
					<t-button t-class="cardBoxbtn" theme="primary" size="medium" shape="round" hover-class="none"
						@tap="saveName">保存</t-button>
				</view>
			</view>
		</t-popup>
	</view>
</template>

<script>
	import{editScenario,addScenario,getScenarioBySid}from"@/request/api.js"
	export default {
		data() {
			return {
				config: {
					title: "",
					back: {
						iconForce: true,
					},
					bgColor: "linear-gradient(to bottom, #56ccf2, #42a6ef)",
					color: "#fff"
				},
				scensVisible: false,
				iconList: [{
						code: '回家',
						icon: 'goHome'
					},
					{
						code: '离家',
						icon: 'leaveHome'
					},
					{
						code: '休闲',
						icon: 'leisure'
					},
					{
						code: '睡眠',
						icon: 'sleep'
					},
					{
						code: '其他',
						icon: 'other'
					}
				],
				scensData: {
					name: '',
					iconId: '',
					operate: null,
					author:'',
					mode:'手动执行'
				},
				operateType:'',
				nameVisible: false,
				scensName: '',
			}
		},
		onLoad(opt) {
			console.log(opt)
			this.config.title = opt.title
			this.operateType=opt.operateType
			if(opt.operateType=='edit'){
				this.getScenarioData(opt.sId)
			}
		},
		onShow() {
			let davicesData = uni.getStorageSync("checkDivices")
			if(davicesData){
				this.scensData.operate = davicesData.map(item => {
					return {
						...item,
						operate: false
					};
				});
			}
		},
		methods: {
			getScenarioData(sid){
				let data={
					sId:sid
				}
				getScenarioBySid(data).then(res=>{
					this.scensData=res.data
				})
			},
			addScenarioData(){
				addScenario(this.scensData).then(res=>{
					uni.removeStorageSync('checkDivices')
					uni.showToast({
						title: '添加成功',
						icon: 'success',
						success() {
							uni.navigateBack()
						}
					});
				})
			},
			editScenarioData(){
				editScenario().then(res=>{
					uni.removeStorageSync('checkDivices')
					uni.showToast({
						title: '添加成功',
						icon: 'success',
						success() {
							uni.navigateBack()
						}
					});
				})
			},
			onVisibleIconChange(e) {
				this.scensVisible = e.detail.visible
			},
			onVisibleChangeinput(e) {
				this.nameVisible = e.detail.visible
			},
			getScensName() {
				this.nameVisible = true
			},
			getIcon() {
				this.scensVisible = true
			},
			chooseImg(item) {
				this.scensData.iconId = item.icon
				this.scensVisible = false
			},
			getName(e) {
				this.scensName = e.detail.value
			},
			saveName() {
				this.scensData.name = this.scensName
				this.nameVisible = false
			},
			onDelete(item,index){
				this.scensData.operate.splice(index,1)
				uni.setStorageSync('checkDivices',this.scensData.operate)
			},
			onAndOff(item){
				item.operate=!item.operate
			},
			checkObject(obj) {
			  return Object.values(obj).every(value => value !== ''&& value !== null);
			},
			addScens(e) {
				let userInfo = uni.getStorageSync('userInfo')
				this.scensData.author=userInfo.openId
				let flag=this.checkObject(this.scensData)
				console.log(this.scensData)
				if (flag) {
					if(this.operateType=='add'){
						this.addScenarioData()
					}
					else if(this.operateType=='edit'){
						this.editScenarioData()
					}
				}
				else{
					uni.showToast({
						title: '请输入完整信息',
						icon: 'error'
					});
				}
			},
			chooseDevice() {
				uni.navigateTo({
					url: '/pages/chooseDevice/chooseDevice'
				})
			}
		}
	}
</script>

<style>
	page {
		background: #f6f6f6;
	}

	.HeaderBox {
		margin: 20rpx 20rpx;
	}

	.cellBox {
		padding-top: 20rpx !important;
		padding-bottom: 20rpx !important;
	}

	.cellImg {
		width: 88rpx;
		height: 88rpx;
	}

	.deviceBox {
		margin: 20rpx 20rpx;
	}

	.deviceTitle {
		font-size: 28rpx;
		margin-bottom: 10rpx;
		padding-left: 2rpx;
	}

	.addCard {
		height: 100rpx;
		background: white;
		display: flex;
		align-items: center;
		justify-content: center;
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

</style>
