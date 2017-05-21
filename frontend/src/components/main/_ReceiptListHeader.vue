<template>
  <div class="list-group">
    <div class="list-group-item">
      <strong>{{ currentDateString }} 현재:</strong>
      <span class="pull-right">{{ sumTotalAmount }}</span>
    </div>
    <div class="list-group-item">
      <form class="form-inline">
        <Datepicker
          wrapper-class="form-group"
          input-class="form-control calendar"
          format="yyyy-MM-dd"
          language="ko"
          v-model="startDate">
        </Datepicker>
        ~
        <Datepicker
          wrapper-class="form-group"
          input-class="form-control calendar"
          format="yyyy-MM-dd"
          language="ko"
          v-model="endDate">
        </Datepicker>
      </form>
    </div>
  </div>
</template>

<script>
// 2017-05-22
//  List 컴포넌트 데이터 조작 이슈로 인한 사용 중지
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'ReceiptListHeader',
  props: [
    'sumTotalAmount',
    'startDate',
    'endDate'
  ],
  components: {
    Datepicker
  },
  data () {
    return {
      currentDateString: moment().format('YYYY년 MM월 DD일')
    }
  }
}
</script>

<style>
.form-control.calendar {
  width: 100px;
}
</style>
