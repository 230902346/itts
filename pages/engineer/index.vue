<template>
	<view>
		<view :style="{height:scrollHeight + 'px',width:scrollWidth + 'px'}" class="pages">
			<my-custom bgColor="bg-gradual-gray" :isBack="false">
				<block slot="content">首页</block>
			</my-custom>
			<view class="my-ml30rpx header">
				<text class="header-company">江苏中铭慧业科技有限公司</text>
				<view class="display-flex margin-top4">
					<view class="header-info-text">
						<view>
							<view class="header-info-square my-bg-blue display-iB"></view>
							<text class="my-f-m my-pl10rpx">用户：<text>{{nameDept}}</text></text>
						</view>
						<view class="my-mt20rpx">
							<view class="header-info-square my-bg-green display-iB"></view>
							<text class="my-f-m my-pl10rpx">工单状态：<text
									class="my-f-type-green">{{orderProcess}}</text></text>
						</view>
					</view>
				</view>
			</view>
			<view class="my-mt25rpx content-size" v-if="orderInfo != undefind">
				<view class="content-circle display-flex justify-center align-center" @click="clickOrderInfo(orderInfo)">
					<image :src="imageSrc" class="content-circle-size"></image>
					<text class="content-text-size-center orderProess-text">{{orderProcess}}</text>
				</view>
				<view class="content-text-size">
					<view class="content-across-line display-flex margin-auto justify-center"></view>
					<view class="content-text-size-order display-flex">
						<view class="content-text-size-number">
							<view class="content-text-size-center text-center">
								<p class="content-text-weight">{{orderTypeHeart}}</p>
								<p class="content-text-grey">工单类型</p>
							</view>
						</view>
						<view class="content-vertical-line"></view>
						<view class="content-text-size-number">
							<view class="content-text-size-center text-center">
								<p class="content-text-weight">{{orderInfo.phoneUser}}</p>
								<p class="content-text-grey">客户联系人</p>
							</view>
							<view class="content-text-size-right">
								<image class="header-phone-size" :src="'/static/img/phoneLoudspeaker.png'"
									@click="clickPhone()"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="my-mt25rpx content-size text-center" v-if="orderInfo == undefind">chauffeur
				<image src="../../static/img/bg_index.png" class="content-null-size"></image>
				<text class="content-null-text-size">暂无工单信息!</text>
			</view>
			<view class="content-button display-flex justify-center">
				<u-button type="primary" class="content-button-size margin-top5" @click="clickCreate">
					<image class="content-button-imagesize" src="../../static/img/icon_add.png"></image>
					<text>创 建 事 件</text>
				</u-button>
			</view>
		</view>
		<u-tabbar :list="tabBarList" :active-color="activeColor" :inactive-colot="inactiveColor"></u-tabbar>
	</view>
</template>

