<template>
	<!-- 上传图片 -->
	<view class="goods-top">
		<view><input type="text" v-model="cover.goods_title" placeholder="请输入商品标题" placeholder-class="pl-text" /></view>
		<view class="goods-image" v-if="cover.sto_image.length > 0" >
			<view class="upload-Image" v-for="(item,index) in cover.sto_image"
				:key="index">
				<image :src="item.image" mode="aspectFill" @click="preView(item.image)"></image>
				<image src="/static/detail/shanchu-goods.svg" mode="widthFix" @click="deleteImg(index)"></image>
			</view>
			<view @click="upImage">
				<image src="/static/detail/shuxing-img.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>
	<!-- 上传短视频 -->
	<view class="goods-top goods-video">
		<view class="video-title">
			<text>上传短视频(可选)</text>
			<image src="/static/detail/shanchu.svg" v-if="video.sto_video != ''" @click="video.sto_video = ''"></image>
		</view>
		<view class="goods-image" v-if="video.sto_video == ''">
			<view>
				<image src="/static/detail/shuxing-img.png" mode="aspectFill" @click="upVideo"></image>
			</view>
		</view>
		<video v-if="video.sto_video != ''" :src="video.sto_video" object-fit="cover"></video>
	</view>
	<!-- 所属分类 -->
	<view class="specs-view">
		<picker mode="selector" :range="sortArray" range-key="sort_name" @change="changeEnd">
			<view class="sort-title specs-title">
				<text>所属分类</text>
				<text>{{sort_value}}</text>
				<image src="/static/detail/xiangyou-jiantou.svg" mode="widthFix"></image>
			</view>
		</picker>
	</view>
	<!-- 价格库存 -->
	<view class="specs-view price-stock">
		<view>
			<text>价格</text>
			<input type="number" v-model="price" :disabled="specs.specs_data.length > 0 ? true : false"
				placeholder="请输入价格" placeholder-class="I-style" cursor-spacing="50">
			<text>元</text>
		</view>
		<view>
			<text>库存</text>
			<input type="number" v-model="stock" :disabled="specs.specs_data.length > 0 ? true : false"
				placeholder="请输入库存" placeholder-class="I-style" cursor-spacing="50">
			<text>件</text>
		</view>
	</view>
	<!-- 创建规格 -->
	<view class="specs-view" @click="juMp">
		<view class="specs-title">
			<text>创建规格(可选)</text>
			<image src="/static/detail/xiangyou-jiantou.svg" mode="widthFix"></image>
		</view>
		<view class="specs-image" v-if="specs.specs_data.length == 0 ">
			<image src="/static/detail/guige-img.jpg" mode="widthFix"></image>
		</view>
		<!-- 已有规格展示 -->
		<view class="Se-specs S-flex" v-if="specs.specs_data.length > 0 " v-for="(item,index) in specs.specs_data"
			:key="index">
			<view>
				<image :src="item.image" mode="aspectFill"></image>
			</view>
			<view class="S-top">
				<view class="S-flex S-right">
					<text v-for="(item_S,index_S) in item.att_data" :key="index_S">{{item_S.att_val}}</text>
				</view>
				<view class="S-flex S-right S-stock">
					<text>库存</text>
					<text>{{item.stock}}件</text>
				</view>
			</view>
			<view class="S-price">{{item.price}}</view>
		</view>
	</view>
	<!-- 详情图 -->
	<view class="specs-view">
		<view class="specs-title"><text>商品详情</text></view>
		<view class="detail-image" v-if="detail.sto_detail.length > 0" v-for="(item,index) in detail.sto_detail"
			:key="index">
			<image :src="item.image" mode="widthFix" @click="previewDeta(item.image)"></image>
			<image src="/static/detail/shanchu-goods.svg" mode="widthFix" @click="deleteDeta(index)"></image>
		</view>
		<view class="specs-image">
			<image src="/static/detail/shpin-img.jpg" mode="widthFix" @click="upDetail"></image>
		</view>
	</view>

	<!-- 底部新增分类按钮 -->
	<view style="height: 300rpx;"></view>
	<view class="newly-added-view back">
		<view class="newly-added" @click="subMit">上架售卖</view>
	</view>



</template>

