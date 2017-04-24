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
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';

export default {
  name: 'detail',
  components: {
    Navbar
  }
};
</script>