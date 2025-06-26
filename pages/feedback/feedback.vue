<template>
	<view>
		<pyh-nv :config="config"></pyh-nv>
		<view class="cardBox">
			<t-textarea t-class="external-class" :maxlength="220" placeholder="请输入220字以内信息" :indicator="true" :value="conslut.feedbackMsg" :disableDefaultPadding="true" @blur="input" />
			<view class="imgBox">
				<t-upload t-class="img" :mediaType="['image']" :max="3" :files="fileList" gutter="16" @add="handleAdd"
					@remove="handleRemove">
				</t-upload>
			</view>
			<view class="btnBox">
				<t-button t-class="cardBoxbtn" theme="primary" size="medium" shape="round" hover-class="none"
					@tap="submit">提交
				</t-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		userFeedback
	} from "@/request/api.js"
	export default {
		data() {
			return {
				config: {
					title: "意见反馈",
					back: {
						iconForce: true,
					},
					bgColor: "linear-gradient(to bottom, #56ccf2, #42a6ef)",
					color: "#fff"
				},
				fileList: [],
				conslut: {
					feedbackMsg: '',
					imageUrl: []
				},
				upPicUrl:'https://wx.wlsx.fun:9999/Feedback/uploadImg',
				// 图片模式
				imgMode: {
					type: String,
					default: 'widthFix'
				},
				// 携带的请求头
			}
		},
		methods: {
			handleAdd(e) {
				let files = e.detail.files
				files.forEach(file => this.uploadFile(file))

			},
			handleRemove(e) {
				console.log(e)
				let index = e.detail.index
				this.fileList.splice(index, 1);
			},
			uploadFile(file) {
				console.log(file)
				let size = file.size / 1024 / 1024
				if (size < 20) {
					uni.uploadFile({
						url: this.upPicUrl,
						filePath: file.url,
						name: 'imgFile',
						header: {
							'Authorization': uni.getStorageSync('token') || ''
						},
						success: uploadRes => {
							uploadRes = JSON.parse(uploadRes.data);
							this.fileList.push(uploadRes.data)
							this.conslut.imageUrl.push(uploadRes.data)
							uni.showToast({
								title: '上传成功',
								icon: 'success'
							});
						},
						fail: e => {
							uni.showToast({
								title: '上传失败',
								icon: 'none'
							});
						}
					})
				} else {
					uni.showToast({
						title: '上传失败，图片过大',
						icon: 'error',
						duration: 2000
					});
				}

			},
			input(e) {
				this.conslut.feedbackMsg = e.detail.value
			},
			submit() {
				let userInfo = uni.getStorageSync("userInfo")
				let data = {
					author: userInfo.openId,
					avatarUrl: userInfo.avatarUrl,
					feedbackMsg: this.conslut.feedbackMsg,
					nickname: userInfo.nickName,
					imageUrl: this.conslut.imageUrl
				}
				userFeedback(data).then(res=>{
					uni.showToast({
						title: '反馈成功',
						icon: 'success'
					});
					this.conslut={
						feedbackMsg: '',
						imageUrl:[]
					}
					this.fileList=[]
				})
			}
		},
	}
</script>

<style>
	page {
		background: #f6f6f6;
	}

	.cardBox {
		background-color: white;
		margin: 20rpx;
		padding: 20rpx;
		border-radius: 16rpx;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
	}

	.imgBox {
		border-top: 1px solid #e2e2e2;
		border-bottom: 1px solid #e2e2e2;
	}
	.img{
		
	}
	.btnBox {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.cardBoxbtn {
		background: #00aaff !important;
		--td-button-primary-border-color: #00aaff;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
</style>
