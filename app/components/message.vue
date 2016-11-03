<template>
	<transition name="el-message-fade">
		<div class="el-message" v-show="visible" @mouseenter=clearTimer @mouseleave="startTimer">
			<img :src="typeImg" alt="" class="el-message__icon">
			<div class="el-message__group">
				<p>{{message}}</p>
				<div class="el-message__closeBtn el-icon-close" @click="handleClose" v-if="showClose"></div>
			</div>
		</div>
	</transition>
</template>
<style>
.el-message {
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    box-sizing: border-box;
    left: 50%;
    min-width: 300px;
    overflow: hidden;
    padding: 10px 12px;
    position: fixed;
    top: 20px;
    transform: translateX(-50%);
    transition: opacity 0.3s ease 0s, transform 0.4s ease 0s, -webkit-transform 0.4s ease 0s;
    z-index: 2000;
}
.el-message .el-icon-circle-check {
    color: #13ce66;
}
.el-message .el-icon-circle-cross {
    color: #ff4949;
}
.el-message .el-icon-information {
    color: #50bfff;
}
.el-message .el-icon-warning {
    color: #f7ba2a;
}
.el-message__group {
    margin-left: 38px;
    position: relative;
}
.el-message__group p {
    color: #8492a6;
    font-size: 14px;
    line-height: 20px;
    margin: 0 34px 0 0;
    text-align: justify;
    white-space: nowrap;
}
.el-message__icon {
    height: 40px;
    left: 0;
    position: absolute;
    top: 0;
    width: 40px;
}
.el-message__closeBtn {
    color: #c0ccda;
    cursor: pointer;
    font-size: 14px;
    position: absolute;
    right: 0;
    top: 3px;
}
.el-message__closeBtn:hover {
    color: #99a9bf;
}
.el-message-fade-enter, .el-message-fade-leave-active {
    opacity: 0;
    transform: translate(-50%, -100%);
}
</style>
<script type="text/babel">
    export default{
        name:'el-message',
        data(){
            return {
                visible:false,
                message:'',
                duration:3000,
                type:'info',
                onClose:null,
                showClose:false,
                closed:false,
                timer:null
            };
        },
        
        computed:{
            typeImg(){
                return ''; //require(`../assets/${this.type}.svg`);
            }
        },

        watch:{
            closed(newVal){
                if(newVal){
                    this.visible=false;
                    this.$el.addEventListener('transitioned',()=>{
                        this.$destory(true);
                        this.$el.parentNode.removeChild(this.$el);
                    });
                }
            }
        },

        methods:{
            handleClose(){
                this.closed=true;
                if(typeof this.onClose==='function'){
                    this.onClose(this);
                }
            },

            clearTimer(){
                clearTimeout(this.timer);
            },

            startTimer(){
                if(this.duration >0 ) {
                    this.timer=setTimeout(()=>{
                        if(!this.closed){
                            this.handleClose();
                        }
                    },this.duration);
                }
            }
        },

        mounted(){
            this.startTimer();
        }
    };
</script>