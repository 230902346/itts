<template>
	<view class="page" :style="{height:scrollHeight + 'px',width:scrollWidth + 'px'}">
		<my-custom bgColor="bg-gradual-gray" :isBack="false">
			<block slot="content">工单</block>
		</my-custom>
		<view class="my-mt20rpx">
			<view class="display-flex margin-auto orderProess">
				<u-dropdown>
					<u-dropdown-item v-model="orderProcess" title="- - - - 请选择工单状态- - - -" :options="orderOptions"
						@change="changeOptions">
					</u-dropdown-item>
				</u-dropdown>
			</view>
		</view>
		<view class="content-size display-flex flex-direction justify-center margin-auto margin-top4"
			v-for="(item,index) in orderInfo" :key="index" @click="clickOrderInfo(item)">
			<view class="display-flex" style="height: 20%;">
				<image class="content-size-order-number-size my-pl10rpx" src="../../static/img/icon_order.png">
				</image>
				<text class="content-size-order-number-text my-ml10rpx" v-if="item.orderId != null">
					工单编号：{{item.orderNum}} </text>
				<text class="content-size-order-number-text my-ml10rpx" v-if="item.orderId == null">
					工单编号：{{item.eventId}} </text>
				<image class="content-size-order-number-size" src="../../static/img/icon_underway_blue.png"
					v-if="item.orderProcess == 30"></image>
				<image class="content-size-order-number-size" src="../../static/img/icon_accomplish_blue.png"
					v-if="item.orderProcess == 31"></image>
				<image class="content-size-order-number-size" src="../../static/img/icon_underway.png"
					v-if="item.orderProcess == 40"></image>
			</view>
			<view class="content-size-orderProcess my-pl20rpx" style="height: 35%;">
				<text class="my-f-s">工单状态：<text class="my-f-type-green">{{orderInfoText[index]}}</text></text>
				<text v-if="item.appointTime != null" class="my-mt15rpx my-f-s display-block">预约时间：<text
						class="my-f-black">{{item.appointTime}}</text></text>
				<text v-if="item.appointTime == null" class="my-mt15rpx my-f-s display-block">预约时间：<text
						class="my-f-black">暂无预约时间</text></text>
			</view>
			<view class="content-size-button" style="height: 30%;">
				<view class="margin-top4 float-right display-flex">
					<u-button type="warning" ripple="true" v-if="item.orderProcess == 30"
						class="my-mr30rpx">转 回</u-button>
					<u-button type="primary" ripple="true" v-if="item.orderProcess == 30"
						class="my-mr30rpx">受 理</u-button>
					<u-button type="primary" size="medium" ripple="true" v-if="item.orderProcess == 31"
						class="my-mr30rpx">服 务 预 约</u-button>
					<u-button type="primary" size="medium" ripple="true"
						v-if="item.orderProcess == 40 && item.orderServiceStatus == 44" class="my-mr30rpx">开 始 服 务
					</u-button>
					<u-button type="primary" size="medium" ripple="true"
						v-if="item.orderProcess == 40 && item.orderServiceStatus == 45" class="my-mr30rpx">服 务 完 成
					</u-button>
					<u-button type="primary" size="medium" ripple="true"
						v-if="item.orderProcess == 40 && item.orderServiceStatus == 46" class="my-mr30rpx">再 次 服 务
					</u-button>
					<u-button type="error" size="medium" ripple="true"
						v-if="item.orderProcess == 40 && item.orderServiceStatus == 46" class="my-mr30rpx">结 束 服 务
					</u-button>
				</view>
			</view>
		</view>
		<u-tabbar :list="tabBarList" :active-color="activeColor" :inactive-colot="inactiveColor"></u-tabbar>
	</view>
</template>

<script>
	import {
		MobileOrderProcess,
		MobileOrder,
	} from '@/api/login.js'
	export default {
		onLoad() {
			uni.hideTabBar({});
			var that = this;
			//初始化获取当前角色
			let user_type = uni.getStorageSync("userType");
			that.userType = user_type;
			//初始化设置可见宽高
			uni.getSystemInfo({
				success: function(res) {
					that.scrollHeight = res.windowHeight;
					that.scrollWidth = res.windowWidth;
				}
			});
			//获取缓存中的tabbar数据
			let tabBarList = uni.getStorageSync('tabBarList');
			that.tabBarList = tabBarList;
			//查询工单列表并刷新工单列表
			this.refreshOrderProcess();
		},
		data() {
			return {
				//可见高
				scrollHeight: 0,
				//可见宽
				scrollWidth: 0,
				// 底部tabber
				tabBarList: {},
				//工单状态图片地址
				activeColor: "#2979FF", // 选中时的颜色
				inactiveColor: "#000", // 未选中时的颜色
				orderProcess: 0,
				orderOptions: [],
				orderInfo: {},
				orderInfoText: {},
				userType: 0
			}
		},
		methods: {
			// 触发复制方法
			copy() {
				uniCopy({
					content: 'uni复制插件',
					success: (res) => {
						uni.showToast({
							title: "123",
							icon: 'none'
						})
					},
					error: (e) => {
						uni.showToast({
							title: e,
							icon: 'none',
							duration: 3000,
						})
					}
				})
			},
			//刷新工单状态
			refreshOrderProcess(value) {
				var that = this;
				const param = {
					process: value
				}
				MobileOrder(param).then(res => {
					console.log(res);
					const orderInfo = res.data.rows;
					that.orderInfo = orderInfo;
					MobileOrderProcess().then(res => {
						let orderDictValue = [];
						for (var j = 0; j < orderInfo.length; j++) {
							for (var k = 0; k < res.data.rows.length; k++) {
								if (orderInfo[j].orderProcess == res.data.rows[k].dictValue) {
									orderDictValue.push(res.data.rows[k].dictLabel);
								}
							}
						}
						that.orderInfoText = orderDictValue;
						for (var i = 0; i < res.data.rows.length; i++) {
							that.orderOptions = res.data.rows;
						}
					});
				});
			},
			//选择工单状态切换
			changeOptions(value) {
				var that = this;
				that.orderInfo = {};
				this.refreshOrderProcess(value);
			},
			//工单详情
			clickOrderInfo(orderInfo) {
				uni.navigateTo({
					url: "/pages/order/info?orderInfo=" + encodeURIComponent(JSON.stringify(orderInfo))
				})
			}
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

	.margin-top4 {
		margin-top: 4%;
	}

	.orderProess {
		height: 5%;
		width: 85%;
		background-color: #FFF;
		border-radius: 10rpx;
	}

	.content-size-order-number-size {
		margin-left: 20rpx;
		width: 45rpx;
		height: 45rpx;
	}

	.content-size-order-number-text {
		width: 75%;
		font-size: 30rpx;
	}

	.content-size {
		width: 90%;
		height: 25%;
		border-radius: 10rpx;
		background-color: #FFF;
	}

	.content-size-orderProcess {
		width: 100%;
		// height: 30%;
		border-bottom: 2rpx #F0F0F0 solid;
	}

	.content-size-button {
		// width: 100%;
		// height: 40%;
		// background-color: blue;
	}
</style>
