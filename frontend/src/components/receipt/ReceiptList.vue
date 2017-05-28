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
          <Datepicker
            wrapper-class="form-group"
            input-class="form-control"
            placeholder="조회시작일"
            format="yyyy-MM-dd"
            language="ko"
            v-model="startDate">
          </Datepicker>
          &nbsp;~&nbsp;
          <Datepicker
            wrapper-class="form-group"
            input-class="form-control"
            placeholder="조회종료일"
            format="yyyy-MM-dd"
            language="ko"
            v-model="endDate">
          </Datepicker>
          <div class="btn-group hidden-xs" role="group">
            <button type="button" class="btn btn-default" v-on:click="setDateRange(0)">최근 일주일</button>
            <button type="button" class="btn btn-default" v-on:click="setDateRange(1)">최근 한달</button>
            <button type="button" class="btn btn-default" v-on:click="setDateRange(2)">전체보기</button>
          </div>
          <a class="btn btn-default pull-right" v-on:click="newReceipt">
            <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;새로 등록하기
          </a>
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

    <!-- DetailModal -->
    <ReceiptDetailModal></ReceiptDetailModal>
    
  </div>
</template>

<script>
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'
import ReceiptDayGroup from './ReceiptDayGroup.vue'
import ReceiptDetailModal from './ReceiptDetailModal.vue'

export default {
  name: 'ReceiptList',
  components: {
    Datepicker,
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

<style>
.form-inline .form-group { display: inline-block; margin-bottom: 0px; }
.form-inline .form-group .form-control { width: 100px; }
</style>
