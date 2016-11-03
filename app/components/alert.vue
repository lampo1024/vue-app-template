<template>
	<transition name="el-alert-fade">
		<div class="el-alert" :class="[typeClass]" v-show="visible">
			<i class="el-alert__icon" :class="[iconClass,isBigIcon]" v-if="showIcon"></i>
			<div class="el-alert__content">
				<span class="el-alert__title" :class="[isBoldTitle]" v-if="title">{{title}}</span>
				<p class="el-alert__description" v-if="description">{{description}}</p>
				<i class="el-alert__closebtn" :class="{'is-customed':closeText!=='','el-icon-close':closeText===''}" v-show="closable" @click="close()">{{closeText}}</i>
			</div>
		</div>
	</transition>
</template>
<style>
	.el-alert {
		background-color: #fff;
		border-radius: 4px;
		box-sizing: border-box;
		color: #fff;
		display: table;
		margin: 0;
		opacity: 1;
		overflow: hidden;
		padding: 8px 16px;
		position: relative;
		transition: opacity 0.2s ease 0s;
		width: 100%;
	}
	
	.el-alert .el-alert__description {
		color: #fff;
		font-size: 12px;
		margin: 5px 0 0;
	}
	
	.el-alert--success {
		background-color: #13ce66;
	}
	
	.el-alert--info {
		background-color: #50bfff;
	}
	
	.el-alert--warning {
		background-color: #f7ba2a;
	}
	
	.el-alert--error {
		background-color: #ff4949;
	}
	
	.el-alert__content {
		display: table-cell;
		padding-left: 8px;
	}
	
	.el-alert__icon {
		color: #fff;
		display: table-cell;
		font-size: 16px;
		vertical-align: middle;
		width: 16px;
	}
	
	.el-alert__icon.is-big {
		font-size: 28px;
		width: 28px;
	}
	
	.el-alert__title {
		font-size: 13px;
		line-height: 18px;
	}
	
	.el-alert__title.is-bold {
		font-weight: 700;
	}
	
	.el-alert__closebtn {
		color: #fff;
		cursor: pointer;
		font-size: 12px;
		opacity: 1;
		position: absolute;
		right: 15px;
		top: 12px;
	}
	
	.el-alert__closebtn.is-customed {
		font-size: 13px;
		font-style: normal;
		top: 9px;
	}
	
	.el-alert-fade-enter,
	.el-alert-fade-leave-active {
		opacity: 0;
	}
	
	.el-notification {
		background-color: #fff;
		border-radius: 2px;
		box-shadow: 0 0 6px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.12);
		box-sizing: border-box;
		overflow: hidden;
		padding: 20px;
		position: fixed;
		right: 16px;
		transition: opacity 0.3s ease 0s, transform 0.3s ease 0s, right 0.3s ease 0s, top 0.4s ease 0s, -webkit-transform 0.3s ease 0s;
		width: 330px;
		z-index: 2000;
	}
	
	.el-notification .el-icon-circle-check {
		color: #13ce66;
	}
	
	.el-notification .el-icon-circle-cross {
		color: #ff4949;
	}
	
	.el-notification .el-icon-information {
		color: #50bfff;
	}
	
	.el-notification .el-icon-warning {
		color: #f7ba2a;
	}
	
	.el-notification__group span {
		color: #1f2d3d;
		font-size: 16px;
	}
	
	.el-notification__group p {
		color: #8492a6;
		font-size: 14px;
		line-height: 21px;
		margin: 10px 0 0;
		text-align: justify;
	}
	
	.el-notification__icon {
		float: left;
		font-size: 40px;
		height: 40px;
		position: relative;
		top: 3px;
		width: 40px;
	}
	
	.el-notification__closeBtn {
		color: #c0ccda;
		cursor: pointer;
		font-size: 14px;
		position: absolute;
		right: 20px;
		top: 20px;
	}
	
	.el-notification__closeBtn:hover {
		color: #99a9bf;
	}
	
	.el-notification-fade-enter {
		right: 0;
		transform: translateX(100%);
	}
	
	.el-notification-fade-leave-active {
		opacity: 0;
	}
</style>
<script type="text/babel">
    const TYPE_CLASSES_MAP = {
        'success': 'el-icon-circle-check',
        'warning': 'el-icon-warning',
        'error': 'el-icon-circle-cross'
    };
    export default{
        name: 'el-alert',

        props: {
            title: {
                type: String,
                default: '',
                required: true
            },
            description: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'info'
            },
            closable: {
                type: Boolean,
                default: true
            },
            closeText: {
                type: String,
                default: ''
            },
            showIcon: {
                type: Boolean,
                default: false
            }
        },

        data(){
            return {
                visible: true
            };
        },

        methods: {
            close(){
                this.visible = false;
                this.$emit('close');
            }
        },

        computed: {
            typeClass(){
                return `el-alert--${this.type}`;
                //return 'el-alert--' + this.type;
            },

            iconClass(){
                return TYPE_CLASSES_MAP[this.type] || 'el-icon-information';
            },

            isBigIcon(){
                return this.description ? 'is-big' : '';
            },

            isBoldTitle(){
                return this.description ? 'is-bold' : ''
            }
        }

    }
</script>