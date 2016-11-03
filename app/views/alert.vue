<template>
	<div>

		<el-button>
			<router-link class="item" to="/edit/?id=123">编辑</router-link>
		</el-button>
		<el-button type="primary" @click.native="openFullScreen" v-loading.fullscreen.lock="fullscreenLoading">
			显示整页加载，3 秒后消失
		</el-button>
    <el-button type="primary" @click.native="showMessage">
			显示消息
		</el-button>
		<p>
			<el-select v-model="value">
				<el-option v-for="item in options" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<span>{{value}}</span>
		</p>
		
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
      },
      showMessage(){
        //MessageBox.alert({title:'提示',message:'来自ELEMENT的消息提示窗口',type:'success'});
        this.$msgbox({
              type: 'success',
              message: '来自ELEMENT的消息提示窗口'
            });
      }
    }
  }
</script>