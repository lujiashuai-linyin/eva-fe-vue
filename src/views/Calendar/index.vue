<template>
  <div class="app-container" id="calendar-tab">
    <div style="height: 100%; width: 100%;">
      <div class="default-page">
        <div class="tool-panel" style="width: 256px;">
          tool-panel
        </div>
        <div class="calendar-view">
          <div style="width: 100%;">
            header
          </div>
          <!-- 子路由的出口-->
          <router-view></router-view>
          <div class="add-new-event-btn">
            +
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#calendar-tab {
  background-color: #fff;
  overflow: hidden;
  width: 100%;
}
#calendar-tab, #root {
  height: 100%;
  position: relative;
}
.default-page {
  align-items: flex-start;
  display: flex;
  height: 100%;
  justify-content: space-between;
  width: 100%;
}
.default-page .tool-panel {
  background-color: #f8f9fa;
  display: flex;
  flex: none;
  flex-direction: column;
  height: 100%;
  min-width: 230px;
  width: 230px;
}
.default-page .calendar-view {
  align-items: center;
  display: flex;
  flex: auto;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  overflow: hidden;
  user-select: none;
  width: 100%;
}
.calendar-view .calendar {
  align-items: center;
  display: flex;
  flex: auto;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  min-height: 0;
  position: relative;
  width: 100%;
}
</style>