<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeline: [


        {
          timestamp: '2020-06-09',
          title: '用户信息页面重写',
          content: 'pl998 fix 2020-06-09 18:41'
        },
        {
          timestamp: '2020-06-03',
          title: '新增第三方登录(微博) 钉钉',
          content: 'pl998 committed 2020-06-03 20:21'
        },
        {
          timestamp: '2020-06-01',
          title: '新增web命令行终端',
          content: 'pl998 committed 2020-06-01 18:46'
        },
        {
          timestamp: '2020-05-28',
          title: '部分api调整 新增验证码  ',
          content: 'pl998 committed 2020-05-28 15:23'
        },
         {
          timestamp: '2021-03-20',
          title: '完善rbac',
          content: 'pl998 committed 2019/4/20 20:46'
        },
      ]
    }
  }
}
</script>
