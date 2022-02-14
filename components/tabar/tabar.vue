<!-- <template>
	<view>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-curbar="Home" data-cur="/pages/market/index">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/home_page' + [vuex_PageCur == 'Home'?'_hover':''] + '.png'"></image>
				</view>
				<view :class="vuex_PageCur=='Home'?'text-blue':'text-gray'">首页</view>
			</view>
			<view class="action" @click="NavChange" data-curbar="order" data-cur="/pages/client/order">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/order' + [vuex_PageCur == 'order'?'_hover':''] + '.png'"></image>
				</view>
				<view :class="vuex_PageCur=='order'?'text-blue':'text-gray'">工单</view>
			</view>
			<view class="action" @click="NavChange" data-curbar="market" data-cur="/pages/market/index">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/property' + [vuex_PageCur == 'market'?'_hover':''] + '.png'"></image>
				</view>
				<view :class="vuex_PageCur=='market'?'text-blue':'text-gray'">资产信息</view>
			</view>
			<view class="action" @click="NavChange" data-curbar="market" data-cur="/pages/market/index">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/contacts' + [vuex_PageCur == 'market'?'_hover':''] + '.png'"></image>
				</view>
				<view :class="vuex_PageCur=='market'?'text-blue':'text-gray'">联系人</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		mounted() {
			// 采用自定义tabbar，需首先隐藏原生tabbar。
			uni.hideTabBar();
		},
		data() {
			return {}
		},
		methods: {
			handlePageCur(pageCur) {
				this.$u.vuex('vuex_PageCur', pageCur);
			},
			NavChange: function(e) {
				this.handlePageCur(e.currentTarget.dataset.curbar)
				// tabar页面跳转需用switchTab方式，启用pages.json相关tabbar设置。
				uni.switchTab({
					url: e.currentTarget.dataset.cur
				});
			},
			navTo(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.cur
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-action {
		height: 42px !important;

		.cuIcon-cu-image {
			height: 30px !important;
			padding-top: 3px;

			.cuIcon-edit {
				font-size: 22px;
				margin-bottom: 0px;
			}
		}
	}

	.my-add-action {
		padding-top: 4px;
	}
</style>
 -->

<template>
	<view class="tarbar">
		<view class=".tarbar-list" :style="{
                 background: tabBar.backgroundColor,
                 color: tabBar.color,
                 'border-top': tabBar.position == 'bottom' ? '1rpx solid ' + tabBar.borderStyle : 0,
                 'border-bottom': tabBar.position == 'top' ? '1rpx solid ' + tabBar.borderStyle : 0
             }">
			<view class="tarbar-list-ul">
				<view class="tarbar-list-li" :class="item.isShow == true ? 'tarbar-list-li-center' : ''"
					v-for="(item, index) in tabBar.list" :key="index" @click.top="setSelected(index)">
					<block v-if="item.isShow == false">
						<view class="tarbar-list-li-icon">
							<image :src="selected == index ? item.selectedIconPath : item.iconPath" mode=""></image>
						</view>
						<view :class="selected == index?'tarbar-list-li-name act':'tarbar-list-li-name'">{{ item.text }}
						</view>
					</block>
					<block v-else>
						<view style="width: 120rpx;height: 120rpx;" class="tarbar-list-li-icon">
							<image style="width: 120rpx;height: 120rpx;" :src="item.selectedIconPath" mode=""></image>
						</view>

					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		// 组件传值（selected）索引对应默认从0开始
		props: ['selected'],
		data() {
			return {
				isshow: 0,
				tabBar: {
					color: '#333',
					selectedColor: '#E84351',
					borderStyle: '#ccc',
					backgroundColor: '#fff',
					position: 'bottom',
					list: [{
							pagePath: '/pages/client/index',
							text: '招聘大厅',
							isShow: false,
						},
						{
							pagePath: '/pages/tabbar/tabbar-4/tabbar-4',
							text: '消息',
							isShow: false,
						},
						{
							pagePath: '/pages/tabbar/tabbar-5/tabbar-5',
							text: '我的',
							isShow: false,
						},
						{
							pagePath: '/pages/client/index',
							text: '招聘大厅',
							isShow: false,
						}
					]
				},
			};
		},
		onReady() {
			uni.hideTabBar({

			});
		},
		onLoad() {
			var that = this;
			let userType = uni.getStorageSync('userType');
			console.log(userType);
			that.isshow = userType;
		},
		mounted() {
			if (this.isshow == 2) {
				this.tabBar.list.splice(1, 0, {
					pagePath: '/pages/tabbar/tabbar-2/tabbar-2',
					text: '人才推荐',
					isShow: false,
				}, {
					pagePath: '/pages/tabbar/tabbar-3/tabbar-3',
					text: '发布',
					isShow: true,
				})
			}
		},
		methods: {
			setSelected(index) {
					uni.switchTab({
						url: this.tabBar.list[index].pagePath
					});
			},
		}
	};
</script>

<style>
	.tarbar {
		width: 100%;
		z-index: 9999;
		position: fixed;
	}

	.tarbar-list {
		width: 100%;
		height: 100upx;
		background: #DFDFDF;
		position: fixed;
		left: 0;
		bottom: 0;
	}

	.tarbar-list-ul {
		width: 100%;
		height: 100%;
		/* padding-top: 20upx; */
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
	}

	.tarbar-list-li {
		/* width: 80upx;
 		height: 80upx; */
	}

	.tarbar-list-li-icon {
		width: 56upx;
		height: 56upx;
		margin: 0 auto;
	}

	.tarbar-list-li-icon image {
		width: 56upx;
		height: 56upx;
	}

	.tarbar-list-li-name {
		width: 100%;
		text-align: center;
		line-height: 30upx;
		font-size: 20upx;
		height: 30upx;
	}

	.act {
		color: #007AFF;
	}

	.tarbar-list-li-center {
		width: 120rpx;
		height: 120rpx;
		margin-bottom: 80rpx;
	}

	.tarbar-list-li-center .tarbar-list-li-icon,
	.tarbar-list-li-center .tarbar-list-li-icon image {
		width: 90upx;
		height: 60upx;
	}
</style>
