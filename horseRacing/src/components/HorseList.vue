<template>
<div v-if="store.state.horses.length">
  <el-row class="row-bg">
    <el-col :span="24"><div class="grid-content" />
      <h2 class="mb-5 text-lg font-semibold pl-3">Horse List:</h2>
    </el-col>
  </el-row>
  <el-row class="row-bg">
    <el-col :span="6" v-for="horse in store.state.horses" :key="horse.id">
      <el-card class="m-2 p-0">
        <div style="width: 110px" class="float-left mb-4"><img
            src="https://cankayabinicilik.com/uploads/bloglar/Yaris-ati-yetistiriciligi-ve-secimi.webp"
            class="image multi-content"
            style="width: 100px"
        /></div>
        <div style="width:calc(100% - 110px)" class="float-left">
          <p class="font-bold">
            <span class="color-dot" :style="{ backgroundColor: horse.color }"></span>
  {{ horse.name }}
            <span class="left block text-sm" style="color:#888;">Condition: {{ horse.condition }}</span>
          </p>
        </div>
      </el-card>
    </el-col>
  </el-row>

</div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

function generateHorses() {
  store.dispatch('generateHorses')
}
onMounted(() => {
  generateHorses()
})
</script>

<style scoped>
</style>
