<template>
  <div>
    <Navbar type="main"/>
    <div class="container">
      <div class="jumbotron">
        <h1>메인 페이지</h1>
        <p>
          <h3>Todo:</h3>
          <ul>
            <li>통계형 차트 (보이기/숨김 선택 가능하도록)</li>
            <li>영수증 목록 (날/주 별로 그룹핑 된 상태로)</li>
          </ul>
        </p>
      </div>
      <RecordList />
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import RecordList from './RecordList.vue';

export default {
  created () {

  },
  data () {
    return {

    };
  },
  components: {
    Navbar,
    RecordList
  }
};
</script>