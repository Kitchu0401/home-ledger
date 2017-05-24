<template>
  <div>
    <!-- ReceiptListHeader -->
    <div class="list-group">
      <div class="list-group-item">
        <strong>{{ list.currentDateString }} 현재:</strong>
        <span class="pull-right">{{ list.sumTotalAmount }}</span>
      </div>
      <div class="list-group-item">
        <form class="form-inline">
          <Datepicker
            wrapper-class="form-group"
            input-class="form-control"
            placeholder="조회시작일"
            format="yyyy-MM-dd"
            language="ko"
            v-model="list.startDate">
          </Datepicker>
          &nbsp;~&nbsp;
          <Datepicker
            wrapper-class="form-group"
            input-class="form-control"
            placeholder="조회종료일"
            format="yyyy-MM-dd"
            language="ko"
            v-model="list.endDate">
          </Datepicker>
          <button class="btn btn-default pull-right" v-on:click="viewReceipt(null, $event)">
            <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;새로 등록하기
          </button>
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
    
  </div>
</template>

<script>
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'
import ReceiptDayGroup from './ReceiptDayGroup.vue'

const newReceipt = {
  _id: undefined,
  type: '0',
  subType: '분류선택',
  date: new Date(),
  amount: 0,
  memo: ''
}

export default {
  name: 'ReceiptList',
  components: {
    Datepicker,
    ReceiptDayGroup
  },
  created () {
    this.loadReceiptList()
  },
  data () {
    return {
      list: {
        currentDateString: moment().format('YYYY년 MM월 DD일'),
        sumTotalAmount: 0,
        receiptList: [],
        startDate: moment().subtract(1, 'months').toDate(),
        endDate: moment().toDate()
      },
      detail: {

      }
    }
  },
  computed: {
    startDateString: function () {
      return this.list.startDate ? moment(this.list.startDate).format('YYYY-MM-DD') : null
    },
    endDateString: function () {
      return this.list.endDate ? moment(this.list.endDate).format('YYYY-MM-DD') : null
    },
    filteredReceiptList: function () {
      return this.list.receiptList.filter((receipts) => {
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
          this.list.sumTotalAmount = result.data.sumTotalAmount
          this.list.receiptList = result.data.receiptList
        })
        .catch((error) => { console.error(error) })
    },
    viewReceipt: function (receipt, event) {
      if ( event ) { event.preventDefault() }
      console.debug('viewReceipt called.', receipt)
    },
    saveReceipt: function () {
      console.debug('saveReceipt called.')
    },
    deleteReceipt: function () {
      console.debug('deleteReceipt called.')
    }
  }
}
</script>

<style>
.form-inline .form-control { width: 100px; }
</style>
