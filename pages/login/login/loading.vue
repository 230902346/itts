<template>
	<view :style="{height:scrollHeight + 'px',width:scrollWidth + 'px'}">
		<view>
			<ourLoading isFullScreen active text="加载中" class="center" />
		</view>
	</view>
</template>

<script>
	import {
		MobileLogin
	} from '@/api/login.js'
	const appId = 'wxec0ea3967e0cbb4d';
	const secret = 'f1b7e550498e04ab984c334b16453fb7';
	export default {
		data() {
			return {
				scrollHeight: 0,
				scrollWidth: 0
			};
		},
		onLoad: function() {
			var that = this;
			uni.getSystemInfo({
				success: function(res) {
					that.scrollHeight = res.windowHeight;
					that.scrollWidth = res.windowWidth;
				}
			})
		},
		onReady() {
			uni.clearStorageSync();
			uni.clearStorage();
			uni.hideTabBar({});
			uni.getStorage({
				key: 'storage_token',
				success: function(res) {
					let storage_token = res.data;
					if (res.data) {
						uni.login({
							provider: 'weixin',
							success: (res) => {
								uni.request({
									method: 'GET',
									url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' +
										appId +
										'&secret=' + secret + '&js_code=' + res.code +
										'&grant_type=authorization_code',
									success: (res) => {
										let openId = res.data.openid;
										const param = {
											token: storage_token,
											openid: openId
										}
										MobileLogin(param).then(res => {});
									}
								})
							}
						});
					}
				},
				fail: function(res) {
					if (res.errMsg == "getStorage:fail data not found") {
						console.log("无token!");
						uni.reLaunch({
							url: '/pages/login/login/index'
						});
					}
				}
			});
		},
	}
</script>

<style lang="scss">
</style>
