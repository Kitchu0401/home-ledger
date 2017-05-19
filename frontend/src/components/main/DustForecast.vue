<template>
  <div v-on:click="toggleShow">
    <div class="btn-group btn-group-justified" role="group" v-html="dustInfoHeaderMarkup"></div>
    <br/>
    <table id="dustInfoList" class="table table-bordered" v-show="show">
      <tbody v-html="dustInfoListMarkup"></tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment'

const targetList = ['chungbuk', 'chungnam', 'gangwon', 'gyeongbuk', 'gyeonggi', 'gyeongnam', 'jeonbuk', 'jeonnam', 'seoul']
const labelList = ['충청북도', '충청남도', '강원도', '경상북도', '경기도', '경상남도', '전라북도', '전라남도', '서울']

export default {
  name: 'dustForecast',
  created () {
    this.requestDustInfo()
    setTimeout(function () {
      setInterval(function () {
        this.requestDustInfo()
      }, 1000 * 60 * 60)
    }, this.getRemainingTimeTo())
  },
  data () {
    return {
      show: false,
      dataTime: '-',
      dataList: []
    }
  },
  computed: {
    dustInfoHeaderMarkup: function () {
      return this.dataList.filter((data) => { return data.order <= 1 }).reduce((html, data) => {
        // 미세먼지 등급에 따라 부트스트랩 버튼 색상 클래스를 결정한다.
        let className = ['info', 'success', 'warning', 'danger'][data.level]
        return `<span class="btn btn-${className} btn-lg">${data.name} <span class="badge">${data.value}</span></span>`
      }, '')
    },
    dustInfoListMarkup: function () {
      let header = `<tr><td colspan="4">현 시각 미세먼지 정보<span class="pull-right"><small>최종 갱신: ${this.dataTime}</small></span></td></tr>`
      return this.dataList.reduce((html, data, index) => {
        let prefix = index % 2 === 0 ? '<tr>' : ''
        let suffix = index % 2 !== 0 ? '</tr>' : ''
        // 영문 지역명을 국문 지역명으로 전환한다.
        data.name = labelList[targetList.indexOf(data.name)]
        let content = data.name && data.value ? `<td>${data.name}</td><td style="color: ${data.color};">${data.value}</td>` : '<td colspan="2"></td>'
        return html + `${prefix}${content}${suffix}`
      }, header)
    }
  },
  methods: {
    toggleShow () {
      this.show = !this.show
    },
    requestDustInfo: function () {
      this.$http.get('/api/dustInfo')
        .then((result) => {
          // 시도 별 미세먼지 농도 정보 선처리: filtering, ordering
          // Table row 행 당 2건 표시를 위해 데이터가 홀수일 경우 빈 객체를 하나 삽입한다.
          result.data.dataList = result.data.dataList
            .sort((prev, next) => { return prev.order - next.order })
            .filter((data) => { return targetList.indexOf(data.name) >= 0 })
            .map((data) => { return this.getDenseLevelInfo(data) })
          if ( result.data.dataList.length % 2 !== 0 ) { result.data.dataList.push({}) }

          this.dataTime = result.data.dataTime
          this.dataList = result.data.dataList
        })
        .catch((error) => { console.error(error) })
    },
    // 지금부터 다음 정각까지의 남은 시간을 milisecond 단위로 반환한다.
    getRemainingTimeTo: function () {
      var nextRequestTime = moment().add(1, 'hours').startOf('hour')
      return nextRequestTime.toDate() - moment().toDate() + (1000 * 30)
    },
    getDenseLevelInfo: function (data) {
      if ( data.value <= 30 ) {
        data.level = 0
        data.color = '#4e89f6'
      } else if ( data.value <= 80 ) {
        data.level = 1
        data.color = '#5bd464'
      } else if ( data.value <= 150 ) {
        data.level = 2
        data.color = '#fe7f41'
      } else {
        data.level = 3
        data.color = '#f94a4b'
      }
      return data
    }
  }
}
</script>

<style>
table#dustInfoList td:nth-child(even) { width: 60px; text-align: center; }
</style>
