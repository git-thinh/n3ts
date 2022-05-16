<template>
    <h3>This is [layout/custom.vue]</h3>
    <div>
        <strong>Custom layout</strong>
        Header slot:
    </div>
    <slot name="header">
        Default slot #header content for <code>Custom</code> layout
    </slot>
    <slot />
</template>

<script>
    export default {
        created() {
            console.log('layout custom created')
        }
    }
</script>
