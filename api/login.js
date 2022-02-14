import {
	request
} from './server.js'
//验证登录 0工程师 1销售 2客户
export const MobileLogin =
	function(params) {
		return request.post("/app/login", params)
			.then(res => {
				if (res.data.code === 0) {
					uni.setStorage({
						key: 'storage_token',
						data: res.data.data.token,
					});
					uni.setStorage({
						key: 'userType',
						data: res.data.data.userType,
					});
					let nameDept;
					if (res.data.deptName == null && res.data.deptName == '') {
						nameDept = res.data.data.userName;
					} else {
						nameDept = res.data.data.userName + "（" + res.data.data.deptName + "）";
					}
					uni.setStorage({
						key: 'nameDept',
						data: nameDept,
					});
					uni.reLaunch({
						url: '/pages/engineer/index'
					});
				} else if (res.data.code === 500) {
					uni.reLaunch({
						url: "/pages/login/login/index",
					});
					uni.showModal({
						title: "温馨提示",
						content: res.data.msg
					})
				}
			})
	}
//首页工单信息查询
export const MobileInfo =
	function() {
		return request.get("/app/order/home");
	}
//小程序首页工单流程状态查询
export const MobileOrderProcess =
	function(params) {
		if (params == undefined) {
			return request.get("/app/common/orderProcess");
		} else {
			return request.get("/app/common/orderProcess?dictType=" + params.dictType);
		}
	}
//全部工单列表查询
export const MobileOrder =
	function(params) {
		return request.post("/app/order/list", params);
	}
//知识库列表查询
export const MobileRepository =
	function(params) {
		return request.get("/app/know/list", params);
	}
//备件库申请列表查询
export const MobileSpare =
	function(params) {
		return request.get("/app/spare/apply", params);
	}
//指定工单流程查询
export const MobileProcess =
	function(params) {
		return request.get("/app/order/logs?orderId=" + params.orderId + "&orderType=" + params.orderType);
	}
