<template>
	<!-- 顶部 -->
	<view class="attribute">
		<view class="edit">
			<text>请给商品规格设置合适的属性</text>
			<text @click="show = true">编辑</text>
		</view>
		<view class="checkbox">
			<checkbox-group style="display: flex;" @change="chEchange">
				<label v-for="(item,index) in attribute.selected" :key="index" @click="fInd(item.att,item.checked)">
					<checkbox :value="item.att" :checked="item.checked" color="#e96c56" />{{item.name}}
				</label>
			</checkbox-group>
		</view>
	</view>
	<!-- 规格生成 -->
	<view class="attribute gener" v-for="(item,index) in sku_data.sku" :key="index">
		<view class="edit specs-delete">
			<text>规格{{item.title}}</text>
			<text v-if="sku_data.sku.length > 1" @click="deleteSku(index)">删除</text>
		</view>
		<view class="edit entry" v-if="item.att_data.length > 0" v-for="(item_add,index_add) in item.att_data"
			:key="index_add">
			<text>{{item_add.att_name}}</text>
			<input type="text" v-model="item_add.att_val" :placeholder=" '请输入' + item_add.att_name "
				placeholder-class="I-style" cursor-spacing="50">
		</view>
		<view class="edit entry">
			<text>价格</text>
			<input type="number" v-model="item.price" placeholder="请输入价格" placeholder-class="I-style"
				cursor-spacing="50">
			<text>元</text>
		</view>
		<view class="edit entry">
			<text>库存</text>
			<input type="number" v-model="item.stock" placeholder="请输入库存" placeholder-class="I-style"
				cursor-spacing="50">
			<text>件</text>
		</view>
		<!-- 上传图片 -->
		<view class="specs-image">
			<image src="/static/detail/shuxing-img.png" mode="aspectFill" v-if="item.image == '' "
				@click="handleUpLoadImgae(index)"></image>
			<image :src="item.image" mode="aspectFill" v-else @click="preView(item.image)"></image>
			<image src="/static/detail/shanchu.svg" class="delete-img" mode="widthFix" v-if="item.image != '' "
				@click="dePicture(index)"></image>
		</view>
	</view>
	<!-- 添加规格 -->
	<view class="attribute gener new-specs" @click="newSpecs">
		<image src="/static/detail/jiahao.svg" mode="widthFix"></image>
		<text>规格</text>
	</view>
	<!-- 弹窗弹出设置属性 -->
	<page-container :show='show' @clickoverlay="show = false">
		<view class="space-view">
			<view class="modify-sub">
				<image src="/static/detail/guanbi.svg" mode="widthFix" @click="show = false"></image>
				<text>修改属性</text>
				<text @click="handleSubMitAttr">提交</text>
			</view>
			<view class="att-input" v-for="(item,index) in Sto_att.attobj" :key="index">
				<text>属性{{item.title}}</text>
				<input type="text" v-model="item.att" placeholder="输入属性" placeholder-class="I-style"
					cursor-spacing="50">
			</view>
		</view>
	</page-container>
	<!-- 底部按钮 -->
	<view style="height: 300rpx;"></view>
	<view class="newly-added-view">
		<view class="Submit">
			<text @click="cancel">取消</text>
			<text @click="preserve">保存</text>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	// 控制弹窗框显示
	const show = ref(false);
	/* 存储sku数据 */
	const sku_data = reactive({ //{att_name:'颜色',att_val:''}
		sku: [{
			title: 1,
			att_data: [], //动态属性
			price: '',
			stock: '',
			image: ''
		}]
	})
	/* 创建的属性 */
	const Sto_att = reactive({
		attobj: [{
			att: '',
			title: 1
		}, {
			att: '',
			title: 2
		}, {
			att: '',
			title: 3
		}]
	})
	/* 多选框的值 */
	const attribute = reactive({
		selected: []
	})
	// 提交属性，关闭弹窗
	function handleSubMitAttr() {

	}
	// 计算生成动态规格
	function calsku() {}
	// 新增规格
	function newSpecs() {}
	// 删除规格
	function deleteSku(index) {}
	// 更改多选框的checked选中和取消选中
	function chEchange(e) {}
	// 选中和取消选中重新计算规格数组
	function fInd(att, checked) {}

	// 上传图片
	// import {
	// 	Upload,
	// 	Feedback
	// } from '@/Acc-config/media.js'
	async function handleUpLoadImgae(index) {}
	// 删除图片
	function dePicture(index) {}

	// 预览图片
	function preView(image) {}
	// 提交
	// import {
	// 	sku_val
	// } from '@/Acc-config/answer.js'

	function preserve() {}
	// 取消
	function cancel() {}
	import {
		onLoad
	} from '@dcloudio/uni-app'
	onLoad((event) => {})
</script>


<style>
	page {
		background-color: #ededed;
	}

	.attribute {
		background-color: #f7f7f7;
		margin: 20rpx;
		padding: 20rpx 20rpx 0 20rpx;
		border-radius: 8rpx;
	}

	.edit {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.edit text:nth-child(1) {
		color: #a8a8a8;
	}

	.edit text:nth-child(2) {
		color: #616990;
	}

	.checkbox {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding-top: 20rpx;
	}

	.checkbox label {
		padding: 0 40rpx 20rpx 0;
	}

	/* 规格生成*/
	.gener {
		background-color: #FFFFFF !important;
	}

	.specs-delete text:nth-child(1) {
		color: #333333 !important;
		font-weight: bold;
	}

	.specs-delete {
		padding-bottom: 20rpx;
	}

	.entry {
		padding: 30rpx 0;
		border-bottom: 1rpx solid #f1f1f1;
	}

	.entry text {
		color: #333333 !important;
	}

	.entry text:nth-child(1) {
		flex: 1;
	}

	.entry input {
		padding: 0 20rpx;
		text-align: right;
	}

	.I-style {
		color: #a8a8a8;
	}

	.specs-image {
		display: flex;
		justify-content: space-between;
	}

	.specs-image image {
		display: block;
		width: 150rpx;
		height: 150rpx;
		border-radius: 8rpx;
		padding: 20rpx 0;
	}

	.delete-img {
		width: 40rpx !important;
		height: 40rpx !important;
	}

	/* 新增规格 */
	.new-specs image {
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}

	.new-specs {
		display: flex;
		align-items: center;
		color: #5f698c;
		padding: 30rpx !important;
	}

	/* 修改属性 */
	.att-input {
		display: flex;
		align-items: center;
		padding: 40rpx 0;
		border-bottom: 1rpx solid #e7e7e7;
	}

	.att-input text {
		flex: 1;
	}

	.att-input input {
		text-align: right;
	}

	/* 底部提交 */
	.Submit {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin: 10rpx 20rpx 68rpx 20rpx;
	}

	.Submit text {
		padding: 15rpx 60rpx;
		border-radius: 10rpx;
	}

	.Submit text:nth-child(1) {
		background-color: #f7f7f7;
		color: #ce6b4e;
		margin-right: 30rpx;
	}

	.Submit text:nth-child(2) {
		background-color: #ed6b51;
		color: #FFFFFF;
	}
</style>