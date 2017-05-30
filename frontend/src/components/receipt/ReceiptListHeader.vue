<template>
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
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'ReceiptListHeader',
  props: [
    'currentDateString',
    'sumTotalAmount',
    'startDate',
    'endDate',
    'setDateRange',
    'newReceipt'
  ],
  components: {
    Datepicker
  },
  created () {
    console.log('hayo!')
  }
}
</script>

<style>
.form-inline .form-group { display: inline-block; margin-bottom: 0px; }
.form-inline .form-group .form-control { width: 100px; }
</style>
