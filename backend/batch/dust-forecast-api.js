const axios = require('axios')
const moment = require('moment')
const DustInfo = require('../models/dustInfo')

const log = true
const format = 'YYYY-MM-DD HH:mm:ss'
const paramObject = {
  pageNo: '1',
  numOfRows: '1',
  itemCode: 'PM10',
  searchCondition: 'MONTH',
  dataGubun: 'HOUR',
  _returnType: 'json'
}
const cityList = [
  "seoul",
  "gyeonggi",
  "gangwon",
  "chungbuk",
  "chungnam",
  "jeonbuk",
  "jeonnam",
  "gyeongbuk",
  "gyeongnam",
  "incheon",
  "sejong",
  "daejeon",
  "gwangju",
  "daegu",
  "ulsan",
  "busan",
  "jeju"
]

module.exports = startBatch

// 최초 정각에 시작되어 매 시간마다 호출한다.
function startBatch (serviceKey) {
  paramObject.serviceKey = serviceKey
  // requestApi(paramObject)
  setTimeout(() => {
    requestApi(paramObject)
    setInterval(() => {
      requestApi(paramObject)
    }, 1000 * 60 * 60)
  }, getRemainingTimeTo())
}

function requestApi (paramObj) {
  log && console.log(`[${moment().format(format)}] Request sent.`)
  axios.get(`http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureLIst${getParamString(paramObject)}`)
    .then((result) => {
      log && console.log(`  [${moment().format(format)}] Response received with [${Object.keys(result.data.list[0]).length}] values.`)
      
      var dustInfo = {
        dataTime: result.data.list[0].dataTime,
        dataList: getRefinedDataList(result.data.list[0])
      }

      DustInfo
      .findOneAndUpdate({ dataTime: dustInfo.dataTime }, dustInfo, { upsert: true })
      .then((saved) => {
        log && console.log(`  [${moment().format(format)}] And successfully saved [${dustInfo.dataList.length}] values.`)
      })
    })
    .catch((error) => {
      log && console.error(`  [${moment().format(format)}] Response faled.`)
      log && console.error(error.Error || error)
    })
}

function getParamString (obj) {
  return Object.keys(obj).reduce((string, key, index) => {
    let delimeter = index === 0 ? '?' : '&'
    return `${string}${delimeter}${key}=${obj[key]}`
  }, '')
}

function getRemainingTimeTo () {
  // var nextRequestTime = moment().add(1, 'minutes').startOf('minute')
  var nextRequestTime = moment().add(1, 'hours').startOf('hour')
  return nextRequestTime.toDate() - moment().toDate()
}

function getRefinedDataList (obj) {
  let result = []
  Object.keys(obj).forEach(function (key) {
    if ( cityList.indexOf(key) > -1 ) {
      result.push({
        name: key,
        value: obj[key],
        order: cityList.indexOf(key)
      })
    }
  })
  return result
}
