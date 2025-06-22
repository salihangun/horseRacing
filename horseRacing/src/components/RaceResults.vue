<template>
  <div class="results mt-20" v-if="store.state.results.length">
    <el-row class="row-bg">
      <el-col :span="24">
        <h2 class="mb-5 text-lg font-semibold pl-3">Race Results:</h2>
      </el-col>
    </el-row>

    <el-dialog
        v-model="showModal"
        width="500px"
        :close-on-click-modal="true"
        :close-on-press-escape="true"
    >
      <template v-if="latestResult">
        <el-card class="m-2 p-0" shadow="never" style="border:initial">
          <h2 class="mb-5 text-lg font-semibold pl-3" style="border-bottom: 1px solid #303133">
            Round {{ latestResult.round }} ({{ latestResult.distance }}m) Results:
          </h2>
          <ol class="ranking">
            <li v-for="(horse, idx) in latestResult.horses" :key="horse.id">
              <span class="rank-num">{{ idx + 1 }}.</span>
              <span class="winner" :style="{ backgroundColor: horse.color }">
                {{ horse.name }}
                <span class="italic text-xs"> - Condition: {{horse.condition}}</span>
              </span>

            </li>
          </ol>
        </el-card>
        <div class="dialog-footer" style="height: 50px">
          <el-button class="float-right" @click="showModal = false">Close</el-button>
        </div>
      </template>
    </el-dialog>

    <el-row class="row-bg">
      <el-col :span="4" v-for="result in store.state.results" :key="result.round">
        <el-card class="m-2 p-0">
          <h2 class="mb-5 text-lg font-semibold pl-3" style="border-bottom: 1px solid #303133">Round {{ result.round }} ({{ result.distance }}m):</h2>
          <ol class="ranking">
            <li v-for="(horse, idx) in result.horses" :key="horse.id">
              <span class="rank-num">{{ idx + 1 }}.</span>
              <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="`Condition: ${horse.condition}`"
                  placement="top-start"
              ><span class="winner" :style="{ backgroundColor: horse.color }">{{ horse.name }}</span>
              </el-tooltip>
            </li>
          </ol>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { ref, watch } from 'vue'

const store = useStore()
const latestResult = ref<any | null>(null)
const showModal = ref(false)

watch(
    () => store.state.results.length,
    (newLen, oldLen) => {
      if (newLen > oldLen && store.state.results.length > 0) {
        latestResult.value = store.state.results[store.state.results.length - 1]
        showModal.value = true
      }
    }
)
</script>

<style scoped>
.rank-num {
  font-weight: bold;
  color: #444;
  width: 20px;
  display: inline-block;
  font-size: 13px;
}
.winner {
  display: inline-block;
  margin-left: 2px;
  border-radius: 6px;
  padding: 3px 10px;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 4px;
  cursor: pointer;
}
</style>
