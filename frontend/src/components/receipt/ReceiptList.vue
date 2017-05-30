<template>
  <div>

    <!-- ReceiptListHeader -->
    <ReceiptListHeader
      v-bind:currentDateString="currentDateString"
      v-bind:sumTotalAmount="sumTotalAmount"
      v-bind:startDate="startDate"
      v-bind:endDate="endDate"
      v-bind:setDateRange="setDateRange"
      v-bind:newReceipt="newReceipt">
    </ReceiptListHeader>
    
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

    <!-- DetailModal -->
    <ReceiptDetailModal></ReceiptDetailModal>
    
  </div>
</template>

<script>
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'
import ReceiptListHeader from './ReceiptListHeader.vue'
import ReceiptDayGroup from './ReceiptDayGroup.vue'
import ReceiptDetailModal from './ReceiptDetailModal.vue'

export default {
  name: 'ReceiptList',
  components: {
    Datepicker,
    ReceiptListHeader,
    ReceiptDayGroup,
    ReceiptDetailModal
  },
  created () {
    this.loadReceiptList()

    // bind EventBus events
    this.$EventBus.$on('receipt.save', this.loadReceiptList)
    this.$EventBus.$on('receipt.delete', this.loadReceiptList)
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
    startDateString: function () {
      return this.startDate ? moment(this.startDate).format('YYYY-MM-DD') : null
    },
    endDateString: function () {
      return this.endDate ? moment(this.endDate).format('YYYY-MM-DD') : null
    },
    filteredReceiptList: function () {
      return this.receiptList.filter((receipts) => {
        let date = receipts.date.substring(0, 10)
        if ( this.startDateString && this.startDateString > date ) { return false }
        if ( this.endDateString && this.endDateString < date ) { return false }
        return true
      })
    }
  },
  methods: {
    loadReceiptList: function () {
      this.$http.get('/api/receipt')
        .then((result) => { 
          this.sumTotalAmount = result.data.sumTotalAmount
          this.receiptList = result.data.receiptList
        })
        .catch((error) => { console.error(error) })
    },
    newReceipt: function () {
      this.$EventBus.$emit('receipt.view', null)
    },
    setDateRange: function(index) {
      // 최근 일주일
      if ( index === 0 ) {
        this.startDate = moment().subtract(7, 'days').toDate()
        this.endDate = moment().toDate()
      }
      // 최근 한달
      else if ( index === 1 ) {
        this.startDate = moment().subtract(1, 'months').toDate()
        this.endDate = moment().toDate()
      }
      // 전체보기
      else if ( index === 2 ) {
        this.startDate = null
        this.endDate = null
      }
    }
  }
}
</script>
