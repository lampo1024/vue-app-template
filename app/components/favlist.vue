<template>
    <ul>
        <li v-for="(n,index) in 10">
            <h2>{{alertTitle}}</h2>
            item =>> {{ index }} : {{msg}} : {{n}} {{alertMessage}}
        </li>
    </ul>
</template>

<script>
    export default {
        data () {
            return {
                msg: 'Hello World!'
            }
        },
        props:['alertTitle','alertMessage']
    }
</script>

<style>
    html{
        background: #ddd;
        color:#333;
    }
</style>