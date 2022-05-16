<template>
	<slot />
</template>

<script setup>
	const route = useRoute()
	if (process.client) {
		if (route.meta && route.meta.body && route.meta.body.className) {
			const el = document.getElementById('__nuxt');
			if (el) el.className = route.meta.body.className;
		}
	}
</script>
<script>
	export default {
		created() {
			console.log('Layout.blank: created ...');
		}	
		
	}
</script>
