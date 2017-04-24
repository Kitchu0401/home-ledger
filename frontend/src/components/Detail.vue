<template>
  <div>
    <Navbar type="detail"/>
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
            <div class="btn-group btn-group-justified" role="group" data-toggle="buttons">
              <label class="btn btn-default" for="type_0">
                <input type="radio" id="type_0" name="type" value="0" v-model="record.type" /> 소득
              </label> 
              <label class="btn btn-default" for="type_1">
                <input type="radio" id="type_1" name="type" value="1" v-model="record.type" /> 지출
              </label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label" for="sub-type">분류</label>
          <div class="col-sm-10">
            <p class="form-control-static">TODO: 분류 모달 호출</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label" for="amount">금액</label>
          <div class="col-sm-10">
            <input type="number" class="form-control" id="amount" name="amount" v-model="record.amount">
          </div>
        </div>
        <div class="form-group" v-if="show">
          <label class="col-sm-2 control-label" for="memo">메모</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="memo" name="memo" v-model="record.memo">
          </div>
        </div>
      </form>
      <button class="btn btn-primary form-control" v-on:click="toggleShow">ToggleShow</button>
      <button class="btn btn-primary form-control" v-on:click="printValues">PrintValues</button>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';

export default {
  name: 'detail',
  components: {
    Navbar
  },
  created () {

  },
  data () {
    return {
      record: {
        type: '0',
        amount: 0,
        memo: 'Default value'
      },
      show: true
    };
  },
  methods: {
    toggleShow () {
      this.show = !this.show;
    },
    printValues () {
      console.debug(this.record);
    }
  }
};
</script>