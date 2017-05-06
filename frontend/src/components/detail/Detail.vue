<template>
  <div class="container">
    <div class="jumbotron">
      <h1>상세 페이지</h1>
      <p>
        <h3>Todo:</h3>
        <ul>
          <li><i class="fa fa-check" aria-hidden="true"></i> 신규 영수증 내역 추가 기능</li>
          <li><i class="fa fa-check" aria-hidden="true"></i> 기 등록된 영수증 내역 수정 및 삭제 기능</li>
          <li>복사된 영수증 내역 붙여넣기</li>
        </ul>
      </p>
    </div>
    <form class="form-horizontal">
      <div class="form-group">
        <label class="col-sm-1 control-label">구분</label>
        <div class="col-sm-11">
          <label class="radio-inline" for="type_0">
            <input type="radio" id="type_0" value="0" v-model="receipt.type" /> 소득
          </label>
          <label class="radio-inline" for="type_1">
            <input type="radio" id="type_1" value="1" v-model="receipt.type" /> 지출
          </label>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-1 control-label" for="sub-type">분류</label>
        <div class="col-sm-11">
          <SubTypeModal
            v-bind:type="receipt.type"
            v-bind:sub-type="receipt.subType"
            v-on:selectSubType="selectSubType">
          </SubTypeModal>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-1 control-label" for="amount">날짜</label>
        <div class="col-sm-11">
          <Datepicker 
            input-class="form-control"
            format="yyyy-MM-dd"
            language="ko"
            v-model="receipt.date">
          </Datepicker>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-1 control-label" for="amount">금액</label>
        <div class="col-sm-11">
          <input type="number" class="form-control" id="amount" name="amount" v-model.number="receipt.amount">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-1 control-label" for="memo">메모</label>
        <div class="col-sm-11">
          <input type="text" class="form-control" id="memo" name="memo" v-model="receipt.memo">
        </div>
      </div>
    </form>

    <div v-show="errorMsg" class="alert alert-warning" role="alert">
      <strong><i class="fa fa-exclamation" aria-hidden="true"></i></strong> {{ errorMsg }}
    </div>

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
          result.data.date = new Date(result.data.date)
          result.data.amount = Math.abs(result.data.amount)
          this.receipt = result.data
        })
        .catch((error) => { console.error(error) })
    }
  },
  data () {
    return {
      receipt: {
        _id: undefined,
        type: '0',
        subType: '분류선택',
        date: new Date(),
        amount: 0,
        memo: ''
      },
      errorMsg: ''
    }
  },
  methods: {
    selectSubType (subType) {
      this.receipt.subType = subType
    },
    saveReceipt () {
      // validate
      if ( this._validate() ) {
        // pre-process
        this.receipt.amount *= (this.receipt.type === '0' ? 1 : -1)

        // save
        this.$http.post('/api/receipt', this.receipt)
          .then((result) => {
            // forward to main list page
            this.$router.push({ name: 'main' })
          })
          .catch((err) => {
            console.error(err)
            this.errorMsg = '서버와 통신 중 오류가 발생했습니다.'
          })
      }
    },
    _validate () {
      if ( this.receipt.subType === '분류선택' ) {
        this.errorMsg = '분류를 선택해주세요.'
        return false
      }
      else if ( !$.isNumeric(this.receipt.amount) || this.receipt.amount <= 0 ) {
        this.errorMsg = '올바른 금액을 입력해주세요.'
        return false
      }
      
      this.errorMsg = ''
      return true
    }
  }
}
</script>
