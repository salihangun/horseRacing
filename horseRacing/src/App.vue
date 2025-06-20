<script setup lang="ts">
import GameController from './components/GameController.vue'
import HorseList from './components/HorseList.vue'
</script>

<template>
  <el-row class="row-bg">
    <el-col :span="24"><div class="grid-content" />
      <h1 class="mb-5 text-center">Horse Racing Game</h1>
    </el-col>
  </el-row>

  <el-row class="row-bg">
    <el-col :span="24"><div class="grid-content " />
      <HorseList />
    </el-col>
  </el-row>

  <el-row class="row-bg">
    <el-col :span="24"><div class="grid-content" />
      <GameController />
    </el-col>
  </el-row>
  

</template>

<style scoped>
</style>
