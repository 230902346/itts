<template>
	<view class="page">
		<my-custom bgColor="bg-gradual-gray">
			<block slot="content">知识库</block>
		</my-custom>
		<view>
			<u-search placeholder="请输入搜索内容" v-model="keyword" :clearabled="true" :show-action="true" action-text="搜索"
				:animation="true"></u-search>
		</view>
		<u-tabbar :list="tabBarList" :active-color="activeColor" :inactive-colot="inactiveColor"></u-tabbar>
	</view>
</template>

<script>
	import {
		MobileRepository
	} from '@/api/login.js'
	export default {
		data() {
			return {
				keyword: "123",
				//可见高
				scrollHeight: 0,
				//可见宽
				scrollWidth: 0,
				// 底部tabber
				tabBarList: {}
			}
		},
		onLoad() {
			uni.hideTabBar({});
			var that = this;
			//获取缓存中的tabbar数据
			MobileRepository().then(res => {
				console.log(res);
			});
			let tabBarList = uni.getStorageSync('tabBarList');
			that.tabBarList = tabBarList;
			//Load初始化获取当前手机的可见宽高
			uni.getSystemInfo({
				success: function(res) {
					that.scrollHeight = res.windowHeight;
					that.scrollWidth = res.windowWidth;
				}
			});
		}
	}
</script>

<style lang="scss" scoped>
	* {
		margin: 0;
		padding: 0;
	}

	.pages {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
