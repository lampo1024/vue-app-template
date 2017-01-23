<template>
<div>
	<button @click="openModal">SHOW</button>
	<modal :show="showModal" :checked-items="checkedItems" @close="closeModal"></modal>
</div>
</template>
<script>
import Vue from 'vue';
import Modal from '../components/modal.vue';

Vue.component('modal',Modal);
export default{
	data(){
		return {
			showModal:false,
			checkedItems:[1]
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
		}
	}
}
</script>
