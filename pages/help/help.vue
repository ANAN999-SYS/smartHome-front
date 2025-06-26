<template>
	<view>
		<pyh-nv :config="config"></pyh-nv>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				config: {
					title: "",
					back: {
						iconForce: true
					},
					bgColor: "linear-gradient(to bottom, #56ccf2, #42a6ef)",
					color: "#fff"
				},
			}
		},
		onLoad(opt) {
			console.log(opt.title)
			this.config.title=opt.title
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
