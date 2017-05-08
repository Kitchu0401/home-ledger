<template>
  <div class="list-group">
    <div class="list-group-item">
      <ReceiptDayGroup
        v-for="receiptGroup in receiptList"
        v-bind:key="receiptGroup.date"
        v-bind:receiptGroup="receiptGroup">
      </ReceiptDayGroup>
    </div>
  </div>
</template>

<script>
import ReceiptDayGroup from './ReceiptDayGroup.vue'

export default {
  name: 'ReceiptList',
  components: {
    ReceiptDayGroup
  },
  props: ['receiptList'],
  created () {

  },
  data () {
    return {

    }
  }
}
</script>