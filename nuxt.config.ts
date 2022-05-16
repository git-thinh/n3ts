import { defineNuxtConfig } from 'nuxt'
// https://v3.nuxtjs.org/api/configuration/nuxt.config

const cf = {
	target: 'static',
	ssr: true,
	telemetry: true,
	modules: ['cookie-universal-nuxt'],
	experimental: {
		reactivityTransform: true
	},
	app: {
		head: {
			meta: [
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' }
			],
			script: [{ src: '/js/all.min.js' }],
			link: [
				{ rel: 'stylesheet', href: '/css/light.min.css' },
				{ rel: 'stylesheet', href: '/css/fix.css' }
			],
			style: [
				// <style type="text/css">:root { color: red }</style>
				{ children: ':root { color: red }', type: 'text/css' }
			]
		}
	},
	//components: {
	//    dirs: [
	//        '~/components',
	//        {
	//            path: '~/other-components-folder',
	//            extensions: ['vue'],
	//            prefix: 'nuxt'
	//        }
	//    ]
	//},
	//router: {
	//    prefetchLinks: false,
	//    trailingSlash: true,
	//    extendRoutes(routes, resolve) {
	//        console.log('??????????')
	//        routes.splice(0, routes.length);
	//        routes.push({
	//            name: 'content',
	//            path: '*',
	//            component: resolve(__dirname, 'pages/home.vue')
	//        });
	//    }
	//},
	render: {
		http2: {
			push: true
		}
	}
};
export default defineNuxtConfig(cf);
