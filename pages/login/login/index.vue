<template>
	<view :style="{height:scrollHeight + 'px',width:scrollWidth + 'px'}"
		class="flex-direction display-flex justify-center align-center">
		<view class="content">
			<view class="header">
				<image src="/static/login/logo.jpg"></image>
			</view>
			<view class="cu-load load-modal" v-if="requestLoading">
				<view class="gray-text">加载中...</view>
			</view>
			<view class="conceal">
				<button class="dlbutton" hover-class="dlbutton-hover" type="default" open-type="getPhoneNumber"
					@getphonenumber="getPhoneNumber" style="color: #FFFFFF;">微信授权登录</button>
				<view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
					<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
						<image :src="provider.image" @tap="oauth(provider.value)"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		MobileLogin
	} from '@/api/login.js';
	import {
		mapMutations
	} from 'vuex';
	export default {
		onReady() {
			this.initPosition();
			uni.hideTabBar({});
			uni.login({});
		},
		onLoad() {
			var that = this;
			uni.getSystemInfo({
				success: function(res) {
					that.scrollHeight = res.windowHeight;
					that.scrollWidth = res.windowWidth;
				}
			})
		},
		data() {
			return {
				requestLoading: false,
				providerList: [], //第三方oauthlist
				hasProvider: false, //是否有第三方授权
				positionTop: 0,
				openId: '',
				session_key: '',
				encryptedData: '',
				iv: '',
				scrollHeight: 0,
				scrollWidth: 0,
			};
		},
		methods: {
			...mapMutations(['setRoleId']),
			getPhoneNumber(e) {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						uni.checkSession({
							success: (checkRes) => {
								const param = {
									"code": res.code,
									"encryptedData": e.detail.encryptedData,
									"iv": e.detail.iv
								}
								this.requestLoading = true
								MobileLogin(param).then(res => {
									this.requestLoading = false;
									let user_type = uni.getStorageSync("userType");
									let type = user_type === 0 ? 'engineer' :
										user_type === 1 ? "market" : "client";
									this.setRoleId(type);
								})
							}
						})
					}
				})
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			oauth(value) { // oauth授权登录
				uni.login({
					provider: value,
					success: (res) => {
						uni.getUserInfo({
							provider: value,
							success: (infoRes) => {
								/**
								 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
								 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
								 */
								this.toMain(infoRes.userInfo.nickName);
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
			},
		}
	}
</script>
<style lang="scss">
	// 引入公共样式
	@import "../../../common/styles/my-style.css";

	.header {
		width: 161rpx;
		height: 161rpx;
		background: rgba(63, 205, 235, 1);
		box-shadow: 0rpx 12rpx 13rpx 0rpx rgba(63, 205, 235, 0.47);
		border-radius: 50%;
		margin-top: 30rpx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161rpx;
		height: 161rpx;
		border-radius: 50%;
	}

	.dlbutton {
		color: #FFFFFF;
		font-size: 34rpx;
		width: 470rpx;
		height: 100rpx;
		background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
		box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.2);
		border-radius: 50rpx;
		line-height: 100rpx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100rpx;
	}

	.dlbutton-hover {
		background: linear-gradient(-90deg, rgba(63, 205, 235, 0.9), rgba(188, 226, 158, 0.9));
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		width: 100rpx;
		height: 100rpx;
		border: 1rpx solid #dddddd;
		border-radius: 100rpx;
		margin: 0 40rpx;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 60rpx;
		height: 60rpx;
		margin: 20rpx;
	}
</style>
