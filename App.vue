<template>
	<NuxtPage />
</template>

<script>
	export default {
		created() {
			console.log('APP: created ...');
			/*
			const data = {
			    anything: 'you want',
			}
			
			this.$cookies.set('thing', data, {
			    path: '/',
			    maxAge: 60 * 60 * 24 * 7
			});
			
			this.$cookies.get('thing');
			*/
			const user = this.$cookies.get('user');
			if (user === undefined)
				this.$router.push('/login');
		}
	}
</script>
