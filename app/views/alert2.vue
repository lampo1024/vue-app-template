<template>
<div>
	<select-input v-model="inputValue"></select-input>
</div>
</template>
<script>
import SelectInput from '../components/SelectInput.vue';

export default{
	components:{
		SelectInput
	},
	data(){
		return {
			checkedItems:[1],
			inputValue:'12336'
		}
	},
	methods:{
	}
}
</script>
