<template>
  <div class="app-container" id="calendar-tab">
    <div style="height: 100%; width: 100%;">
      <div class="default-page">
          <!-- 日历左边栏 -->
        <div class="tool-panel" :style="!show_tool_panel?'display: none;': 'width: 256px;'">
          <div class="con">
            <div class="now-data-myself">
              <div class="now-data-myself-time">{{ date }}</div>
              <div class="now-data-myself-week">{{ week }}</div>
            </div>
            <Calendar
                v-on:choseDay="clickDay"
                ref="CalendarTool"
            ></Calendar>
          </div>
        </div>
        <div class="calendar-view">
          <div style="width: 100%;">
            <div class="tool-bar tool-bar-timeRight lark-draggable" style="height: 60px;">
              <div class="nav-label">
                <div class="tool-bar-navigator week">
                  <div class="label-btn lark-drag-disable align-left"
                       @click="closeToolPanel"
                  > {{ triger }} </div>
                  <el-button
                      icon="el-icon-arrow-left"
                      @click="getPrev"
                      class="fc_btns"
                      style="margin-left: 3px"
                  ></el-button>
                  <el-button
                      icon="el-icon-arrow-right"
                      @click="getNext"
                      class="fc_btns"
                  ></el-button>
                </div>
                <div :class="current_label==='day'?'today-label':'week-label'">
                  <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ title }}</span>
                </div>
              </div>
              <div class="nav-wrapper">
                <div class="mode-section">
                  <el-button-group>
                    <el-button
                        @click="today"
                        type="success"
                        size="medium"
                        :class="istoday?'today-selected':'fc_btns_right_today'"
                    >今天</el-button
                    >
                    <el-button
                        @click="month"
                        type="primary"
                        size="medium"
                        :class="current_label==='month'?'other-selected':'fc_btns_right'"
                    >月</el-button
                    >
                    <el-button
                        @click="GoWeek"
                        type="primary"
                        size="medium"
                        :class="current_label==='week'?'other-selected':'fc_btns_right'"
                    >周</el-button
                    >
                    <el-button
                        @click="day"
                        type="primary"
                        size="medium"
                        :class="current_label==='day'?'other-selected':'fc_btns_right'"
                    >日</el-button
                    >
                    <el-button
                        @click="list"
                        type="primary"
                        size="medium"
                        :class="current_label==='list'?'other-selected':'fc_btns_right'"
                    >列表</el-button
                    >
                  </el-button-group>
                </div>
                <div _pp-theme="light" class="menu-list">
                  <span class="universe-icon">
                    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-icon="DialpadOutlined">
                      <path d="M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm2 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm6-14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm2 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-2 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm8-16a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm2 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-2 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill="currentColor"></path>
                    </svg>
                  </span>
                </div>
                <div _pp-theme="light" data-version="5.4.11" class="_pp-trigger-container node_modules-@byted-larklet-calendar-es-electron-render-calendar-modules-Calendar-ToolBarTemplate-corner-index-web-module__user-panel-wrapper--Hac3E">
                  <div class="_pp-trigger-container _pp-control-close">
                    <div class="_pp-header-avatar-box">
                      <div class="_pp-header-avatar">
                        <img src="https://s1-imfile.feishucdn.com/static-resource/v1/v2_7cd110ab-3889-4505-8d46-b9e8fde9532g~?image_size=noop&amp;cut_type=&amp;quality=&amp;format=image&amp;sticker_format=.webp">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 日历本体 -->
          <el-col>
            <div style="margin-left: 0px">
              <FullCalendar ref="fullCalendar" :options="calendarOptions" />
            </div>
            <!-- 事件添加或修改对话框 -->
            <el-dialog
                :visible.sync="dialogVisible"
                :popperAppendToBody="false"
                @close="cancel"
                width="492px"
                :close-on-click-modal="true"
                class="calendar_matters"
            >
              <div slot="title" class="header-title" :style="{ color: 'black' }">
                <i class="el-icon-edit"></i><span> &nbsp;日程</span>
              </div>
              <el-form ref="form" :model="form" label-width="80px">
                <el-row>
                  <div class="des-area">
                    <svg class="larkc-svg-icon icon" aria-hidden="true" viewBox="0 0 1024 1024"><path d="M170.666667 170.666667v682.666666h682.666666V170.666667H170.666667zM128 85.333333h768a42.666667 42.666667 0 0 1 42.666667 42.666667v768a42.666667 42.666667 0 0 1-42.666667 42.666667H128a42.666667 42.666667 0 0 1-42.666667-42.666667V128a42.666667 42.666667 0 0 1 42.666667-42.666667z m149.333333 170.666667h298.666667a21.333333 21.333333 0 0 1 21.333333 21.333333v42.666667a21.333333 21.333333 0 0 1-21.333333 21.333333H277.333333a21.333333 21.333333 0 0 1-21.333333-21.333333v-42.666667a21.333333 21.333333 0 0 1 21.333333-21.333333z"></path></svg>
                    <input class="vmInput" v-model="form.title" maxlength="200" placeholder="添加主题">
                  </div>
                </el-row>
                <el-row>
                  <div class="des-area">
                    <svg class="larkc-svg-icon icon" aria-hidden="true" viewBox="0 0 1024 1024"><path d="M554.666667 469.333333h149.333333a21.333333 21.333333 0 0 1 21.333333 21.333334v42.666666a21.333333 21.333333 0 0 1-21.333333 21.333334H490.666667a21.269333 21.269333 0 0 1-21.333334-21.333334V320a21.333333 21.333333 0 0 1 21.333334-21.333333h42.666666a21.333333 21.333333 0 0 1 21.333334 21.333333v149.333333z m-42.666667 426.666667c212.074667 0 384-171.925333 384-384S724.074667 128 512 128 128 299.925333 128 512s171.925333 384 384 384z m0 85.333333C252.8 981.333333 42.666667 771.2 42.666667 512S252.8 42.666667 512 42.666667s469.333333 210.133333 469.333333 469.333333-210.133333 469.333333-469.333333 469.333333z"></path></svg>
                    <div class="dateRange">
                      <el-date-picker
                          v-model="dateRange"
                          type="datetimerange"
                          prefix-icon="a"
                          range-separator="至"
                          size="small"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                      >
                      </el-date-picker>
                    </div>
                  </div>
                </el-row>
                <el-row>
                    <div class="des-area">
                      <div class="record-status-type">
                        <svg t="1669203395674" class="icon" style="margin-left: -4px;margin-right: -5px" viewBox="0 0 1024 1024" width="23" height="23"><path d="M516.8 441.3h324.6c11.3 0 20.5 9.2 20.5 20.5s-9.2 20.5-20.5 20.5H516.8c-11.3 0-20.5-9.2-20.5-20.5s9.2-20.5 20.5-20.5zM516.8 605.1h324.6c11.3 0 20.5 9.2 20.5 20.5s-9.2 20.5-20.5 20.5H516.8c-11.3 0-20.5-9.2-20.5-20.5 0-11.4 9.2-20.5 20.5-20.5zM516.8 768.8h324.6c11.3 0 20.5 9.2 20.5 20.5s-9.2 20.5-20.5 20.5H516.8c-11.3 0-20.5-9.2-20.5-20.5s9.2-20.5 20.5-20.5z" p-id="2555" fill="#707070"></path><path d="M411.3 504.3H206.6c-12.2 0-22-9.9-22-22V277.6c0-12.1 9.8-22 22-22h204.7c12.2 0 22 9.9 22 22v204.6c0 12.2-9.8 22.1-22 22.1z m-182.7-44h160.7V299.6H228.6v160.7zM411.3 831.7H206.6c-12.2 0-22-9.9-22-22V605.1c0-12.1 9.8-22 22-22h204.7c12.2 0 22 9.9 22 22v204.7c0 12.1-9.8 21.9-22 21.9z m-182.7-44h160.7V627.1H228.6v160.6z" p-id="2556" fill="#707070"></path><path d="M516.8 277.6h324.6c11.3 0 20.5 9.2 20.5 20.5s-9.2 20.5-20.5 20.5H516.8c-11.3 0-20.5-9.2-20.5-20.5s9.2-20.5 20.5-20.5z" p-id="2557" fill="#707070"></path></svg>
                        <el-select v-model="form.record_type" placeholder="日程类型">
                          <el-option
                              v-for="item in record_type_list"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                      <div class="record-status-type">
                        <svg class="larkc-svg-icon icon" aria-hidden="true" viewBox="0 0 1024 1024"><path d="M426.666667 117.76V85.333333a21.333333 21.333333 0 0 1 21.333333-21.333333h128a21.333333 21.333333 0 0 1 21.333333 21.333333v32.426667c147.2 39.125333 256 177.066667 256 341.248V704h64a21.333333 21.333333 0 0 1 21.333334 21.333333v42.666667a21.333333 21.333333 0 0 1-21.333334 21.333333H106.666667a21.333333 21.333333 0 0 1-21.333334-21.333333v-42.666667a21.333333 21.333333 0 0 1 21.333334-21.333333h64V459.008C170.666667 294.826667 279.466667 156.885333 426.666667 117.76zM256 704h512V459.136C768 311.594667 653.376 192 512 192s-256 119.594667-256 267.136V704z m149.333333 149.333333h213.333334a21.333333 21.333333 0 0 1 21.333333 21.333334v42.666666a21.333333 21.333333 0 0 1-21.333333 21.333334H405.333333a21.333333 21.333333 0 0 1-21.333333-21.333334v-42.666666a21.333333 21.333333 0 0 1 21.333333-21.333334z"></path></svg>
                        <el-radio v-model="form.alert" :label=true style="width: 42px;margin-left: 0px;" class="record-status" size="small">提醒</el-radio>
                        <el-radio v-model="form.alert" :label=false style="width: 80px;margin-left: 0px;" class="record-status" size="small">不提醒</el-radio>
                      </div>
                    </div>
                </el-row>
                <el-row>
                    <div class="des-area">
                      <svg class="larkc-svg-icon icon" aria-hidden="true" viewBox="0 0 1024 1024"><path d="M213.333333 128v768h597.333334V128H213.333333zM170.666667 42.666667h682.666666c23.573333 0 42.666667 20.010667 42.666667 44.693333v849.28C896 961.322667 876.906667 981.333333 853.333333 981.333333H170.666667c-23.573333 0-42.666667-20.010667-42.666667-44.693333V87.36C128 62.677333 147.093333 42.666667 170.666667 42.666667z m149.333333 256h128a21.333333 21.333333 0 0 1 21.333333 21.333333v42.666667a21.333333 21.333333 0 0 1-21.333333 21.333333h-128a21.333333 21.333333 0 0 1-21.333333-21.333333v-42.666667a21.333333 21.333333 0 0 1 21.333333-21.333333z m0 170.666666h384a21.333333 21.333333 0 0 1 21.333333 21.333334v42.666666a21.333333 21.333333 0 0 1-21.333333 21.333334H320a21.333333 21.333333 0 0 1-21.333333-21.333334v-42.666666a21.333333 21.333333 0 0 1 21.333333-21.333334z m0 170.666667h384a21.333333 21.333333 0 0 1 21.333333 21.333333v42.666667a21.333333 21.333333 0 0 1-21.333333 21.333333H320a21.333333 21.333333 0 0 1-21.333333-21.333333v-42.666667a21.333333 21.333333 0 0 1 21.333333-21.333333z"></path></svg>
                      <input class="vmInput" v-model="form.content" placeholder="添加描述">
                    </div>
                </el-row>
                <el-row>
                  <div class="label-container">
                    <svg class="larkc-svg-icon icon" aria-hidden="true"  viewBox="0 0 1024 1024"><path d="M768 213.333333v42.666667a21.333333 21.333333 0 0 1-21.333333 21.333333h-42.666667a21.333333 21.333333 0 0 1-21.333333-21.333333v-42.666667H341.333333v42.666667a21.333333 21.333333 0 0 1-21.333333 21.333333h-42.666667a21.333333 21.333333 0 0 1-21.333333-21.333333v-42.666667H170.666667v213.333334h682.666666V213.333333h-85.333333z m0-85.333333h128c23.573333 0 42.666667 20.16 42.666667 45.034667V893.653333C938.666667 918.506667 919.573333 938.666667 896 938.666667H128c-23.573333 0-42.666667-20.16-42.666667-45.034667V173.013333C85.333333 148.16 104.426667 128 128 128h128V85.333333a21.333333 21.333333 0 0 1 21.333333-21.333333h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333333v42.666667h341.333334V85.333333a21.333333 21.333333 0 0 1 21.333333-21.333333h42.666667a21.333333 21.333333 0 0 1 21.333333 21.333333v42.666667zM170.666667 512v341.333333h682.666666V512H170.666667z"></path></svg>
                    <div class="calendar-select-wrapper">
                      <div class="_trigger ">
                      <div tabindex="0" class="_selection showTriangle calendar-select fastCreateEvent--calendarSelect" data-selected-value="">
                        <div class="calendar-dom">
                          <div class="color" style="background-color: rgb(78, 131, 253);"></div>
                          <div class="summary">{{ username }}</div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </el-row>
