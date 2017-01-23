<template>
<div>
	<div class="modal-mask" v-show="show" transition="modal">
		<div class="modal-container">
			<div class="modal-header">
				<h3>请选择</h3>
			</div>
			<div class="modal-body">
				<div>
					已选择的数据:
					<el-tag v-for="item in selectedItems" :closable="true" type="primary" @close="handleTagClose(item)">
						{{item.label}}
					</el-tag>
				</div>
				<el-table :data="gridData" :row-class-name="tableRowClassName" style="width:100%">
					<el-table-column width="100" label="选择">
						<template scope="scope">
							<el-button size="small" :type="scope.row.selected==true?'primary':'default'" @click="handleSelect(scope.$index, scope.row)"><i class="el-icon-circle-check"></i> 选择</el-button>
</template>
					</el-table-column>
					<el-table-column property="name" label="姓名"></el-table-column>
				</el-table>
			</div>
			<div class="modal-footer text-right">
				<el-button size="small" class="modal-default-button" @click="savePost">完成</el-button>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import Vue from 'vue';
Array.prototype.sortOn = function(key) {
	this.sort(function(a, b) {
		if (a[key] < b[key]) {
			return -1;
		} else if (a[key] > b[key]) {
			return 1;
		}
		return 0;
	});
}
export default {
	props: {
		show: {
			type: Boolean,
			required: true,
			twoWay: true
		}
	},
	data() {
		return {
			showModal: '',
			selected: [],
			selectedItems: [],
			gridData: [{
				value: '1',
				name: '王小虎001',
				selected: false
			}, {
				value: '2',
				name: '王小虎002',
				selected: false
			}, {
				value: '3',
				name: '王小虎003',
				selected: false
			}, {
				value: '4',
				name: '王小虎004',
				selected: false
			}]
		}
	},
	methods: {
		savePost() {
			if (this.selected.length <= 0) {
				this.$confirm('没有被选中的数据,确定完成选择码?', '选择提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$emit('close', this.selected.join(','));
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '请重新选择'
					});
				});
			} else {
				this.$emit('close', this.selected.join(','));
			}
			this.selectedItems = [];
		},
		handleSelect(index, row) {
			let item = {
				label: row.name,
				value: row.value,
				selected: false
			};
			if (this.isExists(item, this.selectedItems)) {
				this.handleTagClose(item);
			} else {
				item.selected = true;
				this.selectedItems.push(item);
			}
			this.selectedItems.sortOn("value");
			for (var i = 0; i < this.gridData.length; i++) {
				if (this.gridData[i].value === item.value) {
					this.gridData[i].selected = item.selected;
				}
			}
			var $this = this;
			Vue.nextTick(function() {
			});
		},
		handleTagClose(item) {
			for (var i = 0; i < this.selectedItems.length; i++) {
				if (this.selectedItems[i].value === item.value) {
					this.selectedItems.splice(i, 1);
					break;
				}
			}
		},
		isExists(item, items) {
			var i;
			for (i = 0; i < items.length; i++) {
				if (items[i].value === item.value) {
					return true;
				}
			}
			return false;
		},
		tableRowClassName(row,index){
			if(row.selected){
				return 'info-row';
			}
		}
	},
	watch: {
		selectedItems: function(val, oldVal) {
			var vals = this.selectedItems.map(x => x.value);
			this.selected = vals;
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

</style>
