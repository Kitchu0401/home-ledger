<template>
  <div class="list-group">
    <a href="#" class="list-group-item list-group-item-info">
      {{ dateString }}
      <span class="pull-right">{{ receiptGroup.sumAmount }}</span>
    </a>
    <Receipt
      v-for="receipt in receiptGroup.receipts"
      v-bind:key="receipt.id"
      v-bind:receipt="receipt" />
  </div>
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
    }
  }
}
</script>