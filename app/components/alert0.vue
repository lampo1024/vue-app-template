<template>
<div>
	<jm-input v-model="inputValue" :placeholder="请输入" @change.native="handleChange"></jm-input>
	<input type="text" @focus="openModal" v-model="checkedItems" />
	<modal :show="showModal" :checked-items="checkedItems" @close="closeModal"></modal>
</div>
</template>
<script>
import Vue from 'vue';
import Modal from '../components/modal.vue';
import JmInput from '../components/input.vue';

Vue.component('modal',Modal);
Vue.component('jm-input',JmInput);
export default{
	data(){
		return {
			showModal:false,
			checkedItems:[1],
			inputValue:'123'
		}
	},
	methods:{
		openModal(){
			this.showModal=true;
			//console.info(this.show);
		},
		closeModal(newSelectedItems){
			this.showModal=!this.showModal;
			console.info(newSelectedItems);
			this.checkedItems=newSelectedItems;
		},
		handleChange(){
			console.info(this.inputValue);
		}
	}
}
</script>
