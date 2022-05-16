
<template>
    <h1>Home</h1>
    <h3>{{ $myPlugin() }}</h3>
    <hr />
    <NuxtLayout name="custom">
        Hello world!

        <template #header>
            <h3>slot_header</h3>
        </template>

        <nav class="flex align-center gap-4 p-4">
            <NuxtLink to="/default">
                Default layout |
            </NuxtLink>
            <NuxtLink to="/custom">
                Custom layout |
            </NuxtLink>
            <NuxtLink to="/dynamic">
                Dynamic layout
            </NuxtLink>
        </nav>
    </NuxtLayout>
    <hr />

    <p>Fetched from <pre>/api/mountain</pre>: {{ mountain }}</p>
</template>

<script setup>

    definePageMeta({
        layout: "custom",
    });

    const { data: mountain } = await useFetch('/api/test')
</script>
