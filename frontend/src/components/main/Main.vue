<template>
  <div class="container">
    <!--
    <div class="jumbotron">
      <h1>메인 페이지</h1>
      <p>
        <h3>Todo:</h3>
        <ul>
          <li><i class="fa fa-check" aria-hidden="true"></i> 영수증 목록 (날/주 별로 그룹핑 된 상태로)</li>
          <li><i class="fa fa-check" aria-hidden="true"></i> 화면 최상단 (차트 존재시 차트와 목록 사이) 누계 총액 표시</li>
          <li>영수증 목록 조회범위 적용 (무한스크롤 or 조회범위 선택)</li>
          <li>통계형 차트 (별도 페이지로 분리)</li>
        </ul>
      </p>
    </div>
    -->
    <ChoreNotification></ChoreNotification>
    <DustForecast></DustForecast>
    <ReceiptList v-if="viewType === 'list'"></ReceiptList>
    <ReceiptTimeline v-if="viewType === 'timeline'"></ReceiptTimeline>
  </div>
</template>

<script>
import ChoreNotification from './ChoreNotification.vue'
import DustForecast from './DustForecast.vue'
import ReceiptList from '../receipt/ReceiptList.vue'
import ReceiptTimeline from '../receipt-timeline/ReceiptTimeline.vue'

export default {
  created () {
    
  },
  data () {
    return {
      // viewType: 'list',
      viewType: 'timeline'
    }
  },
  components: {
    ChoreNotification,
    DustForecast,
    ReceiptList,
    ReceiptTimeline
  }
}
</script>
