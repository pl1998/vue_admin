<template>
  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
</template>
<script>
  export default {
    props: {

    },
    watch:{
      defaultProps(){
        alert(22)
      }
    },
    data() {
      return {
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        alert(2)
      }
    }
  };
</script>
