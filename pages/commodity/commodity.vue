<template>
	<view class="sort-view">
		<!-- 左边 -->
		<view class="sort-left">
			<text v-for="(item,index) in sort" :key="index" :class="{addto:index == num}"
				@click="seLect(index,item.sort_name,item._id)">{{item.sort_name}}</text>
		</view>
		<!-- 右边 -->
		<view class="sort-right">
			<view class="Commodity" v-for="(item,index) in goods" :key="index">
				<view class="Com-image">
					<image :src="item.goods_cover" mode="aspectFill"></image>
				</view>
				<view class="Com-price">
					<text class="Com-title over-text">{{item.goods_title}}</text>
					<text class="stock-view">库存 {{item.stock}}</text>
					<text class="Real-price">¥{{item.goods_price}}</text>
					<view class="Button-rig">
						<text class="shelf-true" v-if="item.shelves" @click="shelf(item._id,index)">下架</text>
						<text class="shelf-false" v-else>已下架</text>
					</view>
				</view>
			</view>
			<!-- 加载提示 -->
			<view class="loading-hei">
				<Loading v-if="loading"></Loading>
			</view>
			<view style="height: 100rpx;"></view>
		</view>
	</view>
	<!-- 底部 -->
	<view class="manage">
		<text @click="rootSoRt">管理分类</text>
		<text @click="rootGoods">添加商品</text>
	</view>
</template>

<script setup>
	import {
		reactive,
		toRefs
	} from 'vue';
	const state = reactive({
		sort: [],
		goods: [],
		loading: false
	})
	const {
		sort,
		goods,
		loading
	} = toRefs(state)
	// 跳转分类
	function rootSoRt() {
		wx.navigateTo({
			url: '/pages/sort-admin/sort'
		})
	}
	// 新增商品
	function rootGoods() {
		wx.navigateTo({
			url: '/pages/goods-admin/goods'
		})
	}
</script>


<style scoped>
	.sort-view {
		display: flex;
	}

	.sort-left {
		width: 200rpx;
		text-align: center;
		background-color: #f6f6f6;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
	}

	.sort-left text {
		display: block;
		color: #5f5f5f;
		padding: 20rpx 0;
		border-bottom: 1px solid #FFFFFF;
		font-size: 28rpx;
	}

	.addto {
		background-color: #FFFFFF;
		font-weight: bold;
	}

	/* 右边 */
	.sort-right {
		margin: 0 20rpx 0 220rpx;
		flex: 1;
	}

	.Com-image image {
		display: block;
		width: 150rpx;
		height: 150rpx;
		border-radius: 10rpx;
	}

	.Commodity text {
		display: block;
	}

	.Commodity {
		display: flex;
		margin-bottom: 50rpx;
	}

	.Com-price {
		flex: 1;
		padding-left: 20rpx;
	}

	.Com-price view {
		display: flex;
		justify-content: flex-end;
	}

	.Com-price view text:nth-child(2) {
		margin-left: 50rpx;
	}

	.Com-title {
		font-weight: bold;
	}

	.stock-view {
		padding: 10rpx 0;
		color: #c1c1c1;
		font-size: 26rpx;
	}

	.Real-price {
		color: #b1865b;
		font-weight: bold;
	}

	.Button-rig {
		padding-top: 20rpx;
	}

	.Button-rig text {
		border-radius: 7rpx;
		padding: 7rpx 20rpx;
		font-size: 26rpx;
	}

	.shelf-true {
		color: #FFFFFF;
		background-color: #E64340;
	}

	.shelf-false {
		background-color: #F8F8F8;
		color: rgba(0, 0, 0, 0.2);
	}

	/* 底部 */
	.manage {
		position: fixed;
		bottom: 0;
		right: 0;
		left: 200rpx;
		display: flex;
		justify-content: space-between;
	}

	.manage text {
		width: 50%;
		text-align: center;
		padding: 20rpx 0;
	}

	.manage text:nth-child(1) {
		background-color: antiquewhite;
	}

	.manage text:nth-child(2) {
		background-color: aliceblue;
	}
</style>