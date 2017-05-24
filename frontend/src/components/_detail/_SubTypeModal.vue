<template>
  <div>
    <input
      v-model:value="subType"
      v-on:click="openModal"
      class="btn btn-default" type="button">

    <!-- Modal -->
    <div class="modal fade" id="subTypeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <ul class="list-group">
              <li 
                v-for="t in types"
                v-on:click="selectSubType(t)"
                class="list-group-item">
                <h3>{{ t }}&nbsp;&nbsp;<i v-if="subType === t" class="fa fa-hand-o-left" aria-hidden="true"></i></h3>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const TYPES = {
  // 소득 하위 분류
  '0': ['이자소득', '입금', '환불'],
  // 지출 하위 분류
  '1': ['식료품', '생활용품', '외식', '의약품', '주류']
}

export default {
  name: 'subTypeModal',
  props: ['type', 'subType'],
  data () {
    return {
      types: []
    };
  },
  methods: {
    openModal () {
      this.types = TYPES[this.type].sort((p, c) => { return p < c ? -1 : 1 })
      $('#subTypeModal').modal('show')
    },
    selectSubType (subType) {
      this.$emit('selectSubType', subType)
      $('#subTypeModal').modal('hide')
    }
  }
};
</script>

<style scoped>
.modal-body { padding: 0px; }
.list-group { margin: 0px; }
.list-group-item { text-align: center; }
</style>