<!--                  <el-row>-->
<!--                    <el-col :span="18" :xs="24">-->
<!--                      <el-form-item label="附件" class="attachment" prop="address">-->
<!--                        <el-upload-->
<!--                            action="#"-->
<!--                            :show-file-list="false"-->
<!--                            :auto-upload="false"-->
<!--                            :on-change="address_beforeupload"-->
<!--                        >-->
<!--                          <div>-->
<!--                            <el-button-->
<!--                                type="primary"-->
<!--                                icon="el-icon-folder-opened"-->
<!--                            ></el-button>-->
<!--                          </div>-->
<!--                        </el-upload>-->
<!--                        <el-input-->
<!--                            v-model="form.address"-->
<!--                            clearable-->
<!--                        ></el-input></el-form-item-->
<!--                      ></el-col>-->
<!--                  </el-row>-->
<!--                  <el-row>-->
<!--                    <el-col :span="24" :xs="24">-->
<!--                      <el-form-item label="相关图片" prop="address">-->
<!--                        <el-upload-->
<!--                            ref="uploadFile"-->
<!--                            class="upload-demo"-->
<!--                            action="#"-->
<!--                            :auto-upload="false"-->
<!--                            :show-file-list="true"-->
<!--                            :on-change="beforeupload"-->
<!--                            list-type="picture-card"-->
<!--                            :file-list="filelist"-->
<!--                            multiple-->
<!--                        >-->
<!--                          <i slot="default" class="el-icon-plus"></i>-->
<!--                          <div slot="file" slot-scope="{ file }">-->
<!--                            <img-->
<!--                                class="el-upload-list__item-thumbnail"-->
<!--                                :src="file.url"-->
<!--                                alt=""-->
<!--                            />-->
<!--                            <span class="el-upload-list__item-actions">-->
<!--                          <span-->
<!--                              class="el-upload-list__item-preview"-->
<!--                              @click="handlePictureCardPreview(file)"-->
<!--                          >-->
<!--                            <i class="el-icon-zoom-in"></i>-->
<!--                          </span>-->
<!--                          <span-->
<!--                              v-if="!disabled"-->
<!--                              class="el-upload-list__item-delete"-->
<!--                              @click="handleDownload(file)"-->
<!--                          >-->
<!--                            <i class="el-icon-download"></i>-->
<!--                          </span>-->
<!--                          <span-->
<!--                              v-if="!disabled"-->
<!--                              class="el-upload-list__item-delete"-->
<!--                              @click="handleRemove(file)"-->
<!--                          >-->
<!--                            <i class="el-icon-delete"></i>-->
<!--                          </span>-->
<!--                        </span>-->
<!--                          </div>-->
<!--                        </el-upload>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
<!--                  </el-row>-->
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="()=>{Goto('/')}">更多选项</el-button>
                <el-button type="primary" @click="submitForm">保存</el-button>
              </div>
            </el-dialog>
            <!-- 图片预览对话框 -->
            <!--        <el-image-viewer-->
            <!--            v-if="img_dialogVisible"-->
            <!--            :initial-index="0"-->
            <!--            :on-close="onClose"-->
            <!--            :url-list="dialogImageUrl"-->
            <!--            style="z-index: 3000"-->
            <!--        ></el-image-viewer>-->
          </el-col>
            <!-- 添加事件 -->
          <div class="add-new-event-btn">
            +
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { auto } from "@popperjs/core";
import Treeselect from "@riophae/vue-treeselect"; // Treeselect插件
import "@riophae/vue-treeselect/dist/vue-treeselect.css"; // 若依css设置
import '@fullcalendar/core/vdom'
import cookie from 'js-cookie';
import moment from "moment";
// import 'vue-datepicker-ui/lib/vuedatepickerui.css';
// import VueDatepickerUi from 'vue-datepicker-ui';
import Calendar from 'vue-calendar-component';
export default {
// 注册局部组件
  components: {
    FullCalendar,
    Calendar,
    // Datepicker: VueDatepickerUi,
    Treeselect,
    "el-image-viewer": () =>
        import("element-ui/packages/image/src/image-viewer"),
  },
  data() {
    return {
      // 左侧日历
      date: "",
      week: "",

      show_tool_panel: true,
      username: '',
      istoday: false,
      current_label: '',
      triger: '<<收起',
      // 搜索框输入的文本
      search_input: "",

      // treeselect插件默认配置
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 提醒类别设置
      record_type_list: [{
        value: '会议',
        label: '会议'
      }, {
        value: '饮食',
        label: '饮食'
      }, {
        value: '娱乐',
        label: '娱乐'
      }, {
        value: '学习',
        label: '学习'
      }, {
        value: '工作',
        label: '工作'
      }, {
        value: '日常',
        label: '日常'
      }],
      // 表单是否显示
      dialogVisible: false,
      // 表单标题栏
      title: "事件",
      // 表单当前编辑模式设置，add或amend
      form_edited_state: "",
      // 表单内容设置项
      form: {
        id: 0,
        isAllDay: false,
        record_type: "日常",
        title: undefined,
        content: undefined,
        repeat: "不重复",//每天，每周，每月，每年
        alert: false,//是否提醒
        pre_alert_time: undefined,
        user_status: undefined,
        place: undefined,
        img: "",
        address: "",
      },
      // 表单日期设置
      dateRange: [],
      // 图片预览的操作按钮是否展示
      disabled: false,
      // 图片是否显示
      img_dialogVisible: false,
      // 预览图片地址
      dialogImageUrl: "",
      // el-popover弹出框标题内容
      popover_title: "事项",
      // el-popover图片地址存放
      popoverimg: [],
      // 附件地址存放
      filelist: [],

      // calendarOptions: {
      //   plugins: [ dayGridPlugin, interactionPlugin ],
      //   initialView: 'dayGridMonth',
      //   weekends: true // initial value
      // },

      // ------------------
      // Fullcalendar版本@5.11.3日历控件设置项，官网文档地址：https://fullcalendar.io/
      calendarOptions: {
        // visibleRange: { start: "2021-09-01", end: "2022-10-01" }, // 可视化区间
        // validRange: { start: "2021-09-01", end: "2021-09-01" }, // 可展示区间
        // 引入的插件，比如fullcalendar/daygrid，fullcalendar/timegrid引入后才可显示月，周，日
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
        initialView: "timeGridDay", // 默认为那个视图（月：dayGridMonth，周：timeGridWeek，日：timeGridDay）
        firstDay: 1, // 设置一周中显示的第一天是哪天，周日是0，周一是1，类推
        locale: "zh-cn", // 切换语言，当前为中文
        allDaySlot: true, // 不显示all-day
        businessHours: false, //
        handleWindowResize: true, // 是否随浏览器窗口大小变化而自动变化。
        allDayText: "GMT+8", // 设置all-Day显示的文字，不设置的话默认显示"all-Day"
        slotDuration: '00:15:00', // 在agenda的视图中, 两个时间之间的间隔(分钟)
        slotLabelInterval: "01:00",
        scrollTime: "09:00:00",
        unselectAuto: false,
        defaultEventMinutes: 30,// 事件默认的时间执行长度，如果事件对象没有指定执行多长时间，则默认执行1h
        // scrollTime: '09:15:00',
        themeSystem: "bootstrap", // 主题色(本地测试未能生效)
        // loading: this.loadingEvent, // 视图数据加载中、加载完成触发（用于配合显示/隐藏加载指示器。）
        // selectAllow: this.selectAllow, //编程控制用户可以选择的地方，返回true则表示可选择，false表示不可选择
        // eventMouseEnter: this.eventMouseEnter, // 鼠标滑过
        allowContextMenu: false,
        editable: true, // 是否可以进行（拖动、缩放）修改
        eventStartEditable: true, // Event日程开始时间可以改变，默认true，如果是false其实就是指日程块不能随意拖动，只能上下拉伸改变他的endTime
        eventDurationEditable: true, // Event日程的开始结束时间距离是否可以改变，默认true，如果是false则表示开始结束时间范围不能拉伸，只能拖拽
        // selectable: true, // 是否可以选中日历格
        selectMirror: true,
        selectMinDistance: 0, // 选中日历格的最小距离
        // eventLimit: true, //数据条数太多时，限制各自里显示的数据条数（多余的以“+2more”格式显示），默认false不限制,支持输入数字设定固定的显示条数
        moreLinkContent: "+ 更多", //当一块区域内容太多以"+2 more"格式显示时，这个more的名称自定义
        // dayPopoverFormat: "YYYY-M-d",
        dayMaxEventRows: true, // 日历显示事件最大条数，for all non-TimeGrid views
        // weekends: true, //
        // navLinks: true, // 天链接
        selectHelper: false,
        stickyHeaderDates: true,// 粘性
        // slotEventOverlap: false, // 相同时间段的多个日程视觉上是否允许重叠，默认true允许
        aspectRatio: 20, //设置日历单元格宽度与高度的比例。
        expandRows: false,
        contentHeight: 100,
        height: 800,
        nowIndicator: true, //周/日视图中显示今天当前时间点（以红线标记），默认false不显示
        weekMode: "fixed", //在月视图里显示周的模式，因为每月周数可能不同，所以月视图高度不一定。fixed：固定显示6周高，日历高度保持不变liquid：不固定周数，高度随周数变化variable：不固定周数，但高度固定
        weekNumbers: false, //是否在日历中显示周次(一年中的第几周)，如果设置为true，则会在月视图的左侧、周视图和日视图的左上角显示周数。
        weekText: "周",
        customButtons: {
          //自定义按钮
          getToday: {
            text: "今天",
            click: this.getToday,
          },
          getNext: {
            text: ">",
            click: this.getNext,
          },
          getPrev: {
            text: "<",
            click: this.getPrev,
          },
          // getPrevYear: {
          //   text: "<<",
          //   click: this.getPrevYear,
          // },
          // getNextYear: {
          //   text: ">>",
          //   click: this.getNextYear,
          // },
          customButton: {
            text: "今日标记全部已完成",
            click: this.customButton,
          },
          customButton1: {
            text: "显示未完成",
            click: this.customButton,
          },
        },
        // 日历头部按钮，即Fullcalendar表头显示区域
        // headerToolbar: {
        //   left: "getPrevYear,getPrev,getToday,getNext,getNextYear", //"getPrevYear,getPrev,getToday,getNext,getNextYear customButton,customButton1",
        //   center: "title",
        //   right:
        //     "customButton customButton1 dayGridMonth,timeGridWeek,timeGridDay,listMonth", //dayGridWeek,listMonth
        // },
        headerToolbar: false, // Fullcalendar表头显示区域不显示，显示自己自定义的html头部
        // 使用内置按钮的显示文本
        buttonText: {
          today: "今天",
          month: "月",
          week: "周",
          day: "日",
          list: "日程",
        },
        // 设置日历显示事件时间头
        slotLabelFormat: {
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
          hour12: false, // 设置时间为24小时
        },
        // 视图的一些基本设置
        views: {
          // 月视图阳历转农历
          dayGridMonth: {
            height: 500,
            displayEventTime: true, //是否显示时间
            dayMaxEventRows: 4, // adjust to 6 only for timeGridWeek/timeGridDay
            // titleFormat: { year: "numeric", month: "2-digit", day: "2-digit" }, //控制日历显示的标题
            // moreLinkContent: "+ 更多", //可放在这里单独对每个视图控制显示更多的文字
            moreLinkClick: "popover",
            eventTimeFormat: {
              hour: "numeric",
              minute: "2-digit",
              meridiem: false,
            },
            dayPopoverFormat: {
              month: "long",
              day: "numeric",
              year: "numeric",
            },
            // 显示农历
            // dayCellContent(item) {
            //   let _date = new Date(item.date).toLocaleDateString().split("/");
            //   let _dateF = calendar.solarToLunar(_date[0], _date[1], _date[2]);
            //   // 以二十四节气覆盖农历日期
            //   if (calendar.getLunar24Days(_date[0], _date[1], _date[2])) {
            //     _dateF.dayStr = calendar.getLunar24Days(
            //       _date[0],
            //       _date[1],
            //       _date[2]
            //     );
            //   }
            //   return { html: `<p>${item.dayNumberText}(${_dateF.dayStr})</p>` };
            // },
          },
          timeGridWeek: {},
          timeGridDay: {},
          listMonth: {},
        },
        // 设置过往时间无法点击
        // selectAllow: function (clickInfo) {
        //   if (clickInfo.end < new Date()) {
        //     return false;
        //   }
        //   return true;
        // },
        weekends: true, //是否显示周末，设为false则不显示周六和周日
        selectable: true, //是否可以选中日历格
        // editable: false, //是否可以进行（拖动、缩放）修改
        navLinks: true, //天链接
        select: this.selectDate, //选中日历格事件
        eventClick: this.handleEventClick, //选中备忘录事件
        eventsSet: this.handleEvents,
        events: this.getCalendarList, //获取数据源
        eventMouseEnter: this.eventMouseEnter, //鼠标悬浮事件
        slotEventOverlap: true, //相同时间段的多个日程视觉上是否允许重叠，默认true允许
        eventResize: this.onEventResize, // 事件时间区间调整
        eventDrop: this.onEventResize, // 事件Drag-Drop事件
        eventMouseLeave: this.eventMouseLeave, // 鼠标移出事件发生的事件
      },
    };
  },
  mounted() {
    this.calendarApi = this.$refs.fullCalendar.getApi();
    console.log("calendarApi:", this.calendarApi)
    this.title = this.calendarApi.view.title;
    this.username = cookie.get("username")
  },
  created() {
    let now = new Date();
    this.date = now.getDate();//得到日期
    let day = now.getDay();//得到周几
    let arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    this.week = arr_week[day];
  },
  watch: {
    search_input: {
      handler: function (newData, oldData) {
        if (newData === "") {
          this.month();
          this.getToday();
        }
      },
      deep: true,
    },
  },
  methods: {
    // 左侧日历
    clickDay(data) {
      //选中某天
      let now = new Date();
      if (moment.utc(data).toDate().toLocaleDateString() !== now.toLocaleDateString()) {
        this.istoday = false;
      }
      let calendarApi = this.$refs.fullCalendar.getApi();
      let focusDay = moment.utc(data).toDate()
      calendarApi.gotoDate(focusDay)
      this.title = this.calendarApi.view.title;
    },
    // changeDate(data) {
    //   console.log(data); //左右点击切换月份
    //
    // },
    // clickToday(data) {
    //   console.log(data); // 跳到了本月
    // },



    Goto(path) {
      this.$router.push(path)
    },
    // 关闭左侧工具栏
    closeToolPanel() {
      this.show_tool_panel = !this.show_tool_panel;
      if (this.triger === "<<收起") {
        this.triger = "展开>>"
      } else {
        this.triger = "<<收起"
      }
    },
    // 将当前时间移至今日事件
    today() {
      this.istoday = true;
      this.getToday();
      let now = new Date();
      let currentDay = moment(now).format("YYYY-MM-DD")
      console.log(currentDay)
      this.$refs.CalendarTool.ChoseMonth(currentDay)
    },
    // 月视图
    month() {
      this.current_label = 'month';
      this.calendarApi.changeView("dayGridMonth");
      this.title = this.calendarApi.view.title;
    },
    // 周视图
    GoWeek() {
      this.current_label = 'week';
      this.calendarApi.changeView("timeGridWeek");
      this.title = this.calendarApi.view.title;
    },
    // 日视图
    day() {
      this.current_label = 'day';
      this.calendarApi.changeView("timeGridDay");
      this.handleTime(this.calendarApi.currentData.dateProfile.activeRange);
      this.title = this.calendarApi.view.title;
    },
    // 列表视图
    list() {
      this.current_label = 'list'
      this.calendarApi.changeView("listMonth");
      this.title = this.calendarApi.view.title;
    },
    // 鼠标划过，使用tippy插件显示tooltip
    eventMouseEnter(info) {
      // 非周列表的情况下显示悬浮提示;
      // if (info.view.type != "listWeek") {
      //   tippy(info.el, {
      //     content: info.event.title,
      //     placement: "top-start",
      //   });
      // }
    },
    // 鼠标离开
    eventMouseLeave(arg) {
      // console.log("mouseleave");
      // arg.jsEvent.preventDefault();
    },
    // 事项调整时间区间事件
    onEventResize(arg) {
      let newTimeStart = this.dateFormat(
          "YYYY-mm-dd HH:MM:SS",
          arg.event.startStr
      );
      let newTimeEnd = this.dateFormat("YYYY-mm-dd HH:MM:SS", arg.event.endStr);
      this.get("/calendar/updateTime", {
        id: arg.event.id,
        Start: newTimeStart,
        End: newTimeEnd,
      }).then((res) => {
        this.$message.success(res.data.info);
      });
      // 必须加这句，不然切换视图会有显示事件数目的bug
      let calendarApi = arg.view.calendar;
      calendarApi.today();
    },
    // el-popover图片点击预览放大事件
    PreviewPic(arg) {
      this.dialogImageUrl = arg;
      this.img_dialogVisible = true;
      this.stopMove();
    },
    // el-popover图片点击预览后关闭事件
    onClose() {
      this.img_dialogVisible = false;
      this.move();
    },
    // el-popover隐藏时触发，将图片地址修改为空
    async popoverPicReset(arg) {
      this.popoverimg = await [];
      let calendarApi = arg.view.calendar;
      calendarApi.show_pic(arg);
    },
    // el-popover显示图片功能
    async showPic(arg) {
      let calendarApi = arg.view.calendar;
      this.popoverimg = [];

      await this.post("/get_img_url", arg.event.extendedProps.img, "blob").then(
          (res) => {
            // console.log(res.data.imgs);
            res.data.imgs.forEach((item, index) => {
              const img = "data:image/png;base64," + item;
              this.file = this.base64ImgtoFile(img); // 得到File对象
              const url =
                  window.webkitURL.createObjectURL(this.file) ||
                  window.URL.createObjectURL(this.file);
              this.popoverimg.push(url);
            });
          }
      );
      calendarApi.show_pic(arg);
    },
    // 提醒类别选择
    categorySelected(node) {
      this.form.categoryName = node.label;
    },
    // 自定义按钮
    customButton() {
      console.log("点击了自定义按钮");
    },
    // 今天
    getToday() {
      let calendarApi = this.$refs.fullCalendar.getApi();
      calendarApi.today()
      this.handleTime(calendarApi.currentData.dateProfile.activeRange);
      this.title = this.calendarApi.view.title;
      this.search_input = "";
    },
    // 上一月
    getPrev() {
      this.istoday = false
      let calendarApi = this.$refs.fullCalendar.getApi();
      calendarApi.prev();
      // this.handleTime(calendarApi.currentData.dateProfile.activeRange);
      this.title = this.calendarApi.view.title;
    },
    // 下一月
    getNext() {
      this.istoday = false
      let calendarApi = this.$refs.fullCalendar.getApi();
      calendarApi.next();
      // this.handleTime(calendarApi.currentData.dateProfile.activeRange);
      this.title = this.calendarApi.view.title;
    },
    // 处理时间格式
    handleTime(activeRange) {
      let result = {
        startStr: activeRange.start,
        endStr: activeRange.end,
      };
      this.getCalendarList(result);
    },
    // 获取列表信息
    getCalendarList(result) {
      // 以当前时间插入数据
      // 注意，请求的数据是数据库所有数据即可，不用考虑当前显示的时间范围，Fullcalendar会自动只显示当前日期范围的事件
      this.$axios.get(`/api/v1/private/calendar/get_record_list`, {})
            .then(response => {
              console.log(response.data)
              this.calendarOptions.events = [];
              response.data.data.forEach((item) => {
                let is_Done = moment.utc(item.end_time).toDate() < new Date();
                let data = {
                  id: item.id,
                  title: item.title,
                  start: item.start_time,
                  end: item.end_time,
                  allDay: item.is_all_day,
                  className: is_Done? "borderGreen": "borderOrange",// 是否完成
                  // 非标准字段:除上述字段外，您还可以在每个事件对象中包含自己的非标准字段。FullCalendar不会修改或删除这些字段。例如，开发人员通常包括描述在回调中使用的字段，如事件呈现挂钩. 任何非标准属性都将移动到extendedProps哈希期间事件解析.
                  extendedProps: {
                    isDone: is_Done,
                    img: item.img,
                    address: item.address,
                    type: item.type,
                  },
                  others: "该字段值会被自动归类到extendedProps里面",
                  textColor: "#2c3e50",
                  backgroundColor:
                      (item.is_all_day === true ? "all_Day" : "other") !== "all_Day"
                          ? is_Done === true
                              ? "rgba(159,250,144,0.73)"
                              : "#FFECDC"
                          : "#66b1ff",
                  editable: true, // 是否可以进行（拖动、缩放）修改
                };
                this.calendarOptions.events.push(data);
              });
            })
            .catch((error) => {
              this.$message.error(error.response);
            });
    },

    // 选择日期，填写事件
    selectDate: function (arg) {
      let startTime = this.dateFormat('YYYY-mm-dd:HH:MM:SS', arg.start);
      let endTime = this.dateFormat('YYYY-mm-dd:HH:MM:SS', arg.end);
      console.log(startTime, endTime)
      this.dialogVisible = true;
      this.form_edited_state = "add";
      this.dateRange = [startTime, endTime]; // 设置当前记录事件的选择的时间段
      this.form.isAllDay = arg.allDay;
    },
    // 表单确定按钮，提交事件
    submitForm() {
      let calendarApi = this.$refs.fullCalendar.getApi();
      calendarApi.unselect(); // 清除当前日期选择
      var moment = require('moment');
      var startTime = moment(this.dateRange[0]).toISOString();
      var endTime = moment(this.dateRange[1]).toISOString();
      console.log(startTime, endTime)
      if (this.form_edited_state === "add") {
        // 添加事件的后端数据请求
        this.$axios.post(`/api/v1/private/calendar/add_record`, {
          is_all_day: this.form.isAllDay,
          start_time: startTime,
          end_time: endTime,
          record_type: this.form.record_type === undefined ? "日常" : this.form.record_type,
          title: this.form.title,
          content: this.form.content,
          alert: this.form.alert,
          pre_alert_time: this.form.pre_alert_time === undefined ? "5" : this.form.pre_alert_time.toString(),
          address: this.form.address === undefined ? "" : this.form.address,
          user_status: this.form.user_status === undefined ? "忙碌": this.form.user_status,
          repeat: this.form.repeat,
          place: this.form.place === undefined ? "" : this.form.place,
          img: this.form.img == null ? "" : this.form.img,
        }).then(response => {
          this.$message.success("事件添加成功！");
          this.handleTime(calendarApi.currentData.dateProfile.activeRange);
        }).catch(error => {
          console.log(error.response)
          this.$message.error("事件添加失败！");
        })
      } else if (this.form_edited_state === "amend") {
        // 修改事件的后端数据请求
        this.$axios.post(`/api/v1/private/calendar/update_record`, {
          id: this.form.id,
          is_all_day: this.form.isAllDay,
          start_time: startTime,
          end_time: endTime,
          record_type: this.form.record_type === undefined ? "日常" : this.form.record_type,
          title: this.form.title,
          content: this.form.content,
          alert: this.form.alert,
          pre_alert_time: this.form.pre_alert_time === undefined ? [5] : this.form.pre_alert_time,
          address: this.form.address === undefined ? "" : this.form.address,
          user_status: this.form.user_status === undefined ? "忙碌": this.form.user_status,
          repeat: this.form.repeat,
          place: this.form.place === undefined ? "" : this.form.place,
          img: this.form.img == null ? "" : this.form.img,
        },).then(response => {
          this.$message.success("事件更新成功！");
          this.handleTime(calendarApi.currentData.dateProfile.activeRange);
        }).catch(error => {
          console.log(error.response)
          this.$message.error("事件更新失败！");
        })
      }
      this.dialogVisible = false;
    },
    // 表单取消按钮
    cancel() {
      let calendarApi = this.$refs.fullCalendar.getApi();
      calendarApi.unselect(); // 清除当前日期选择
      this.form = {
        id: 0,
        isAllDay: false,
        record_type: "日常",
        title: undefined,
        content: undefined,
        repeat: "不重复",
        alert: false,
        pre_alert_time: undefined,
        user_status: undefined,
        place: undefined,
        img: "",
        address: "",
      };
      this.filelist = [];
      this.dialogVisible = false;
      this.form_edited_state = "";
    },
    // 点击事项事件
    handleEventClick(clickInfo) {
      this.dialogVisible = true;
      this.form_edited_state = "amend"; //修改状态
      var startTime = this.dateFormat(
          "YYYY-mm-dd HH:MM:SS",
          clickInfo.event.startStr
      );
      var endTime = this.dateFormat(
          "YYYY-mm-dd HH:MM:SS",
          clickInfo.event.endStr
      );
      // 设置打开对话框各部分的显示值
      this.form.id = clickInfo.event.id;
      this.dateRange = [clickInfo.event.start, clickInfo.event.end];
      this.form.remark = clickInfo.event.title;
      // 获取当前登录用户的名字
      let info = JSON.parse(localStorage.getItem("userInfo"));
      this.form.userName = info.username;
      this.form.isDone =
          clickInfo.event.extendedProps.isDone == true ? "0" : "1";
      this.form.img = clickInfo.event.extendedProps.img;
      this.form.address = clickInfo.event.extendedProps.address;
      this.form.category =
          clickInfo.event.extendedProps.type == undefined
              ? ""
              : clickInfo.event.extendedProps.type;
      // 请求后端图片URL方法
      this.post("/get_img_url", clickInfo.event.extendedProps.img).then(
          (res) => {
            res.data.imgs.forEach((item, index) => {
              const img = "data:image/png;base64," + item;
              this.file = this.base64ImgtoFile(img); // 得到File对象
              const url =
                  window.webkitURL.createObjectURL(this.file) ||
                  window.URL.createObjectURL(this.file);
              this.filelist.push({
                name: res.data.origin_url[index],
                url: url,
              });
            });
          }
      );
    },
    // 事项标记已完成或改为未完成的事件
    onCheckBtnClicked(arg) {
      this.get(
          "/calendar/checked",
          { id: arg.event.id, status: arg.event.extendedProps.isDone },
          ""
      ).then((res) => {
        this.calendarOptions.events.filter((item) => {
          if (item.id == arg.event.id) {
            item.extendedProps.isDone = !arg.event.extendedProps.isDone;
            arg.event.extendedProps.isDone == true
                ? (item.className = "borderOrange")
                : (item.className = "borderGreen");
            item.backgroundColor =
                (arg.event.allDay == true ? "all_Day" : "other") != "all_Day"
                    ? arg.event.extendedProps.isDone == true
                        ? "#FFECDC"
                        : "#c2fccd"
                    : "#66b1ff";
          }
          return item;
        });
        this.$message.success("事件状态修改成功！");
      });
    },
    // 事项删除事件
    onRemoveBtnClicked(arg) {
      this.$axios.post(`/api/v1/private/calendar/delete_record`, {
        id: arg.event.id
      }).then(res => {
        console.log(res.data)
        this.calendarOptions.events = this.calendarOptions.events.filter(
            item => {
              return item.id !== arg.event.id;
            }
        );
      }).catch(error => {
        console.log(error.response)
      })
    },
    // 当前事件绑定，此段代码可删掉
    handleEvents(events) {
      this.currentEvents = events;
    },
    // 提交上传文件
    submitFileForm() {
      /* 这里为啥会先发一个Option请求再发Post请求：这是浏览器处理跨域做的逻辑。
      CORS跨域请求会先发option请求，如果server返回access-control-allow-origin头为*或者和当前域名一致的话，
      才会进入第二段的真正请求。不然就会报 cross origin request is forbidden错误。*/
      this.$refs.upload.submit();
    },
    // 对话框图片预览放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = [file.url];
      this.img_dialogVisible = true;
    },
    // 预览图片下载到本地
    handleDownload(file) {
      // console.log(file, "@@@@");
      this.get("/bbx_img_download", file.name, "blob").then((res) => {
        var blob = new Blob([res.data], {
          type: "application/octet-stream;chartset=UTF-8",
        });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        //文件名
        let name = res.config.params.replace("F:\\flask\\upload\\", "");
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url); // 释放掉blob对象
      });
    },
    // 下载文件
    fileDownload(file) {
      // console.log(this.urlToLink(file));
      // 判断是否为网页
      let bool = this.urlToLink(file);
      if (bool) {
        var b = document.createElement("a");
        b.setAttribute("href", file);
        b.setAttribute("target", "_blank");
        document.body.appendChild(b);
        b.click();
      } else {
        if (file != null || file != "") {
          this.get("/get_file_download", file, "blob").then((res) => {
            var blob = new Blob([res.data], {
              type: "application/octet-stream;chartset=UTF-8",
            });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            //文件名
            let name = res.config.params.replace("F:\\flask\\upload\\", "");
            a.download = name;
            a.click();
            window.URL.revokeObjectURL(url); // 释放掉blob对象
          });
        } else {
        }
      }
    },
    // 移除对话框预览图片
    handleRemove(file) {
      let address = this.form.img.split(",");
      address = address.filter((item) => {
        return item != file.name;
      });
      address = address.join(",");
      this.form.img = address;
      const newArray = this.filelist.filter((item, index) => {
        return item.uid != file.uid;
      });
      this.filelist = newArray;
    },
    // 判断字符串是否为网页
    urlToLink(str) {
      var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
      if (reg.test(str)) {
        return true;
      } else {
        return false;
      }
    },
    // 停止页面滚动
    stopMove() {
      const m = (e) => {
        e.preventDefault();
      };
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", m, false); // 禁止页面滑动
    },
    // 开启页面滚动
    move() {
      const m = (e) => {
        e.preventDefault();
      };
      document.body.style.overflow = "auto";
      document.removeEventListener("touchmove", m, true);
    },
    // 查询功能
    onSearch() {
      let search_text = this.search_input;
      let curr_Events = this.calendarOptions.events;
      if (search_text !== "") {
        this.calendarApi.changeView("list");
        let result = this.searchStr(search_text, curr_Events);
        this.calendarOptions.events = result;
        this.title = "查询结果";
      } else {
        // this.today();
      }
    },
    // 数组中匹配单个字符串的方法，传入数组支持格式[{},{}],
    searchStr(str, arr) {
      let newList = [];
      // 要匹配字符串的首个字符
      let startChar = str.charAt(0);
      // 要匹配字符串的字符长度
      let strLength = str.length;
      for (let i = 0; i < arr.length; i++) {
        // 默认数组arr中对象arr[i]不存在str
        let isExist = false;
        let obj = arr[i];
        for (let key in obj) {
          if (typeof obj[key] === "function") {
            obj[key]();
          } else {
            let keyValue = "";
            // 获取arr[i][key]的值
            if (obj[key] !== null && typeof obj[key] === "string") {
              keyValue = obj[key];
            } else if (obj[key] !== null && typeof obj[key] !== "string") {
              keyValue = JSON.stringify(obj[key]);
            }
            // arr[i][key]中的各个位置的字符与str的0位置字符startChar对比如果相等，
            // 在arr[i][key]中从j位置截取与str长度相同的字符，对比是否相等
            for (let j = 0; j < keyValue.length; j++) {
              // 把原有数据转化为小写，输入数据也转化为纯小写，实现模糊匹配,如区分大小写，可删除toLowerCase()
              if (
                  keyValue.charAt(j).toLowerCase() === startChar.toLowerCase()
              ) {
                if (
                    keyValue
                        .substring(j)
                        .substring(0, strLength)
                        .toLowerCase() === str.toLowerCase()
                ) {
                  // 模糊匹配到的字符存在表示arr[i]中存在str
                  isExist = true;
                  break;
                }
              }
            }
          }
        }
        // 当arr[i]中存在str时，把arr[i]放入一个新数组
        if (isExist === true) {
          newList.push(obj);
        }
      }
      // 最后返回这个新数组
      return newList;
    },
    // 格式化时间 fmt是所需格式化的格式，如"YYYY-mm-dd HH:MM:SS",date是所需格式化的日期
    dateFormat(fmt, date) {
      let ret = "";
      date = new Date(date);
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
              ret[1],
              ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },
    //日期格式转换
    formatTimer: function (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return h + ":" + m;
    },
    // 获取当前时间戳
    getCurrentTime() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      month = month < 10 ? "0" + month : month; // 可注释掉
      day = day < 10 ? "0" + day : day;
      hour = hour < 10 ? "0" + hour : hour; // 可注释掉
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
    },
    // 地址上传地址
    address_beforeupload(file, filelist) {
      let formData = new FormData();
      formData.append("file", file.raw);
      this.upload("/get_file_url", formData, "").then((res) => {
        this.form.address = res.data.path;
      });
    },
    /** 图片上传功能 */
    beforeupload(file, filelist) {
      this.filelist = filelist;
      let formData = new FormData();
      formData.append("file", file.raw);
      // 请求数据
      this.upload("/get_file_url", formData, "").then((res) => {
        if (this.form.img == null) {
          this.form.img = res.data.path;
        } else {
          this.form.img = this.form.img + "," + res.data.path;
        }
      });
    },
    // base64字段变成blob二进制数据，关于图片的
    base64ImgtoFile(dataurl, filename = "file") {
      const arr = dataurl.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const suffix = mime.split("/")[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime,
      });
    },
  },
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
.calendar-view .tool-bar {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex: none;
  justify-content: flex-end;
  padding: 0px;
  width: 100%;
}
.calendar-view .tool-bar .nav-label {
  display: flex;
  flex: 1;
}
.tool-bar-navigator, .tool-bar-navigator .btn {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex: none;
}
.tool-bar-navigator {
  align-self: center;
  background-color: #fff;
  color: #646a73;
  height: 36px;
  justify-content: space-between;
  padding: 0 8px 0 0;
}
.tool-bar-navigator .label-btn {
  align-items: center;
  border: 1px solid #c2e7b0;
  background-color: #f0f9eb;
  border-radius: 4px;
  color: #67C23A;;
  cursor: pointer;
  display: flex;
  flex: auto;
  font-size: 12px;
  height: 30px;
  justify-content: center;
  margin: 0;
  min-width: 50px;
  padding: 0 5px;
}

