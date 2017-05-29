<template>
  <li>
    <div class="timeline-badge primary"><i class="glyphicon glyphicon-file"></i></div>
    <div class="timeline-panel" v-if="incomeList.length > 0">
      <Receipt
        v-for="receipt in incomeList"
        v-bind:key="receipt.id"
        v-bind:receipt="receipt" />
    </div>
    <div class="timeline-panel timeline-inverted" v-if="expenseList.length > 0">
      <Receipt
        v-for="receipt in expenseList"
        v-bind:key="receipt.id"
        v-bind:receipt="receipt" />
    </div>
  </li>
</template>

<script>
import moment from 'moment'
import Receipt from './Receipt.vue'

export default {
  name: 'ReceiptDayGroup',
  components: {
    Receipt
  },
  props: ['receiptGroup'],
  computed: {
    dateString: function () {
      return moment(this.receiptGroup.date).format('YYYY-MM-DD')
    },
    incomeList: function () {
      return this.receiptGroup.receipts.filter((receipt) => {
        return receipt.type === '0'
      }).map((receipt, index, list) => {
        receipt.isLast = index < list.length - 1
        return receipt
      })
    },
    expenseList: function () {
      return this.receiptGroup.receipts.filter((receipt) => {
        return receipt.type === '1'
      }).map((receipt, index, list) => {
        receipt.isLast = index < list.length - 1
        return receipt
      })
    }
  }
}
</script>