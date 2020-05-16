<template>
	<view class="container">
		<view class="main">
			<view class="address" v-for="(address, index) in addresses" :key="index" @tap="chooseAddress(address)">
				<view class="left">
					<view class="font-size-lg font-weight-bold" style="margin-bottom: 10rpx;">{{ address.detailAddress }}</view>
					<view class="font-size-sm text-color-assist">
						{{ address.name }} {{ address.postCode==0 ? '先生' : '女士' }} {{ address.phoneNumber }}
					</view>
				</view>
				<image src="/static/images/edit.png" class="edit-icon" @tap="edit(address)"></image>
			</view>
		</view>
		<view class="btn-box">
			<button type="primary" size="default" @tap="add">新增地址</button>
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import Api from '@/common/api';
	export default {
		data() {
			return {
				scene: 'menu',
				addresses:[],
				is_choose: false //是否选择地址
			}
		},
		computed: {

		},
		async onLoad({is_choose, scene}) {
			this.is_choose = is_choose || false
			this.scene = scene || 'menu'
			this.getListAddress();
		},
		async onShow(){
        		this.getListAddress()
        	},
		methods: {
			...mapMutations([ 'SET_ORDER_TYPE']),
			add() {
				uni.navigateTo({
					url: '/pages/address/add'
				})
			},
			edit(item) {
				uni.navigateTo({
					url: '/pages/address/add?data='+JSON.stringify(item)
				})
			},
			async getListAddress(){
            			let params = {};
            			this.addresses = await Api.apiCall('get', Api.goods.listAddress, params);
            		},
			chooseAddress(address) {
				if(!this.is_choose) return

				this.SET_ORDER_TYPE('takeout')
				if(this.scene == 'menu') {
					uni.switchTab({
						url: '/pages/menu/menu'
					})
				} else if(this.scene == 'pay') {
					uni.navigateTo({
						url: '/pages/pay/pay'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 100%;
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		margin-bottom: 100rpx;
		
		.address {
			padding: 40rpx 30rpx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30rpx;
			
			.right {
				flex: 1;
				overflow: hidden;
				display: flex;
				flex-direction: column;
			}
			
			.edit-icon {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
	
	.btn-box {
		height: 100rpx;
		background-color: #FFFFFF;
		box-shadow: 0 0 20rpx rgba($color: $text-color-assist, $alpha: 0.1);
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 10rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
		
		button {
			height: 80rpx;
			width: 80%;
			border-radius: 50rem !important;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
