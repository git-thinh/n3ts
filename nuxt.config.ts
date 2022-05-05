import { defineNuxtConfig } from 'nuxt'
// https://v3.nuxtjs.org/api/configuration/nuxt.config

const cf = {
    target: 'static',
    ssr: true,
    telemetry: true,
    modules: [],
    app: {
        head: {
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],
            script: [
                {
                    src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
                    integrity: 'sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p',
                    crossorigin: 'anonymous'
                }
            ],
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
                    integrity: "sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3",
                    crossorigin: "anonymous"
                }
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
