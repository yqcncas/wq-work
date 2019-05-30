function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function getToken () {
  const token = wx.getStorageSync('token')// 获取本地token
  return token
}

export function getExt () {
  const extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}
  return extConfig
}

export function getIsSalesMan () {
  const isSalesMan = wx.getStorageSync('isSalesMan')// 获取本地token
  return isSalesMan
}

export function setIsSalesMan (isSalesMan) {
  wx.setStorageSync('isSalesMan', isSalesMan)
}

export function getQrCode () {
  const qrCode = wx.getStorageSync('qrCode')// 获取本地token
  return qrCode
}

export function setQrCode (qrCode) {
  wx.setStorageSync('qrCode', qrCode)
}

export function getSalesInfo () {
  const salesInfo = wx.getStorageSync('salesInfo')// 获取本地token
  return salesInfo
}

export function setSalesInfo (salesInfo) {
  wx.setStorageSync('salesInfo', salesInfo)
}
export function checkToken (token) {
  if (!token === true) {
    return false
  } else {
    return true
  }
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function test (data) {
  const vv = data.map(log => log.join('#'))
  return `${vv}`
}

export default {
  formatNumber,
  formatTime,
  getToken,
  checkToken
}
