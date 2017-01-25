<template>
  <input @click="show()" class="input-select" readonly="readonly" :value="txt" />
</template>
<script>
import Vue from 'vue';

function creat_new_modal(txt, deep) {
    var promise = new Promise(function(resolve, reject) {
        var MyModal = Vue.extend({})
        var modal = new MyModal({
            name: 'dModal',
            data: {
                show: true,
                txt: txt,
                deep: deep || 0,
            },
            template: `
						<div class="modal-mask" v-if="show" transition="modal">
							<div class="modal-container">
								<div class="modal-header">
									<h3>deep:{{deep}}</h3>
								</div>
								<div class="modal-body">
									<input type="text" v-model="txt" />
								</div>
								<div slot="modal-footer" class="modal-footer text-right">
									<el-button size="small" class="modal-default-button" type="success" @click='submit()'>完成</el-button>
									<el-button size="small" type="warning" @click='cancel()'>返回</el-button>
								</div>
							</div>
						</div>`,
            methods: {
                showNew: function() {
                    var self = this
                    creat_new_modal(this.txt, this.deep + 1).then(function(value) {
                        self.txt = value
                    }, function(error) {
                        console.log(error)
                    })
                },
                submit: function() {
                    resolve(this.txt)
                    this.show = false;
                    //console.info(this.txt);
                },
                cancel: function() {
                    reject('cancel')
                    this.show = false
                }
            },
            watch: {
                'show': function(val) {
                    if (val === false) {
                        this.$destroy()
                        document.getElementById('app').removeChild(this.$el)
                    }
                }
            }
        })

        //console.info(modal);
        // 或者，在文档之外渲染并且随后挂载
        var component = modal.$mount();
        document.getElementById('app').appendChild(component.$el)
    })
    return promise
}

export default {
    props: {
        formModel: {
            type: [Object,String],
            twoWay: true
        },
        fieldName:{
          type:String
        }
    },
    data() {
        return {
          parent:this.$parent
        }
    },
    methods: {
        show: function() {
            var self = this;
            creat_new_modal(self.formModel[self.fieldName]).then(function(value) {
                self.parent.formModel[self.fieldName]=value;
            }, function(error) {
                console.log(error)
            })
        }
    }
}
</script>
<style>
* {
    box-sizing: border-box;
}

.modal-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
}

.modal-container {
    width: 50%;
    margin: 40px auto 0;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.text-right {
    text-align: right;
}

.form-label {
    display: block;
    margin-bottom: 1em;
}

.form-label>.form-control {
    margin-top: 0.5em;
}

.form-control {
    display: block;
    width: 100%;
    padding: 0.5em 1em;
    line-height: 1.5;
    border: 1px solid #ddd;
}

.modal-enter,
.modal-leave {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

.el-table .info-row {
    background: #c9e5f5;
}
.input-select{cursor: pointer;border-width: 1px;}
input.input-select:hover{border-color:#c9e5f5;}
</style>
