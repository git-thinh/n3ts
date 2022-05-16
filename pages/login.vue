<script setup lang="ts">
	import {
		sha256
	} from 'js-sha256'

	let count = $ref(0)

	definePageMeta({
		body: {
			className: 'd-flex align-items-center bg-auth border-top border-top-2 border-primary'
		}
	});

	onMounted(() => {
		console.log('Login.vue: onMounted ...');
	})

	// onCreated(() => {
	// 	console.log('Login.vue: created ...');
	// })

	const route = useRoute()

	function enableCustomLayout() {
		route.meta.layout = "custom"
	}


	function login() {
		console.log('Login.vue: login submit ...');

		count++;

		const data = {
			user_name: 'nvthinh',
			full_name: 'Nguyễn Văn Thịnh'
		};

		// this.$cookies.set('user', data, {
		// 	path: '/',
		// 	maxAge: 60 * 60 * 24 * 7
		// });

		// //this.$cookies.get('thing');
		// this.$router.push('/');
	}
</script>

<template>
	<NuxtLayout name="blank">
		<div class="container">
			<div class="row align-items-center">
				<div class="col-12 col-md-6 offset-xl-2 offset-md-1 order-md-2 mb-5 mb-md-0">

					<!-- Image -->
					<div class="text-center">
						<img src="/images/happiness.svg" alt="..." class="img-fluid">
					</div>

				</div>
				<div class="col-12 col-md-5 col-xl-4 order-md-1 my-5">

					<!-- Heading -->
					<h1 class="display-4 text-center mb-3">
						Sign in
					</h1>

					<Label :count="count"></Label>
					
					<button @click="enableCustomLayout">Update layout</button>
					
					<!-- Subheading -->
					<p class="text-muted text-center mb-5">
						Free access to our dashboard.
					</p>

					<!-- Form -->
					<div>

						<!-- Email address -->
						<div class="form-group">

							<!-- Label -->
							<label>Email Address</label>

							<!-- Input -->
							<input type="email" class="form-control" placeholder="name@address.com">

						</div>

						<!-- Password -->
						<div class="form-group">

							<div class="row">
								<div class="col">

									<!-- Label -->
									<label>Password</label>

								</div>
								<div class="col-auto">

									<!-- Help text -->
									<a href="password-reset-illustration.html" class="form-text small text-muted">
										Forgot password?
									</a>

								</div>
							</div> <!-- / .row -->
							<!-- Input group -->
							<div class="input-group input-group-merge">

								<!-- Input -->
								<input type="password" class="form-control form-control-appended"
									placeholder="Enter your password">

								<!-- Icon -->
								<div class="input-group-append">
									<span class="input-group-text">
										<i class="fe fe-eye"></i>
									</span>
								</div>

							</div>
						</div>

						<!-- Submit -->
						<button @click="login" type="button" class="btn btn-lg btn-block btn-primary mb-3">
							Sign in
						</button>

						<!-- Link -->
						<div class="text-center">
							<small class="text-muted text-center">
								Don't have an account yet? <a href="sign-up-illustration.html">Sign up</a>.
							</small>
						</div>

					</div>

				</div>
			</div> <!-- / .row -->
		</div>
	</NuxtLayout>
</template>
