<template>
	<view>
		<pyh-nv :config="config"></pyh-nv>
		<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="chooseAvatar">
			<image class="avatar" :src="avatarUrl"></image>
		</button>
		<form @submit="formSubmit">
			<view class="row">
				<text class="text1">昵称：</text>
				<input type="nickname" class="weui-input" name="nickname" placeholder="请输入昵称" v-model="nickName" />
			</view>
			<button type="primary"  class="btn"
				form-type="submit">保存</button>
		</form>
	</view>
</template>

<script>
	import {editUserInfo} from"@/request/api.js"
	export default {
		data() {
			return {
				config: {
					title: "个人设置",
					back: {
						iconForce: true
					},
					bgColor: "linear-gradient(to bottom, #56ccf2, #42a6ef)",
					color: "#fff"
				},
				avatarUrl: '', // 设置头像图片链接
				nickName: '', // 昵称
				openId:'',
				// upPicUrl:'http://172.29.35.235:9999/weixin/uploadImg',
				upPicUrl:'https://wx.wlsx.fun:9999/weixin/uploadImg',
				chooseAvatarKey:false
			};
		},
		onLoad() {
			let userInfo = uni.getStorageSync("userInfo")
			this.avatarUrl=userInfo.avatarUrl
			this.nickName=userInfo.nickName
			this.openId=userInfo.openId
			this.chooseAvatarKey=false
		},
		methods: {
			chooseAvatar(e) {
				this.avatarUrl = e.detail.avatarUrl
				this.chooseAvatarKey=true
			},
			formSubmit(e) {
				let userInfo = uni.getStorageSync("userInfo")
				userInfo.nickName=e.detail.value.nickname
				if(this.chooseAvatarKey){
					uni.uploadFile({
						url: this.upPicUrl,
						filePath: this.avatarUrl,
						name: 'imgFile',
						header: {
							'Authorization': uni.getStorageSync('token') || ''
						},
						success: uploadRes => {
							uploadRes = JSON.parse(uploadRes.data);
							userInfo.avatarUrl=uploadRes.data
							this.editUserInfoData(userInfo)
						},
						fail: e => {
							uni.showToast({
								title: '上传失败',
								icon: 'none'
							});
						}
					})
				}else{
					this.editUserInfoData(userInfo)
				}
			},
			editUserInfoData(userInfo){
				editUserInfo(userInfo).then(res=>{
					uni.setStorageSync("userInfo",userInfo)
					uni.showToast({
						title: '设置成功',
						icon: 'success'
					});
					uni.navigateBack()
				})
			}
		}
	};
</script>
<style>
	.avatar-wrapper {
		padding: 0;
		width: 200rpx !important;
		border-radius: 8px;
		margin-top: 40px;
		margin-bottom: 40px;
		background-color: #fff;
	}

	.avatar {
		display: block;
		width: 200rpx;
		height: 200rpx;
	}

	.container {
		display: flex;
	}

	.row {
		border-top: 1px solid rgb(204, 204, 204);
		border-bottom: 1px solid #ccc;
		display: flex;
		align-items: center;
		height: 80rpx;
		padding-left: 20rpx;
	}

	.text1 {
		flex: 2;
	}

	.weui-input {
		flex: 6;
	}
	.btn{
		background: #409eff !important;
		margin-top: 80rpx;
		margin-bottom: 20rpx;
		width: 320rpx
	}
</style>
