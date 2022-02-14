<template>
	<view class="page">
		<my-custom bgColor="bg-gradual-gray" :isBack="true">
			<view slot="backText">返回</view>
			<block slot="content">创建事件</block>
		</my-custom>
		<view>
			<view class="my-mt20rpx" v-if="userType == 0">
				<text class="font-size">客户</text>
				<view class="orderProess margin-auto">
					<uni-forms-item label="客户" name="client">
						<hpy-form-select :dataList="hobbyList" text="text" name="value" v-model="formData.hobbySelect" />
					</uni-forms-item>
				</view>
			</view>
			<view class="my-mt20rpx" v-if="userType == 0">
				<text class="font-size">联系人</text>
				<view class="orderProess margin-auto">
					<uni-forms-item label="客户" name="client">
						<hpy-form-select :dataList="hobbyList" text="text" name="value" v-model="formData.hobbySelect" />
					</uni-forms-item>
				</view>
			</view>
			<view class="my-mt20rpx" v-if="userType == 0">
				<text class="font-size">资产</text>
				<view class="orderProess margin-auto">
					<uni-forms-item label="客户" name="client">
						<hpy-form-select :dataList="hobbyList" text="text" name="value" v-model="formData.hobbySelect" />
					</uni-forms-item>
				</view>
			</view>
			<view class="my-mt20rpx" v-if="userType == 0">
				<text class="font-size">所属项目</text>
				<view class="orderProess margin-auto">
					<uni-forms-item label="客户" name="client">
						<hpy-form-select :dataList="hobbyList" text="text" name="value" v-model="formData.hobbySelect" />
					</uni-forms-item>
				</view>
			</view>
			<view class="my-mt20rpx">
				<text class="font-size">事件描述</text>
				<view class="display-flex margin-auto orderProess my-mt20rpx">
					<template>
						<u-input style="width: 100%;" v-model="description" :type="type" :height="height"
							placeholder="请输入200字以内的描述信息" maxlength="96" />
					</template>
				</view>
			</view>
			<view class="my-mt20rpx">
				<text class="font-size">备注信息</text>
				<view class="display-flex margin-auto orderProess my-mt20rpx">
					<template>
						<u-input style="width: 100%;" v-model="remark" :type="type" :height="height"
							placeholder="请输入200字以内的描述信息" maxlength="96" />
					</template>
				</view>
			</view>
			<view style="width: 100%;" class="my-mt40rpx">
				<view style="width: 80%;" class="display-flex justify-center margin-auto">
					<view style="width: 45%;">
						<u-button type="primary" ripple="true" hair-line="false">提交</u-button>
					</view>
					<view style="width: 10%;"></view>
					<view style="width: 45%;">
						<u-button ripple="true" hair-line="false">取消</u-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//事件描述
				description: "",
				//备注信息
				remark: "",
				type: 'textarea',
				border: true,
				height: 80,
				autoHeight: true,
				userType: 0,
				formData: {
					hobbySelect: ''
				},
				hobbyList: [{
					text: '足球',
					value: 1
				}, {
					text: '篮球',
					value: 2
				}, {
					text: '游泳',
					value: 3
				}],
			}
		},
		methods: {
			change(e) {
				console.log(e.index);
				console.log(e.value);
				console.log(e.data);
			}
		},
		onLoad() {
			uni.hideTabBar({});
			var that = this;
			let user_type = uni.getStorageSync("userType");
			that.userType = user_type;
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

	.orderProess {
		height: 5%;
		width: 85%;
		background-color: #FFF;
		border-radius: 10rpx;
	}

	.font-size {
		font-size: 35rpx;
		font-weight: 800;
		margin-left: 5vw;
	}
</style>
