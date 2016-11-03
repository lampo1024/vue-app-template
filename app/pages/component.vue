<style>
	.page-component {
		padding-bottom: 95px;
	}
	
	.page-component {
		.content {
			margin-left: -1px;
			> {
				h3 {
					margin: 45px 0 15px;
				}
				table {
					border-collapse: collapse;
					width: 100%;
					background-color: #fff;
					color: #5e6d82;
					font-size: 14px;
					margin-bottom: 45px;
					strong {
						font-weight: normal;
					}
					th {
						text-align: left;
						border-top: 1px solid #eaeefb;
						background-color: #EFF2F7;
					}
					td,
					th {
						border-bottom: 1px solid #eaeefb;
						padding: 10px;
					}
					th:first-child,
					td:first-child {
						padding-left: 10px;
					}
				}
			}
		}
	}
	
	.ease-enter-active,.ease-leave-active {
		transition: opacity 0.3s ease;
		left:-1000px; 
	}
	
	.ease-enter,.ease-leave-active {
		opacity: 0;
		left:0;
	}
	
	.slide-fade-enter-active {
		transition: all .2s ease;
	}
	
	.slide-fade-leave-active {
		/*transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
		transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	
	.slide-fade-enter,
	.slide-fade-leave-active {
		padding-left: 10px;
		opacity: 0;
	}
</style>
<template>
	<div class="page-container page-component">
		<el-row>
			<el-col :span="6">
				<side-nav :data="navsData" base=""></side-nav>
			</el-col>
			<el-col :span="18" v-show="navsData.length>0">
				<transition name="ease" mode="out-in">
					<router-view class="content"></router-view>
				</transition>
			</el-col>
			<el-col :span="18" v-show="navsData.length==0">
				没有数据显示
			</el-col>
		</el-row>
	</div>
</template>
<script>
  import { navs } from '../route.config';
	import Vue from 'vue';
	import VueResource from 'vue-resource';

	Vue.use(VueResource);

  export default {
    data() {
      return {
        navsData: []
      };
    },
		created(){
			this.navsData=[{"name":"安装指南","children":[{"path":"/quickstart","name":"快速上手"},{"path":"/development","name":"开发指南"}],"path":"","groups":[]},{"name":"更新日志","children":[],"path":"/changelog","groups":[]},{"name":"安装指南","children":[],"path":"","groups":[{"groupName":"Basic","list":[{"path":"/layout","name":"布局(Layout)","title":"Layout 布局","description":"布局描述"}]}]}];
			/*
			Vue.http.get('http://localhost:4203/api/home').then((response) => {
          // success callbac
          this.navsData=response.body;
          }, (response) => {
          // error callback
        });
			*/
		}
  };
</script>