<template>
<div>
  <jm-input
      ref="input"
      :value="value"
      :disabled="disabled"
      :placeholder="placeholder"
      :name="name"
      :size="size"
      @click.native="handlClick"
    >
	<modal :show="showModal" :checked-items="checkedItems" @close="closeModal"></modal>
</div>
</template>
<script>
import Vue from 'vue';
import Modal from './modal.vue';
import JmInput from '../components/input.vue';
import emitter from './emitter';

Vue.component('modal',Modal);
Vue.component('jm-input',JmInput);
export default{
  name:'DxSelectInput',
  mixins:[emitter],
  props:{
    placeholder:String,
    disabled:Boolean,
    name:String,
    size:String,
    value:String
  },
	data(){
		return {
      showModal:false,
			checkedItems:[1],
			inputValue:'123'
		}
	},
	methods:{
    handlClick(){
      this.showModal=true;
      console.info(this.showModal);
    },
		openModal(){
			this.showModal=true;
			//console.info(this.show);
		},
		closeModal(newSelectedItems){
      this.showModal=!this.showModal;
			console.info(newSelectedItems);
			this.checkedItems=newSelectedItems;
			this.inputValue=newSelectedItems.join(',');
		}
	},
	watch:{
		selectedCollection:function(val,oldVal){
			this.checkedItems=val;
			return val;
		}
	}
}
</script>
