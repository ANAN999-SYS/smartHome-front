<template>
	<view>
		<pyh-nv :config="config"></pyh-nv>
		<view class="feedbackList" v-if="feedbackList">
			<view class="feedbackCard" v-for="(item,index) in feedbackList" :key="index">
				<t-cell align="middle" t-class-title="cellTitle" :title="item.createTime" :bordered="false">
					<view slot="image">
						<image @tap="onClick(item.imageUrl)" class="image" :src="item.imageUrl[0].url" />
					</view>
					<view slot="description">
						<view class="cellTip" @tap="onFeedbackMsg(item.feedbackMsg)">{{item.feedbackMsg}}</view>
					</view>
					<view slot="note">
						<view :class="item.state =='false' ? 'cellNote1' : 'cellNote'">{{item.state =="false" ? '待处理' : '已处理'}}</view>
					</view>
				</t-cell>
			</view>
			<view style="height: 30rpx;"></view>
		</view>
		<view v-else class="noneCard">
			<view class="noneTitle">暂无反馈信息</view>
		</view>
		<t-image-viewer :showIndex="showIndex" :using-custom-navbar="true" :visible="visible" :images="images"
			@close="onClose"></t-image-viewer>
		<t-popup :visible="feedbackMsgVisible" @visible-change="onVisibleChange" placement="center">
			<view class="de_block">
				<view class="deId_box">
					<view class="deId_Tip">反馈详情</view>
					<view class="deId_text">{{feedbackMsg}}</view>
				</view>
			</view>
		</t-popup>
	</view>
</template>

<script>
	import {
		getFeedback
	} from "@/request/api.js"
	export default {
		data() {
			return {
				config: {
					title: "反馈记录",
					back: {
						iconForce: true,
					},
					bgColor: "linear-gradient(to bottom, #56ccf2, #42a6ef)",
					color: "#fff"
				},
				feedbackList: null,
				visible: false,
				showIndex: false,
				images: [],
				feedbackMsg: '',
				feedbackMsgVisible: false
			}
		},
		onLoad() {
			this.getFeedbackList()
		},
		methods: {
			getFeedbackList() {
				getFeedback().then(res => {
					if (res.data.length !== 0) {
						this.feedbackList = res.data
					} else {
						this.feedbackList = null
					}
				})
			},
			onClick(imgList) {
				this.images = imgList.map(item => {
					return item.url;
				});
				this.showIndex = true
				this.visible = true
			},
			onFeedbackMsg(data) {
				this.feedbackMsgVisible = true
				this.feedbackMsg = data
			},
			onVisibleChange(e) {
				this.feedbackMsgVisible = e.detail.visible
			},
			onClose(e) {
				let trigger = e.detail;
				console.log(trigger)
				this.visible = false
			},
		}
	}
</script>

<style>
	page {
		background: #f6f6f6;
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

	.feedbackList {
		margin: 0 20rpx 0 20rpx;
	}

	.cellTitle {
		font-size: 26rpx !important;
	}

	.image {
		width: 116rpx;
		height: 116rpx;
	}

	.cellNote {
		min-width: 54rpx !important;
		color: #11aa66 !important;
	}

	.cellNote1 {
		min-width: 54rpx !important;
		color: #f1c083 !important;
	}

	.cellTip {
		width: 220px !important;
		white-space: nowrap !important;
		overflow: hidden !important;
		text-overflow: ellipsis !important;
	}

	.feedbackCard {
		margin-top: 20rpx;
	}

	.de_block {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 400px;
		min-height: 120px;
		background: #fff;
		border-radius: 16rpx;
	}

	.deId_box {}

	.deId_text {
		margin-bottom: 20rpx;
		width: 340px
	}

	.deId_Tip {
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		text-align: center;
	}
</style>
