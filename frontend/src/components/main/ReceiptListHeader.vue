<template>
  <div class="list-group">
    <div class="list-group-item">
      <strong>{{ dateString }} 현재:</strong>
      <span class="pull-right">{{ sumTotalAmount }}</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'ReceiptListHeader',
  props: ['sumTotalAmount'],
  data () {
    return {
      dateString: moment().format('YYYY년 MM월 DD일')
    }
  }
}
</script>