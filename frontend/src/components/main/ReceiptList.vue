<template>
  <div>
    <!-- ReceiptListHeader -->
    <div class="list-group">
      <div class="list-group-item">
        <strong>{{ currentDateString }} 현재: {{ filteredRange }}</strong>
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
    <!-- ReceiptList -->
    <div class="list-group">
      <div class="list-group-item">
        <ReceiptDayGroup
          v-for="receiptGroup in receiptList"
          v-bind:key="receiptGroup.date"
          v-bind:receiptGroup="receiptGroup">
        </ReceiptDayGroup>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'
import ReceiptDayGroup from './ReceiptDayGroup.vue'

export default {
  name: 'ReceiptList',
  components: {
    Datepicker,
    ReceiptDayGroup
  },
  created () {
    this.$http.get('/api/receipt')
      .then((result) => { 
        this.sumTotalAmount = result.data.sumTotalAmount
        this.receiptList = result.data.receiptList
      })
      .catch((error) => { console.error(error) })
  },
  data () {
    return {
      currentDateString: moment().format('YYYY년 MM월 DD일'),
      sumTotalAmount: 0,
      receiptList: [],
      startDate: '',
      endDate: ''
    }
  },
  computed: {
    filteredRange: function() {
      return `${this.startDate} ~ ${this.endDate}`
    }
  }
}
</script>
