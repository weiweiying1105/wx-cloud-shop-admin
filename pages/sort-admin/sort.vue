<template>
	<view class="sort-Header sort-position" v-if="sort&&sort.length > 0">
		<text>分类</text>
		<text>操作</text>
	</view>
	<view style="height: 90rpx;"></view>
	<view class="sort-Header sort-table" v-for="(item,index) in sort" :key="index">
		<text class="occupy">{{item.sort_name}}</text>
		<text class="sort-but" @click="handleDelete(item._id,index,item.quantity)">删除</text>
	</view>
	<!-- 没有数据的提示 -->
	<view class="Tips" v-if="sort&&sort.length === 0">你还没有分类数据</view>
	<!-- 弹窗 -->
	<page-container :show="show" @clickoverlay="show = false">
		<view class="space-view">
			<view class="modify-sub">
				<image src="/static/detail/guanbi.svg" mode="widthFix" @click="show = false"></image>
			</view>
			<view class="att-input">
				<input type="text" v-model.trim="sort_name" placeholder="输入分类" placeholder-class="I-style"
					cursor-spacing="50" />
			</view>
			<view class="newly-added classif" @click="handleSubmit">提交</view>
		</view>
	</page-container>
	<!-- 加载提示 -->
	<view class="loading-hei">
		<Loading v-if="loading"></Loading>
	</view>
	<!-- 底部新增分类按钮 -->
	<view style="height: 300rpx;"></view>
	<view class="newly-added-view">
		<view class="newly-added" @click="show = true">新增分类</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		reactive,
		toRefs
	} from 'vue'
	import {
		onReachBottom
	} from '@dcloudio/uni-app'
	import {
		inIt
	} from '@/Acc-config/init.js'
	import Loading from '@/pages/public-view/loading.vue'
	import {
		Feedback
	} from '@/Acc-config/media';

	// 控制弹窗弹出
	const show = ref(false)
	const data = reactive({
		sort: [],
		sort_name: ''
	})
	const {
		sort,
		sort_name
	} = toRefs(data)

	// 提交数据
	// import {
	// 	Feedback
	// } from '@/Acc-config/media.js'

	// 上拉加载
	let page_n = ref(0);
	let loading = ref(false);
	onMounted(() => {
		getSort()
	})
	// 获取列表
	async function getSort() {
		const DB = await inIt();
		const res = await DB.database().collection('goods_sort').field({
			_openid: false
		}).limit(10).get();
		console.log(res);
		data.sort = res.data;
	}
	// 删除
	const handleDelete = async (_id, index, quantity) => {
		if (quantity > 0) {
			new Feedback('你这个分类下还有商品，不能删').toast();
			return;
		}
		try {
			const db = await inIt();
			await db.database().collection('goods_sort').doc(_id).remove();
			data.sort.splice(index, 1)
		} catch (err) {
			new Feedback('删失败了', 'error').toast();
		}
	};

	// 保存
	async function handleSubmit() {
		if (data.sort_name !== '') {
			const DB = await inIt();
			const query_data = await DB.database().collection('goods_sort').where({
				sort_name: data.sort_name
			}).get();
			if (query_data.data.length > 0) {
				new Feedback('该分类已存在', 'error').toast()
			} else {
				// 插入一条分类数据
				const res = await DB.database().collection('goods_sort').add({
					data: {
						sort_name: data.sort_name,
						quantity: 0
					}
				})
				data.sort.push({
					sort_name: data.sort_name,
					_id: res._id,
					quantity: 0
				})
				data.sort_name = "";
				show.value = false;

			}

		} else {
			new Feedback('你敢不敢写点东西再提交').toast();
		}
	}




	// 上拉加载
	const pageIndex = ref(0);
	onReachBottom(async () => {
		loading.value = true;
		pageIndex.value++;
		let sk = pageIndex.value * 10;
		const DB = await inIt();
		const res = await DB.database().collection('goods_sort').field({
			_openid: false
		}).limit(10).skip(sk).get();
		console.log(res);
		let merge = [...data.sort, ...res.data];
		// 数组对象去重
		const obj = {};
		const new_data = merge.reduce((prev, item) => {
			if (!obj[item._id]) {
				prev.push(item);
				obj[item._id] = true;
				return prev;
			}
		}, [])
		data.sort = new_data;
		loading.value = false;
	})
</script>

<style scoped>
	.I-style {
		color: #cccccc;
	}

	.att-input {
		background-color: #f7f7f7;
		padding: 20rpx;
		border-radius: 7rpx;
	}

	.classif {
		margin: 60rpx 0 !important;
	}

	.modify-sub {
		padding-bottom: 60rpx !important;
	}
</style>