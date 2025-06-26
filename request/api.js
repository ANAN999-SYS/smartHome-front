// 引入 request 文件
import request from './index.js'

import bafaRequest from './bafaRequest.js'

//登录
export const userLoginSessionId = (code, params) => {
	return request({
		url: '/weixinLogin/sessionId/' + code,
		method: 'get',
		data: params,
		header: {} // 自定义
	})
}
export const userLoginAuthLogin = (params) => {
	return request({
		url: '/weixinLogin/authLogin',
		method: 'post',
		data: params,
		header: {} // 自定义
	})
}
//修改用户信息
export const editUserInfo = (params) => {
	return request({
		url: '/weixin/editUserInfo',
		method: 'post',
		data: params,
		header: {} // 自定义
	})
}
//登录状态测试
export const userTest = (params) => {
	return request({
		url: '/weixin/userTest',
		method: 'get',
		data: params,
		header: {} // 自定义
	})
}

//提交反馈
export const userFeedback = (params) => {
	return request({
		url: '/Feedback/feedback',
		method: 'post',
		data: params,
		header: {} // 自定义
	})
}
//获取反馈信息
export const getFeedback = (params) => {
	return request({
		url: '/Feedback/getFeedback',
		method: 'get',
		data: params,
		header: {} // 自定义
	})
}
//获取房间列表
export const getRoomList = (params) => {
	return request({
		url: '/Room/getRoomList',
		method: 'get',
		data: params,
		header: {} // 自定义
	})
}
//添加房间
export const addRoomList = (params) => {
	return request({
		url: '/Room/addRoomList',
		method: 'post',
		data: params,
		header: {} // 自定义
	})
}
//修改房间
export const editRoomList = (params) => {
	return request({
		url: '/Room/editRoomList',
		method: 'post',
		data: params,
		header: {} // 自定义
	})
}
//删除房间
export const deleteRoomList = (params) => {
	return request({
		url: '/Room/deleteRoomList',
		method: 'post',
		data: params,
		header: {} // 自定义
	})
}
//查询设备
export const getDevicesList = (params) => {
	return request({
		url: '/Devices/getDevicesList',
		method: 'get',
		data: params,
		header: {} // 自定义
	})
}
//查询巴法云设备
export const getBaFaDevices = (params) => {
	return request({
		url: '/Devices/getBaFaDevices',
		method: 'get',
		data: params,
		header: {} // 自定义
	})
}
//
export const getBaFaDevisesList = (params) => {
	return request({
		url: '/Devices/getBaFaDevisesList',
		method: 'get',
		data: params,
		header: {} // 自定义
	})
}
//修改设备
export const editDevicesList = (params) => {
	return request({
		url: '/Devices/editDevicesList',
		method: 'post',
		data: params,
		header: {} // 自定义
	})
}
//删除设备
export const deleteDevicesList = (params) => {
	return request({
		url: '/Devices/deleteDevicesList',
		method: 'post',
		data: params,
		header: {} // 自定义
	})
}
//添加设备
export const addDevicesList = (params) => {
	return request({
		url: '/Devices/addDevicesList',
		method: 'post',
		data: params,
		header: {} // 自定义
	})
}
//查询设备(deId)
export const getDevicesById = (params) => {
	return request({
		url: '/Devices/getDevicesById',
		method: 'get',
		data: params,
		header: {} // 自定义
	})
}
//控制设备(deId)
export const ctrlDevice = (params) => {
	return request({
		url: '/Devices/ctrlDevice',
		method: 'post',
		data: params,
		header: {} // 自定义
	})
}
//获取情景信息(deId)
export const getScenario = (params) => {
	return request({
		url: '/Scenario/getScenario',
		method: 'get',
		data: params,
		header: {} // 自定义
	})
}
//添加情景信息
export const addScenario = (params) => {
	return request({
		url: '/Scenario/addScenario',
		method: 'post',
		data: params,
		header: {} // 自定义
	})
}
//修改情景信息
export const editScenario = (params) => {
	return request({
		url: '/Scenario/editScenario',
		method: 'post',
		data: params,
		header: {} // 自定义
	})
}
//删除情景信息
export const deleteScenario = (params) => {
	return request({
		url: '/Scenario/deleteScenario',
		method: 'post',
		data: params,
		header: {} // 自定义
	})
}
//SId情景信息
export const getScenarioBySid = (params) => {
	return request({
		url: '/Scenario/getScenarioBySid',
		method: 'get',
		data: params,
		header: {} // 自定义
	})
}
//控制指令
export const ctrlScenario = (params) => {
	return request({
		url: '/Scenario/ctrlScenario',
		method: 'post',
		data: params,
		header: {} // 自定义
	})
}
//登录巴法云
export const bafaLogin = (params) => {
	return bafaRequest({
		url: 'https://pro.bemfa.com/v1/login',
		type:'other',
		method: 'post',
		data: params,
		header: {
			"Content-Type": "application/x-www-form-urlencoded"
		} // 自定义
	})
}
//注册巴法云
export const bafaRegister = (params) => {
	return bafaRequest({
		url: 'https://pro.bemfa.com/v1/register',
		type:'other',
		method: 'post',
		data: params,
		header: {
			"Content-Type": "application/x-www-form-urlencoded"
		} // 自定义
	})
}
//删除主题
export const delbafaDevices = (params) => {
	return bafaRequest({
		url: 'https://pro.bemfa.com/v1/deltopic',
		type:'other',
		method: 'post',
		data: params,
		header: {
			"Content-Type": "application/x-www-form-urlencoded"
		} // 自定义
	})
}
//添加主题
export const addbafaDevices = (params) => {
	return bafaRequest({
		url: 'https://pro.bemfa.com/v1/addtopic',
		type:'other',
		method: 'post',
		data: params,
		header: {
			"Content-Type": "application/x-www-form-urlencoded"
		} // 自定义
	})
}