<script>
	/**
	 * MobileInfo 工程师首页工单信息查询
	 * MovileOrderProcess 首页工单流程状态查询
	 */
	import {
		MobileInfo,
		MobileOrderProcess,
	} from '@/api/login.js'
	export default {
		data() {
			return {
				//可见高
				scrollHeight: 0,
				//可见宽
				scrollWidth: 0,
				//首页工单信息
				orderInfo: {},
				//工程师名字及部门
				nameDept: '',
				//工单状态中文
				orderProcess: '',
				//工单类型中文
				orderTypeHeart: '',
				// 底部tabber
				tabBarList: {},
				userType: 0,
				//工单状态图片地址
				imageSrc: '../../static/img/accomplish.png',
				activeColor: "#2979FF", // 选中时的颜色
				inactiveColor: "#000" // 未选中时的颜色
			}
		},
		onReady() {},
		onLoad: function() {
			var that = this;
			uni.hideTabBar({});
			let user_type = uni.getStorageSync("userType");
			that.userType = user_type;
			//获取缓存中的tabbar数据
			let tabBarList = uni.getStorageSync('tabBarList');
			that.tabBarList = tabBarList;
			//Load初始化获取当前手机的可见宽高
			uni.getSystemInfo({
				success: function(res) {
					that.scrollHeight = res.windowHeight;
					that.scrollWidth = res.windowWidth;
				}
			});
			//Load初始化获取首页工单信息
			MobileInfo().then(res => {
				if (res.data.code == 500) {
					that.imageSrc = '../../static/engineer/Service_is_complete.png';
					that.nameDept = uni.getStorageSync('nameDept');
					that.orderProcess = "暂无工单!"
				} else {
					that.nameDept = uni.getStorageSync('nameDept');
					const orderInfo = res.data.data;
					if (orderInfo.orderProcess == 20 || orderInfo.orderProcess == 30) {
						that.imageSrc = '../../static/img/accomplish.png';
					} else if (orderInfo.orderProcess == 31 || orderInfo.orderProcess == 32 || orderInfo
						.orderProcess == 40) {
						that.imageSrc = '../../static/img/Service_is_complete.png';
					} else {
						that.imageSrc = '../../static/img/order_notarize.png';
					}
					that.orderInfo = orderInfo;
					//Load初始化工单流程状态
					MobileOrderProcess().then(res => {
						for (var i = 0; i < res.data.rows.length; i++) {
							if (orderInfo.orderProcess == res.data.rows[i].dictValue) {
								that.orderProcess = res.data.rows[i].dictLabel;
							}
						}
						//Load初始化工单类型
						if (orderInfo.orderType == "00") {
							that.orderTypeHeart = "事件工单"
						} else {
							that.orderTypeHeart = "问题工单"
						}
					});
				}
			});
		},
		mounted() {},
		methods: {
			//创建事件跳转
			clickCreate() {
				uni.navigateTo({
					url: '/pages/createevent/createEvent'
				})
			},
			//拨打电话
			clickPhone() {
				uni.makePhoneCall({
					phoneNumber: this.orderInfo.phoneNumber
				});
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
	.content-button-size {
		width: 100%;
	}

	.margin-top4 {
		margin-top: 4%;
	}

	.margin-top5 {
		margin-top: 5%;
	}

	.content-text-weight {
		font-size: 35rpx;
		font-weight: 600;
		color: #000000;
	}

	.content-text-grey {
		font-size: 30rpx;
		color: #c1c1c1;
	}

	.content-button-imagesize {
		width: 35rpx;
		height: 35rpx;
	}

	.header-info-size {
		width: 100%;
		height: 3%;
	}

	.orderProess-text {
		font-size: 50rpx;
		color: #398EFA;
	}

	.content-text-size-center {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.content-text-size-right {
		position: absolute;
		top: 50%;
		left: 85%;
		transform: translate(-50%, -40%);
	}

	.content-button {
		width: 90%;
		font-size: 40rpx;
		margin: auto;
	}

	.content-circle {
		position: relative;
		width: 100%;
		height: 80%;
	}

	.content-text-size {
		height: 20%;
		width: 100%;
	}

	.content-text-size-order {
		width: 100%;
		height: 100%;
	}

	.content-text-size-number {
		width: 50%;
		height: 100%;
		position: relative;
	}

	.content-vertical-line {
		width: 4rpx;
		height: 80%;
		background-color: #F0F0F0;
		margin: auto;
		display: flex;
		align-items: center;
	}

	.content-across-line {
		width: 90%;
		height: 4rpx;
		background-color: #F0F0F0;
	}

	.content-circle-size {
		width: 400rpx;
		height: 400rpx;
		justify-content: center;
		margin: auto;
		display: flex;
	}

	.content-null-size {
		width: 90%;
		height: 70%;
		justify-content: center;
		margin: auto;
		display: flex;
	}

	.content-null-text-size {
		font-size: 40rpx;
		font-weight: 600;
	}

	.content-size {
		width: 90%;
		flex-direction: column;
		height: 62%;
		background-color: #FFF;
		margin: auto;
	}

	.header-info-text {
		width: 85%;
		font-size: 35rpx;
	}

	.header-info-square {
		width: 16rpx;
		height: 16rpx;
	}

	.header-phone-size {
		width: 60rpx;
		height: 60rpx;
	}

	.header-company {
		font-size: 40rpx;
		font-weight: 900;
	}

	.header {
		width: 100%;
		height: 15%;
	}
</style>
