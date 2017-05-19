<template>
  <div v-on:click="toggleShow">
    <div class="btn-group btn-group-justified" role="group" v-html="notificationHeaderMarkup"></div>
    <br/>
    <table id="notificationList" class="table table-bordered" v-show="show">
      <tbody>
        <tr><th colspan="7"><strong>종량제봉투 및 재활용비닐 수거요일</strong></th></tr>
        <tr v-html="notificationListMarkup[0]"></tr>
        <tr><th colspan="7">음식물 종량제봉투 수거요일</th></tr>
        <tr v-html="notificationListMarkup[1]"></tr>
        <tr><th colspan="7">재활용품 수거요일</th></tr>
        <tr v-html="notificationListMarkup[2]"></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment'

const choreLabel = ['종량제봉투 및 재활용비닐', '음식물 종량제봉투', '재활용품']
const dayLabel = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
const days = {
  // 종량제봉투 및 재활용비닐 수거요일
  0: [false, false, true, false, true, false, true],
  // 음식물 종량제봉투 수거요일
  1: [false, false, true, false, true, true, false],
  // 재활용품 수거요일
  2: [false, false, true, false, true, false, false]
}

export default {
  name: 'choreNotification',
  created () {
    // shortcut
    let _this = this
    let refreshMarkup = () => {
      let renewedDate = new Date()
      _this.notificationHeaderMarkup = _this.generateHeaderMarkup(renewedDate)
      _this.notificationListMarkup = _this.generateListMarkup(renewedDate)
    }
    
    refreshMarkup()
    // 매 자정마다 갱신한다.
    setTimeout(() => {
      setInterval(() => {
      }, 1000 * 60 * 60 * 24)
    }, this.getRemainingTimeTo())
  },
  data () {
    return {
      show: false,
      notificationHeaderMarkup: '',
      notificationListMarkup: ['', '', '']
    }
  },
  methods: {
    toggleShow () {
      this.show = !this.show
    },
    generateHeaderMarkup (renewedDate) {
      let currentDay = renewedDate.getDay()
      // 분류의 총 숫자 만큼 순회하며 분류에 해당하는 요일인지 확인하여 마크업을 추가한다.
      // 해당하는 분류가 존재하지 않을 경우 별도의 마크업을 반환한다.
      return choreLabel.reduce((prev, label, key) => {
        return prev += days[key][currentDay] ? `<span class="btn btn-primary btn-lg">${label}</span>` : ''
      }, '') || '<span class="btn btn-default btn-lg">No today chores!</span>'
    },
    generateListMarkup (renewedDate) {
      let currentDay = renewedDate.getDay()
      // 분류의 총 숫자 만큼 순회하며 해당 마크업을 반환되는 마크업으로 덮어쓴다.
      return this.notificationListMarkup.map((_, key) => {
        // 각 요일을 순회하며 현재 요일이 일치 할 경우 강조된 td 요소을 반환한다.
        return dayLabel.reduce((prev, label, index) => {
          let markup = label
              markup = days[key][index] ? `<span class='badge'>${markup}</span>` : markup
              markup = index === currentDay ? `<td class="current">${markup}</td>` : `<td>${markup}</td>`
          return prev + markup
        }, '')
      })
    },
    // 지금부터 자정까지의 남은 시간을 milisecond 단위로 반환한다.
    getRemainingTimeTo () {
      var nextRequestTime = moment().add(1, 'days').startOf('day')
      return nextRequestTime.toDate() - moment().toDate()
    }
  }
}
</script>

<style>
#notificationList td { text-align: center; }
#notificationList td .badge { background-color: #337ab7; }

#notificationList td.current { background-color: #337ab7; color: #fff; }
#notificationList td.current .badge { background-color: #fff; color: #337ab7; }
</style>
