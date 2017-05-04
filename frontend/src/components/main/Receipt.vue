<template>
    <router-link
        v-bind:to="{ name: 'detail', params: { id: receipt.id } }"
        tag="div" class="list-group-item">
        <h4 class="list-group-item-heading">
            {{ receipt.type === '0' ? '소득' : '지출' }} <small>{{ receipt.subType }}</small>
            <small v-if="receipt.type === '0'" class="pull-right" style="color: blue;">{{ receipt.amount }}</small>
            <small v-if="receipt.type === '1'" class="pull-right" style="color: red;">-{{ receipt.amount }}</small>
        </h4>
        <p class="list-group-item-text">{{ receipt.memo }}</p>
    </router-link>
</template>

<script>
export default {
  name: 'Receipt',
  props: ['receipt'],
  created () {
    // console.debug(this.receipt)
  },
  data () {
    return {

    }
  }
}
</script>
