<template>
	<view>
		<pyh-nv :config="config"></pyh-nv>
		<view class="roomList" v-if="scenarioList">
			<view class="roomCard" v-for="(item,index) in scenarioList" :key="index">
				<t-swipe-cell>
					<t-cell :bordered="false" :title="item.name" note="左划操作">
						<view slot="image">
							<image class="cellImg" :src="`../../static/scens/${item.iconId}.png`"></image>
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
			<view>暂无情景信息</view>
		</view>
		<view style="height: 50rpx;"></view>
		<t-fab icon="add" :draggable="true" style="position: fixed;z-index: 3;" @click="addScens"></t-fab>
		
	</view>
</template>

<script>
	import{getScenario,deleteScenario}from"@/request/api.js"
	export default {
		data() {
			return {
				config: {
					title: "情景管理",
					back: {
						iconForce: true,
					},
					bgColor: "linear-gradient(to bottom, #56ccf2, #42a6ef)",
					color: "#fff"
				},
				scenarioList: null
			}
		},
		onLoad() {
			
		},
		onShow() {
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
			addScens(e) {
				console.log(e)
				let title='添加情景'
				let operateType='add'
				uni.navigateTo({
					url:`/pages/scenarioEdit/scenarioEdit?title=${title}&operateType=${operateType}`
				})
			},
			onEdit(item) {
				let title='编辑情景'
				let operateType='edit'
				let sId=item.sid
				uni.navigateTo({
					url:`/pages/scenarioEdit/scenarioEdit?title=${title}&operateType=${operateType}&sId=${sId}`
				})
			},
			onDelete(item) {
				deleteScenario(item).then(res=>{
					uni.showToast({
						title: '删除成功',
						icon: 'success'
					});
					this.getScenarioList()
				})
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

	.popImgCard {
		max-height: 320rpx;
		overflow: auto;
	}

	.columnImg {
		width: 96rpx;
		height: 96rpx;
	}
	.noneData{
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
