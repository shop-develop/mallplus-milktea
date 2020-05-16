<template>
	<view class="container">
		<view class="form-box">
			<view class="form">
				<list-cell :hover="false">
					<view class="form-input">
						<view class="label">收货人</view>
						 <input class="input" placeholder="请输入收货人" v-model="form.name" placeholder-class="text-color-assist"/>
					</view>
				</list-cell>
				<list-cell :hover="false">
					<view class="form-input">
						<view class="label">性别</view>
						<view class="radio-group">
							<view class="radio" :class="{'checked': !form.postCode}" style="margin-right: 10rpx;" @tap="form.postCode=0">先生</view>
							<view class="radio" :class="{'checked': form.postCode}" @tap="form.postCode=1">女士</view>
						</view>
					</view>
				</list-cell>
				<list-cell :hover="false">
					<view class="form-input">
						<view class="label">联系方式</view>
						 <input class="input" placeholder="请输入收货人联系方式" v-model="form.phoneNumber" placeholder-class="text-color-assist"/>
					</view>
				</list-cell>
				<list-cell :hover="false">
					<view class="form-input">
						<view class="label">收货地址</view>
						 <input class="input" placeholder="请选择收货地址" v-model="form.detailAddress" placeholder-class="text-color-assist"/>
					</view>
				</list-cell>
				<list-cell :hover="false">
					<view class="form-input">
						<view class="label">门牌号</view>
						 <input class="input" placeholder="请输入收货人详细地址" v-model="form.areaId" placeholder-class="text-color-assist"/>
					</view>
				</list-cell>
			</view>
			<view class="btn-section">
				<button type="primary" size="default" @tap="save">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	import listCell from '@/components/list-cell/list-cell'
	import Api from '@/common/api';
	export default {
		components: {
			listCell
		},
		data() {
			return {
				form: {
					name: '',
					postCode: 0,
					phoneNumber: '',
					detailAddress: '',
					longitude:1,
					latitude:1,
					defaultStatus:1,
					areaId: ''
				}
			}
		},
		async onLoad(option) {
		console.log(option)
			//为了方便演示，这里用本地缓存
			if(option.data) {
				const addresses =  JSON.parse(option.data)
				this.form = addresses
			}
		},
		methods: {
			async save() {
			this.form.latitude =1;
			this.form.longitude =1;
			this.form.defaultStatus =1;
			    let data1 = await Api.apiCall('post', Api.goods.addressSave, this.form);
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form-box {
		width: 100%;
		height: 100%;
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		color: $text-color-base;
		
		.form-input {
			display: flex;
			align-items: center;
			width: 100%;
		}
		
		.label {
			width: 200rpx;
			font-size: $font-size-lg;
			color: $text-color-base;
			font-weight: 500;
		}
		
		.input {
			flex: 1;
			display: flex;
			align-items: center;
		}
		
		.radio-group {
			display: flex;
			justify-content: flex-start;
			
			.radio {
				padding: 10rpx 30rpx;
				border-radius: 6rpx;
				border: 2rpx solid $text-color-assist;
				color: $text-color-assist;
				font-size: $font-size-base;
				
				&.checked {
					background-color: $color-primary;
					color: $text-color-white;
					border: 2rpx solid $color-primary;
				}
			}
		}
		
		.btn-section {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			
			button {
				font-size: $font-size-base;
				height: 90rpx;
				border-radius: 50rem !important;
				width: 85%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
