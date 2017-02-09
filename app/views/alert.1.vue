<template>
<div>
    <template v-for="field in fields">
		<select-input :formModel="formModel" :fieldName="field.name" v-model="formModel[field.name]"></select-input>
</template>
</div>
</template>
<script>
import Vue from 'vue';
import SelectInput from '../components/select-input.vue'

export default {
		components:{
			SelectInput
		},
    data() {
        return {
            formModel: {
                field1: '',
                field2: ''
            },
            fields: [{
                    name: 'field1'
                },
                {
                    name: 'field2'
                }
            ]
        }
    },
    methods: {
    }
}
</script>
