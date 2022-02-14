<template>
	<view class="page" :style="{height:scrollHeight + 'px',width:scrollWidth + 'px'}">
		<my-custom bgColor="bg-gradual-gray" :isBack="true">
			<view slot="backText">返回</view>
			<block slot="content" class="my-color-black custom-text-size font-weight-bold">工单详情</block>
		</my-custom>
		<template>
			<u-read-more :toggle="true" :show-height="300">
				<view class="particulars">
					<ul class="particulars-ul margin-auto">
						<li class="li-height">
							<img class="img-size" src="../../static/img/order.png">
							<text class="my-ml10rpx font-weight-bold font-size30">工单详情</text>
						</li>
						<li class="li-height" @click="copy">
							<text class="my-ml10rpx font-size30 my-f-type-info">工单编号：</text>
							<text
								class="my-ml10rpx font-weight-bold font-size30">{{orderInfo.orderNum}}</text>
						</li>
						<li class="li-height">
							<text class="my-ml10rpx font-size30 my-f-type-info">工单类型：</text>
							<text class="my-ml10rpx font-weight-bold font-size30">{{orderType}}工单</text>
						</li>
						<li class="li-height">
							<text class="my-ml10rpx font-size30 my-f-type-info">负责人：</text>
							<text class="my-ml40rpx font-weight-bold font-size30">{{chargerName}}</text>
						</li>
						<li class="li-height">
							<text class="my-ml10rpx font-size30 my-f-type-info">工单状态：</text>
							<text class="my-ml10rpx font-weight-bold font-size30">{{orderProcess}}</text>
						</li>
						<li class="li-height-border">
							<text class="my-ml10rpx font-size30 my-f-type-info">工单描述：</text>
							<text class="my-ml10rpx font-weight-bold font-size30">{{orderInfo.orderDescribe}}</text>
						</li>
					</ul>
				</view>
			</u-read-more>
		</template>
		<template>
			<view class="process">
				<YSteps lineNum='0' color='#fff' backgroundColor='#398EFA' :infoList='orderFLow'></YSteps>
			</view>
		</template>
	</view>
</template>

<script>
	import {
		MobileOrderProcess,
		MobileProcess
	} from '@/api/login.js'
	import uniCopy from '../../components/xb-copy/uni-copy.js';
	import YSteps from '../../components/Y-Steps/Y-Steps.vue'
	export default {
		components: {
			YSteps
		},
		data() {
			return {
				//可见高
				scrollHeight: 0,
				//可见宽
				scrollWidth: 0,
				//工单详情
				orderInfo: {},
				//工单类型
				orderType: "",
				//工单状态
				orderProcess: "",
				//工单流程
				orderFLow:{},
				//负责人
				chargerName: ""
			}
		},
		onLoad(options) {
			var that = this;
			//初始化设置可见宽高
			uni.getSystemInfo({
				success: function(res) {
					that.scrollHeight = res.windowHeight;
					that.scrollWidth = res.windowWidth;
				}
			});
			//工单类型
			let param = {
				"dictType": "event_order_type"
			};
			MobileOrderProcess(param).then(res => {
				for (var i = 0; i < res.data.rows.length; i++) {
					if (orderInfo.orderType == res.data.rows[i].dictValue) {
						that.orderType = res.data.rows[i].dictLabel;
					}
				}
			});
			//工单状态
			MobileOrderProcess().then(res => {
				for (var i = 0; i < res.data.rows.length; i++) {
					if (orderInfo.orderProcess == res.data.rows[i].dictValue) {
						that.orderProcess = res.data.rows[i].dictLabel;
					}
				}
			});
			//选中的工单详情
			const orderInfo = JSON.parse(decodeURIComponent(options.orderInfo));
			that.orderInfo = orderInfo;
			//负责人
			var chargerName = orderInfo.chargerName;
			let chargerNameIndex = chargerName.indexOf("（");
			chargerName = chargerName.substring(0, chargerNameIndex);
			that.chargerName = chargerName;
			//工单流程
			param = {
				"orderId": orderInfo.orderId,
				"orderType":orderInfo.orderType
			};
			MobileProcess(param).then(res => {
				that.orderFLow = res.data.logs;
			});
			console.log(that);
		},
		methods: {
			parseLoaded() {
				this.$refs.uReadMore.init();
			},
			//复制方法	
			copy() {
				uniCopy({
					content: this.orderInfo.orderNum,
					success: (res) => {
						uni.showToast({
							title: "复制成功!",
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
			}
		},

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
	
	.process{
		width:100%;
	}

	.particulars {
		width: 100%;
		height: 40%;
		margin-top: 2%;
	}

	.particulars-ul {
		width: 90%;
		height: 100%;
		border-radius: 10rpx;
		background-color: #FFF;
	}

	.img-size {
		width: 40rpx;
		height: 40rpx;
		vertical-align: middle;
	}

	.li-height {
		width: 100%;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		border-bottom: 1rpx solid #dfdfdf;
	}

	.li-height-border {
		width: 100%;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
	}

	.textarea-size {
		width: 95%;
		border-radius: 10rpx;
		border: 1px solid #dfdfdf;
	}
</style>
