<template>
  <div>
    <!-- ReceiptListHeader -->
    <div class="list-group">
      <div class="list-group-item">
        <strong>{{ currentDateString }} 현재:</strong>
        <span class="pull-right">{{ sumTotalAmount }}</span>
      </div>
      <div class="list-group-item">
        <form class="form-inline">
          <label for="">조회시작일</label>
          <Datepicker
            wrapper-class="form-group"
            input-class="form-control calendar"
            format="yyyy-MM-dd"
            language="ko"
            v-model="startDate">
          </Datepicker>
          &nbsp;~&nbsp;
          <label for="">조회시작일</label>
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
          v-for="receiptGroup in filteredReceiptList"
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
      startDate: moment().subtract(1, 'months').toDate(),
      endDate: moment().toDate()
    }
  },
  computed: {
    startDateString: function() {
      return this.startDate ? moment(this.startDate).format('YYYY-MM-DD') : null
    },
    endDateString: function() {
      return this.endDate ? moment(this.endDate).format('YYYY-MM-DD') : null
    },
    filteredReceiptList: function() {
      return this.receiptList.filter((receipts) => {
        let date = receipts.date.substring(0, 10)
        if ( this.startDateString && this.startDateString > date ) { return false }
        if ( this.endDateString && this.endDateString < date ) { return false }
        return true
      })
    }
  }
}
</script>

<style>
.form-control.calendar {
  margin-left: 6px;
  width: 100px;
}
</style>
