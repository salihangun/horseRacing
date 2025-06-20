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
    <el-col :span="24"><div class="grid-content mt-20" />
      <RoundSchedule/>
    </el-col>
  </el-row>

  <el-row class="row-bg">
    <el-col :span="24"><div class="grid-content mt-20" />
      <RaceTrack/>
    </el-col>
    <el-col :span="24"><div class="grid-content mt-20" />
      <RaceResults/>
    </el-col>
  </el-row>

  <el-footer class="footer shadow-xl">
    <GameController class="float-right mt-3" />
  </el-footer>

</template>
<script setup lang="ts">
  import GameController from './components/GameController.vue'
  import HorseList from './components/HorseList.vue'
  import RoundSchedule from './components/RoundSchedule.vue'
  import RaceTrack from './components/RaceTrack.vue'
  import RaceResults from './components/RaceResults.vue'
</script>


<style scoped>
.footer{
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 64px;
  background: white;
  border-top:1px solid #c7b9b9;
}
</style>
