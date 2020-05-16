<template>
	<view class="container">
		<view class="orders-list d-flex flex-column w-100" style="padding: 20rpx; padding-bottom: 0;">
			<view class="order-item" v-for="(item, index) in orders" :key="index" style="margin-bottom: 30rpx;" @tap="detail(item.id)">
				<list-cell :hover="false">
					<view class="w-100 d-flex align-items-center">
						<view class="flex-fill d-flex flex-column">
							<view class="font-size-lg text-color-base" style="margin-bottom: 20rpx;">
								{{ item.storeName }}
							</view>
							<view class="font-size-sm text-color-assist">订单编号：{{ item.id }}</view>
						</view>
						<view class="font-size-lg text-color-primary">
							{{ item.statusName }}
						</view>
					</view>
				</list-cell>
				<list-cell :hover="false" last>
					<view class="w-100 d-flex flex-column">
						<view class="w-100 text-truncate font-size-lg text-color-base" style="margin-bottom: 20rpx;">
							{{ orderGoodsName(item.orderItemList) }}
						</view>
						<view class="d-flex justify-content-between align-items-center" style="margin-bottom: 30rpx;">
							<view class="font-size-sm text-color-assist">
								{{ $util.formatDateTime(item.createTime) }}
							</view>
							<view class="d-flex font-size-sm text-color-base align-items-center">
								<view style="margin-right: 10rpx;">共{{ item.orderItemList.length }}件商品，实付</view>
								<view class="font-size-lg">￥{{ item.payAmount }}</view>
							</view>
						</view>
						<view class="d-flex align-items-center justify-content-end">
							<view>
								<button type="primary" v-if="item.status < 9" plain size="mini" @tap.stop="review(item)">去评价</button>
								<button type="primary" v-if="item.status ==15" plain size="mini" @tap.stop="deleteOrder(item)">删除订单</button>
								<button type="primary" v-if="item.status ==12" plain size="mini" @tap.stop="cancelOrder(item)">取消订单</button>
							</view>
						</view>
					</view>
				</list-cell>
			</view>
		</view>
	</view>
</template>

<script>
import Api from '@/common/api';
	import listCell from '@/components/list-cell/list-cell'
	
	export default {
		components: {
			listCell
		},
		data() {
			return {
				page: 1,
				pageSize: 5,
				orders: []
			}
		},
		computed: {
			orderGoodsName() {
				return (goods) => {
					let arr = []
					goods.forEach(good => arr.push(good.productName + '*' + good.productQuantity))
					return arr.join('，')
				}
			}
		},
		async onLoad() {
			if(!this.$store.getters.isLogin) {
				uni.navigateTo({url: '/pages/login/login'})
			}
			await this.getOrders(false)
		},
		async onReachBottom() {
			await this.getOrders(false)
		},
		async onPullDownRefresh() {
			await this.getOrders(true)
		},
		methods: {
			async getOrders(isRefresh = false) {
				uni.showLoading({
					title: '加载中'
				})
				let params = { pageNum: this.pageNum, status: 0 };
                				let data = await Api.apiCall('get', Api.order.orderList, params);
                				let goodsList = data.records;

				if(isRefresh) {
					this.orders = []
					this.page = 1
				}
				//goodsList = orders.slice(this.pageSize * (this.page - 1), this.pageSize * this.page)
				if(goodsList.length) {
					this.orders = this.orders.concat(goodsList)
					this.page += 1
				}
				
				uni.hideLoading()
			},
			//取消订单
            		async cancelOrder(item) {
            			let params = { orderId: item.id };
            			let data = await Api.apiCall('post', Api.order.closeOrder, params);

            			if (data) {

            				this.pageNum =  1;
            				this.getOrders(true)
            			}

            		},
			async deleteOrder(item) {
                                     			let params = { orderId: item.id };
                                     			let data = await Api.apiCall('post', Api.order.deleteOrder, params);

                                     			if (data) {
                                     				this.pageNum =  1;
                                     				this.getOrders(true)
                                     			}

                                     		},
			detail(id) {
				uni.navigateTo({
					url: '/pages/orders/detail?id=' + id
				})
			},
			review(order) {

				uni.navigateTo({
					url: '/pages/review/review?id=' + order.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