<script setup>
	import {
		watch,
		reactive,
		toRefs,
		onMounted
	} from 'vue'

	// 价格和库存
	const priceinv = reactive({
		price: '',
		stock: ''
	})
	const {
		price,
		stock
	} = toRefs(priceinv)


	// 监听创建规格后返回上一页面的值
	// import {sku_val} from '@/Acc-config/answer.js'
	const specs = reactive({
		specs_data: []
	})

	// 上传横幅图片
	// import {
	// 	Feedback,
	// 	Upload
	// } from '@/Acc-config/media.js'
	const cover = reactive({
		goods_title: '',
		sto_image: []
	})

	// 上传短视频
	const video = reactive({
		sto_video: ''
	})

	// 所属分类
	import {
		inIt
	} from '@/Acc-config/init.js'
	onMounted(async () => {
		let DB = await inIt()
		const res = await DB.database().collection('goods_sort').field({
			_openid: false
		}).get()
		sortdata.sortArray = res.data
	})
	const sortdata = reactive({
		sortArray: [],
		sort_value: '',
		sort_id: '', //分类的id，用于提交数据时对选中的分类下的quantity++
	})
	const {
		sortArray,
		sort_value
	} = toRefs(sortdata)

	// 上传详情图
	const detail = reactive({
		sto_detail: []
	})
</script>


<style>
	page {
		background-color: #f2f2f2;
	}

	.goods-top {
		background-color: #FFFFFF;
		padding: 20rpx;
	}

	.pl-text {
		font-weight: 100;
	}

	.goods-top input {
		padding: 30rpx 0;
		font-weight: bold;
	}

	.goods-image {
		display: flex;
		flex-wrap: wrap;
	}

	.goods-image view {
		width: calc(33.3% - 5rpx*2);
		height: 200rpx;
		margin: 5rpx;
	}

	.goods-image image {
		width: 100%;
		height: 100%;
		display: block;
		border-radius: 7rpx;
	}

	.upload-Image {
		position: relative;
	}

	.upload-Image image:nth-child(2) {
		width: 30rpx !important;
		height: 30rpx !important;
		position: absolute;
		top: 0;
		right: 0;
	}

	/* 视频 */
	.goods-video {
		margin-top: 40rpx;
		font-weight: bold;
	}

	.video-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.video-title image {
		width: 35rpx;
		height: 35rpx;
		display: block;
	}

	.goods-video video {
		height: 400rpx;
		width: 100%;
	}

	/* 所属分类 */
	.sort-title text:nth-child(1) {
		flex: 1;
	}

	.sort-title text:nth-child(2) {
		padding-right: 20rpx;
	}

	/* 价格，库存 */
	.price-stock view {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx;
	}

	.price-stock view:nth-child(1) {
		padding-bottom: 20rpx;
	}

	.price-stock text:nth-child(1) {
		flex: 1;
	}

	.price-stock input {
		padding: 0 20rpx;
		text-align: right;
	}

	.I-style {
		color: #a8a8a8;
		font-size: 28rpx !important;
	}

	/* 规格 */
	.specs-view {
		background-color: #FFFFFF;
		margin: 40rpx 20rpx;
		border-radius: 8rpx;
	}

	.specs-title image {
		width: 35rpx;
		height: 35rpx;
		display: block;
	}

	.specs-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx;
		font-weight: bold;
	}

	.specs-image image {
		width: 100%;
		height: 100%;
		display: block;
		border-radius: 8rpx;
	}

	.specs-image {
		padding: 20rpx;
	}

	.detail-image {
		position: relative;
	}

	.detail-image image:nth-child(1) {
		width: 100%;
		height: 100%;
		display: block;
	}

	.detail-image image:nth-child(2) {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top: 5rpx;
		right: 5rpx;
	}

	/* 已选规格 */
	.S-flex {
		display: flex;
		align-items: center;
	}

	.S-flex image {
		width: 100rpx;
		height: 100rpx;
		display: block;
		border-radius: 8rpx;
	}

	.Se-specs {
		padding: 20rpx;
		border-bottom: 1rpx solid #e6e6e6;
	}

	.S-top {
		flex: 1;
	}

	.S-top view:nth-child(1) {
		padding-bottom: 10rpx;
	}

	.S-right text {
		padding: 0 20rpx;
	}

	.S-stock {
		color: #c3c3c3;
	}

	.S-price {
		font-weight: bold;
	}

	/* 底部 */
	.back {
		background-color: #fafafa !important;
		padding-top: 10rpx !important;
	}
</style>