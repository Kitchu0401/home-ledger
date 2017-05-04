<template>
  <div class="container">
    <div class="jumbotron">
      <h1>상세 페이지</h1>
      <p>
        <h3>Todo:</h3>
        <ul>
          <li>신규 영수증 내역 추가 기능</li>
          <li>기 등록된 영수증 내역 수정 및 삭제 기능</li>
          <li>복사된 영수증 내역 붙여넣기</li>
        </ul>
      </p>
    </div>
    <form class="form-horizontal">
      <div class="form-group">
        <label class="col-sm-2 control-label">구분</label>
        <div class="col-sm-10">
          <label class="radio-inline" for="type_0">
            <input type="radio" id="type_0" value="0" v-model="receipt.type" /> 소득
          </label>
          <label class="radio-inline" for="type_1">
            <input type="radio" id="type_1" value="1" v-model="receipt.type" /> 지출
          </label>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label" for="sub-type">분류</label>
        <div class="col-sm-10">
          <SubTypeModal
            v-bind:type="receipt.type"
            v-bind:sub-type="receipt.subType"
            v-on:selectSubType="selectSubType">
          </SubTypeModal>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label" for="amount">날짜</label>
        <div class="col-sm-10">
          <Datepicker 
            input-class="form-control"
            format="yyyy-MM-dd"
            language="ko"
            v-model="receipt.date">
          </Datepicker>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label" for="amount">금액</label>
        <div class="col-sm-10">
          <input type="number" class="form-control" id="amount" name="amount" v-model="receipt.amount">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label" for="memo">메모</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="memo" name="memo" v-model="receipt.memo">
        </div>
      </div>
    </form>

    <button class="btn btn-primary form-control" v-on:click="saveReceipt">Save receipt</button>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import SubTypeModal from './SubTypeModal.vue'

export default {
  name: 'detail',
  props: ['id'],
  components: {
    Datepicker,
    SubTypeModal
  },
  created () {
    if ( this.id ) {
      this.$http.get(`/api/receipt/${this.id}`)
        .then((result) => {
          this.receipt = result.data
          // FIXME: temporal conversioning code
          if ( typeof this.receipt.date === 'string' ) {
            this.receipt.date = new Date(
              Number(this.receipt.date.substring(0, 4)),
              Number(this.receipt.date.substring(4, 6)) - 1,
              Number(this.receipt.date.substring(6, 8))
            )
          }
        })
        .catch((error) => { console.error(error) })
    }
  },
  data () {
    return {
      receipt: {
        id: undefined,
        type: '0',
        subType: '분류선택',
        date: new Date(),
        amount: 0,
        memo: ''
      },
      errorMsg: ''
    }
  },
  computed: {},
  methods: {
    selectSubType (subType) {
      console.debug('subType selected!', subType)
      this.receipt.subType = subType
    },
    saveReceipt () {
      console.debug(this.receipt)
    }
  }
}
</script>
