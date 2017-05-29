<template>
  <div v-on:click="viewReceipt(receipt)">
    <div class="timeline-heading">
      <h4 class="timeline-title">
        {{ receipt.type === '0' ? '소득' : '지출' }} <small>{{ receipt.subType }}</small>
        <p class="pull-right">
          <small class="text-primary" v-if="receipt.type === '0'"><i class="glyphicon glyphicon-plus"></i> {{ amount }}</small>
          <small class="text-danger" v-if="receipt.type === '1'"><i class="glyphicon glyphicon-minus"></i> {{ amount }}</small>
        </p>
      </h4>
    </div>
    <div class="timeline-body">
      <p>{{ receipt.memo }}</p>
    </div>
    <hr v-if="receipt.isLast" />
  </div>
</template>

<script>
export default {
  name: 'Receipt',
  props: ['receipt'],
  computed: {
    amount: function () {
      return Math.abs(this.receipt.amount)
    }
  },
  methods: {
    viewReceipt: function (receipt) {
      this.$EventBus.$emit('receipt.view', receipt)
    }
  }
}
</script>