.tool-bar-navigator .btn {
  border-radius: 4px;
  cursor: pointer;
  height: 22px;
  justify-content: center;
  margin: 1px 2px 0;
  width: 22px;
}
.tool-bar-navigator .btn {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex: none;
}
.calendar-view .tool-bar .week-label {
  align-items: center;
  color: #335fa2;
  cursor: default;
  display: flex;
  flex: 1;
  font-family: DINAlternate-Bold,PingFangSC-Semibold,Microsoft Yahei,Myriad Pro,Hiragino Sans GB,sans-serif;
  font-size: 18px;
  font-weight: 600;
  justify-content: flex-start;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 0;
}
.calendar-view .tool-bar .today-label {
  align-items: center;
  color: #3370ff;
  cursor: default;
  display: flex;
  flex: 1;
  font-family: DINAlternate-Bold,PingFangSC-Semibold,Microsoft Yahei,Myriad Pro,Hiragino Sans GB,sans-serif;
  font-size: 18px;
  font-weight: 600;
  justify-content: flex-start;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 0;
}
.calendar-view .tool-bar .nav-wrapper {
  align-items: center;
  display: flex;
  flex: none;
}
.mode-section {
  align-items: center;
  display: flex;
  height: 30px;
  justify-content: center;
  margin-right: 20px;
  padding: 0 2px;
}
.mode-section .label-btn.selected {
  background-color: #f0f4ff;
  color: #3370ff;
}
.mode-section .meeting-mode {
  height: 24px;
  margin: 3px 1px 3px 4px;
  position: relative;
  width: 84px;
}
._pp-header-avatar-box ._pp-header-avatar {
  border-radius: 50%;
  height: 32px;
  position: relative;
  width: 32px;
}
._pp-header-avatar-box ._pp-header-avatar img {
  border-radius: 50%;
  height: 100%;
  left: 0;
  -o-object-fit: cover;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
}
.fc_btns {
  border: 0px solid #DCDFE6;
  padding: 8px 6px;
}
.fc_btns:focus {
  border: none;
}
.menu-list {
  margin-right: 20px;
  cursor: pointer;
}
.other-selected {
  color: #FFF;
  background-color: #409EFF;
  border-color: #409EFF;
}
.today-selected {
  color: #FFF;
  background-color: #67C23A;
  border-color: #67C23A;
}

