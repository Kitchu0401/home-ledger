<template>
  <div>

    <!-- ReceiptListHeader -->
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
    
    <!-- ReceiptList -->
    <ul class="timeline">
      <ReceiptDayGroup
        v-for="receiptGroup in filteredReceiptList"
        v-bind:key="receiptGroup.date"
        v-bind:receiptGroup="receiptGroup">
      </ReceiptDayGroup>
    </ul>

    <!-- DetailModal -->
    <ReceiptDetailModal></ReceiptDetailModal>
    
  </div>
</template>

<script>
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'
import ReceiptDayGroup from './ReceiptDayGroup.vue'
import ReceiptDetailModal from '../receipt/ReceiptDetailModal.vue'

export default {
  name: 'ReceiptList',
  components: {
    Datepicker,
    ReceiptDayGroup,
    ReceiptDetailModal
  },
  created () {
    this.loadReceiptList()

    // bind EventBus events
    this.$EventBus.$on('receipt.save', this.loadReceiptList)
    this.$EventBus.$on('receipt.delete', this.loadReceiptList)
  },
  data () {
    return {
      currentDateString: moment().format('YYYY년 MM월 DD일'),
      sumTotalAmount: 0,
      receiptList: [],
      startDate: moment().subtract(1, 'months').toDate(),
      endDate: moment().toDate()
    }
  },
  computed: {
    startDateString: function () {
      return this.startDate ? moment(this.startDate).format('YYYY-MM-DD') : null
    },
    endDateString: function () {
      return this.endDate ? moment(this.endDate).format('YYYY-MM-DD') : null
    },
    filteredReceiptList: function () {
      return this.receiptList.filter((receipts) => {
        let date = receipts.date.substring(0, 10)
        if ( this.startDateString && this.startDateString > date ) { return false }
        if ( this.endDateString && this.endDateString < date ) { return false }
        return true
      })
    }
  },
  methods: {
    loadReceiptList: function () {
      this.$http.get('/api/receipt')
        .then((result) => { 
          this.sumTotalAmount = result.data.sumTotalAmount
          this.receiptList = result.data.receiptList
        })
        .catch((error) => { console.error(error) })
    },
    newReceipt: function () {
      this.$EventBus.$emit('receipt.view', null)
    },
    setDateRange: function(index) {
      // 최근 일주일
      if ( index === 0 ) {
        this.startDate = moment().subtract(7, 'days').toDate()
        this.endDate = moment().toDate()
      }
      // 최근 한달
      else if ( index === 1 ) {
        this.startDate = moment().subtract(1, 'months').toDate()
        this.endDate = moment().toDate()
      }
      // 전체보기
      else if ( index === 2 ) {
        this.startDate = null
        this.endDate = null
      }
    }
  }
}
</script>

<style>
.form-inline .form-group { display: inline-block; margin-bottom: 0px; }
.form-inline .form-group .form-control { width: 100px; }

.timeline {
    list-style: none;
    padding: 20px 0 20px;
    position: relative;
}

    .timeline:before {
        top: 0;
        bottom: 0;
        position: absolute;
        content: " ";
        width: 3px;
        background-color: #eeeeee;
        left: 50%;
        margin-left: -1.5px;
    }

    .timeline > li {
        margin-bottom: 20px;
        position: relative;
    }

        .timeline > li:before,
        .timeline > li:after {
            content: " ";
            display: table;
        }

        .timeline > li:after {
            clear: both;
        }

        .timeline > li:before,
        .timeline > li:after {
            content: " ";
            display: table;
        }

        .timeline > li:after {
            clear: both;
        }

        .timeline > li > .timeline-panel {
            width: 46%;
            float: left;
            border: 1px solid #d4d4d4;
            border-radius: 2px;
            padding: 20px;
            position: relative;
            -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
            box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
        }

            .timeline > li > .timeline-panel:before {
                position: absolute;
                top: 10px;
                right: -15px;
                display: inline-block;
                border-top: 15px solid transparent;
                border-left: 15px solid #ccc;
                border-right: 0 solid #ccc;
                border-bottom: 15px solid transparent;
                content: " ";
            }

            .timeline > li > .timeline-panel:after {
                position: absolute;
                top: 11px;
                right: -14px;
                display: inline-block;
                border-top: 14px solid transparent;
                border-left: 14px solid #fff;
                border-right: 0 solid #fff;
                border-bottom: 14px solid transparent;
                content: " ";
            }

        .timeline > li > .timeline-badge {
            color: #fff;
            width: 50px;
            height: 50px;
            line-height: 50px;
            font-size: 1.4em;
            text-align: center;
            position: absolute;
            left: 50%;
            margin-left: -25px;
            background-color: #999999;
            z-index: 100;
            border-top-right-radius: 50%;
            border-top-left-radius: 50%;
            border-bottom-right-radius: 50%;
            border-bottom-left-radius: 50%;
        }

        .timeline > li > .timeline-label {
            color: #333;
            width: 50px;
            font-size: 0.7em;
            text-align: center;
            position: absolute;
            top: 54px;
            left: 50%;
            margin-left: -25px;
            background-color: white;
            border: 1px solid #d4d4d4;
            -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
            box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
            z-index: 100;
        }

        .timeline > li > .timeline-panel.timeline-inverted {
            float: right;
        }

            .timeline > li > .timeline-panel.timeline-inverted:before {
                border-left-width: 0;
                border-right-width: 15px;
                left: -15px;
                right: auto;
            }

            .timeline > li > .timeline-panel.timeline-inverted:after {
                border-left-width: 0;
                border-right-width: 14px;
                left: -14px;
                right: auto;
            }

.timeline-badge.primary {
    background-color: #2e6da4 !important;
}

.timeline-badge.success {
    background-color: #3f903f !important;
}

.timeline-badge.warning {
    background-color: #f0ad4e !important;
}

.timeline-badge.danger {
    background-color: #d9534f !important;
}

.timeline-badge.info {
    background-color: #5bc0de !important;
}

.timeline-title {
    margin-top: 0;
    color: inherit;
}

.timeline-body > p,
.timeline-body > ul {
    margin-bottom: 0;
}

    .timeline-body > p + p {
        margin-top: 5px;
    }

@media (max-width: 767px) {
    ul.timeline:before {
        left: 40px;
    }

    ul.timeline > li > .timeline-panel {
        width: calc(100% - 90px);
        width: -moz-calc(100% - 90px);
        width: -webkit-calc(100% - 90px);
    }

    ul.timeline > li > .timeline-badge {
        left: 15px;
        margin-left: 0;
    }

    ul.timeline > li > .timeline-label {
        left: 15px;
        margin-left: 0;
        top: 54px;
    }

    ul.timeline > li > .timeline-panel {
        float: right;
    }

        ul.timeline > li > .timeline-panel:before {
            border-left-width: 0;
            border-right-width: 15px;
            left: -15px;
            right: auto;
        }

        ul.timeline > li > .timeline-panel:after {
            border-left-width: 0;
            border-right-width: 14px;
            left: -14px;
            right: auto;
        }
}
</style>
