<template>
	<div>
		<el-button type="primary" @click="openFullScreen">
			编辑
		</el-button>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        fullscreenLoading: false,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    methods: {
      openFullScreen() {
        //this.fullscreenLoading = true;
        this.$http.get('http://echo.jsontest.com/key/value/one/two').then((response) => {
          // success callback
          console.log(response.body.key);
          //this.fullscreenLoading = false;
          }, (response) => {
          // error callback
        });
      }
    }
  }
</script>