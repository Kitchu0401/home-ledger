<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="detailModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">

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
                <div class="col-sm-10" v-if="receipt.type === '0'">
                  <label class="radio-inline" for="분류없음">
                    <input type="radio" id="분류없음" value="분류없음" v-model="receipt.subType" /> 분류없음
                  </label>
                  <label class="radio-inline" for="이자소득">
                    <input type="radio" id="이자소득" value="이자소득" v-model="receipt.subType" /> 이자소득
                  </label>
                  <label class="radio-inline" for="입금">
                    <input type="radio" id="입금" value="입금" v-model="receipt.subType" /> 입금
                  </label>
                  <label class="radio-inline" for="환불">
                    <input type="radio" id="환불" value="환불" v-model="receipt.subType" /> 환불
                  </label>
                </div>
                <div class="col-sm-10" v-if="receipt.type === '1'">
                  <label class="radio-inline" for="분류없음">
                    <input type="radio" id="분류없음" value="분류없음" v-model="receipt.subType" /> 분류없음
                  </label>
                  <label class="radio-inline" for="식료품">
                    <input type="radio" id="식료품" value="식료품" v-model="receipt.subType" /> 식료품
                  </label>
                  <label class="radio-inline" for="생활용품">
                    <input type="radio" id="생활용품" value="생활용품" v-model="receipt.subType" /> 생활용품
                  </label>
                  <label class="radio-inline" for="외식">
                    <input type="radio" id="외식" value="외식" v-model="receipt.subType" /> 외식
                  </label>
                  <label class="radio-inline" for="의약품">
                    <input type="radio" id="의약품" value="의약품" v-model="receipt.subType" /> 의약품
                  </label>
                  <label class="radio-inline" for="주류">
                    <input type="radio" id="주류" value="주류" v-model="receipt.subType" /> 주류
                  </label>
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
                  <input type="number" class="form-control" id="amount" name="amount" v-model.number="receipt.amount">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label" for="memo">메모</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="memo" name="memo" v-model="receipt.memo">
                </div>
              </div>
            </form>

            <div v-show="errorMsg" class="alert alert-warning" role="alert">
              <strong><i class="fa fa-exclamation" aria-hidden="true"></i></strong> {{ errorMsg }}
            </div>

            <div class="btn-group btn-group-justified" role="group" aria-label="...">
              <div v-show="receipt._id" class="btn-group" role="group">
                <button type="button" class="btn btn-primary" v-on:click="deleteReceipt">Delete receipt</button>
              </div>
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-primary" v-on:click="saveReceipt">Save receipt</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

const TYPES = {
  // 소득 하위 분류
  '0': ['분류없음', '이자소득', '입금', '환불'],
  // 지출 하위 분류
  '1': ['분류없음', '식료품', '생활용품', '외식', '의약품', '주류']
}

const newReceipt = {
  _id: undefined,
  type: '0',
  subType: '분류없음',
  date: new Date(),
  amount: 0,
  memo: ''
}

export default {
  name: 'detail',
  components: {
    Datepicker,
  },
  created () {
    // bind EventBus events
    this.$EventBus.$on('receipt.view', this.openModal)
  },
  data () {
    return {
      receipt: newReceipt,
      errorMsg: ''
    }
  },
  computed: {
    // subTypeMarkup: function () {
    //   let _receipt = this.receipt
    //   return TYPES[this.receipt.type].reduce(function (html, subType) {
    //     return html + `<label class="radio-inline" for="sub-type-${subType}">
    //               <input type="radio" name="subType" id="sub-type-${subType}" value="${subType}" v-model="_receipt.subType"> ${subType}
    //             </label>`
    //   }, '')
    // }
  },
  methods: {
    openModal: function (receipt) {
      if ( receipt ) {
        this.$http.get(`/api/receipt/${receipt._id}`)
          .then((result) => {
            result.data.date = new Date(result.data.date)
            result.data.amount = Math.abs(result.data.amount)
            this.receipt = result.data
          })
          .catch(this._handleError)
      } else {
        this.receipt =newReceipt
      }
      
      $('#detailModal').modal('show')
    },
    closeModal: function () {
      $('#detailModal').modal('hide')
    },
    selectSubType: function (subType) {
      this.receipt.subType = subType
    },
    deleteReceipt: function () {
      let _this = this
      if ( this.receipt._id ) {
        // delete
        this.$http.delete(`/api/receipt/${this.receipt._id}`)
          .then(function () {
            _this.$EventBus.$emit('receipt.delete', _this.receipt)
            _this.closeModal()
          })
          .catch(_this._handleError)
      } else {
        this._handleError()
      }
    },
    saveReceipt: function () {
      let _this = this
      // validate
      if ( this._validate() ) {
        // pre-process
        this.receipt.amount *= (this.receipt.type === '0' ? 1 : -1)
        this.receipt.state = 1

        // save
        this.$http.post('/api/receipt', this.receipt)
          .then(function () {
            _this.$EventBus.$emit('receipt.save', _this.receipt)
            _this.closeModal()
          })
          .catch(_this._handleError)
      }
    },
    _validate: function () {
      if ( this.receipt.subType === '분류선택' ) {
        // this.errorMsg = '분류를 선택해주세요.'
        // return false
      }
      else if ( !$.isNumeric(this.receipt.amount) || this.receipt.amount <= 0 ) {
        this.errorMsg = '올바른 금액을 입력해주세요.'
        return false
      }
      
      this.errorMsg = ''
      return true
    },
    _handleError: function (err) {
      console.error(err)
      this.errorMsg = '서버와 통신 중 오류가 발생했습니다.'
    },
  }
}
</script>