.fc_btns_right {
  color: #409EFF;
  background: #ecf5ff;
  border-color: #b3d8ff;
}
.fc_btns_right_today {
  color: #67C23A;
  background: #f0f9eb;
  border-color: #c2e7b0;
}
::v-deep .fc-scrollgrid-shrink-cushion  {
  box-sizing: border-box;
  color: #8f959e;
  font-size: 10px;
  position: relative;
}
::v-deep .fc-timegrid-slot-minor {
  border-top:none
}
::v-deep .fc-timegrid-slot-label.fc-scrollgrid-shrink {
  border-top:none
}
::v-deep .fc-timegrid-slot-label {
  border-bottom:none;
  width: 60px;
  padding-right: 4px;
}
::v-deep .fc table {
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 0.1em;
}
::v-deep .fc-scrollgrid-sync-inner{
  height: 40px;
}
::v-deep .fc .fc-col-header-cell-cushion {
  margin-top: 7px;
  color: dodgerblue;
  font-size: 17px;
  display: inline-block;
  padding: 2px 4px;
}
.icon {
  color: #8f959e;
  cursor: default;
  flex: none;
  font-size: 16px;
  margin: 0 15px 0 0;
}
.larkc-svg-icon {
  fill: currentColor;
  cursor: pointer;
  flex: none;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  width: 1em;
}
.des-area {
  align-items: center;
  justify-content: space-between;
  display: flex;
  margin: 16px 7px 0;
  overflow: visible;
  position: relative;
  white-space: normal;
}
.label-container {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  margin-left: 7px;
  overflow: visible;
  white-space: nowrap;
}
.des-area .vmInput {
  background: #fff;
  border: 1px solid #dee0e3;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 12px;
  width: 405px;
  padding-left: 15px;
  margin-left: 3px;
  height: 36px;
  outline: none;
  text-align: left;
}
._selection.showTriangle {
  border: 1px solid #dee0e3;
  padding-left: 15px;
  margin-right: 6px;
  border-radius: 5px;
  width: 405px;
  box-sizing: border-box;
}
._selection {
  align-items: center;
  color: #1f2329;
  cursor: pointer;
  height: 36px;
  justify-content: space-between;
  line-height: 34px;
  position: relative;
  transition: border .2s ease;
  user-select: none;
}
.calendar-select .calendar-dom {
  align-items: center;
  display: flex;
  font-size: 12px;
  height: 100%;
  overflow: hidden;
  width: 100%;
}
.calendar-select .calendar-dom .color {
  border-radius: 50%;
  height: 12px;
  margin-right: 7px;
  width: 12px;
}
.calendar-select .calendar-dom .summary {
  flex: none;
  height: 100%;
  line-height: 34px;
  overflow: hidden;
  padding-right: 7px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
::v-deep .el-dialog__body {
  padding: 0px 20px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
::v-deep .el-range-editor--small.el-input__inner {
  height: 36px;
  width: 405px;
  margin-left: 3px;
}
.record-status-type {
  align-items: center;
  display: flex;
  justify-content: space-between;
  overflow: visible;
  white-space: nowrap;
}
::v-deep .record-status-type .el-input__inner{
  height: 36px;
  margin-left: 3px;
}
::v-deep .record-status-type .el-select {
  display: inline-block;
  position: relative;
  margin-left: 17px;
}
::v-deep .record-status-type .el-input__icon {
  height: 100%;
  width: 25px;
  text-align: center;
  transition: all .3s;
  line-height: 36px;
}
::v-deep .v-calendar .input-field input {
  padding-right: 46px;
}
.now-data-myself {
  width: 35%;
  position: absolute;
  border-right: 1px solid rgba(227, 227, 227, 0.6);
}
.con {
  position: relative;
  max-width: 280px;
  margin: auto;
}
::v-deep .con .wh_content_all {
  background: transparent !important;
}
::v-deep .wh_top_changge li {
  color: #F56C6C !important;
  font-size: 15px !important;
}
::v-deep .wh_content_item, .wh_content_item_tag {
  color: #303133 !important;
}
::v-deep .wh_content_item .wh_isToday {
  background: #00d985  !important;
  color: #fff  !important;
}
::v-deep .wh_content_item .wh_chose_day {
  background: #409EFF  !important;
  color: #ffff  !important;
}
::v-deep .wh_item_date:hover {
  background: rgb(217, 236, 255) !important;
  border-radius: 100px !important;
  color: rgb(102, 177, 255)  !important;
}
::v-deep .wh_jiantou1[data-v-2ebcbc83] {
  border-top: 2px solid #909399;
  border-left: 2px solid #909399;
  width: 7px;
  height: 7px;
}
::v-deep .wh_jiantou2[data-v-2ebcbc83] {
  border-top: 2px solid #909399;
  border-right: 2px solid #909399;
  width: 7px;
  height: 7px;
}
::v-deep .wh_item_date[data-v-2ebcbc83], .wh_top_tag[data-v-2ebcbc83] {
  width: 30px;
  height: 30px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .wh_top_tag[data-v-2ebcbc83] {
  color: #409EFF;
  border-top: 1px solid rgba(227, 227, 227, 0.6);
  border-bottom: 1px solid rgba(227, 227, 227, 0.6);
}
::v-deep .wh_container[data-v-2ebcbc83] {
  max-width: 280px;
}
::v-deep .wh_top_changge[data-v-2ebcbc83] {
  display: flex;
  width: 57%;
  margin-left: 38%;
}
::v-deep .now-data-myself-time {
  color: #F56C6C;
  font-size: 28px;
  height: 30px;
  text-align: center;
  font-family: "Helvetica Neue";
}
::v-deep .now-data-myself-week {
  font-size: 10px;
  color: #909399;
  text-align: center;
}
::v-deep .wh_top_changge .wh_content_li[data-v-2ebcbc83] {
  font-family: Helvetica;
}
</style>