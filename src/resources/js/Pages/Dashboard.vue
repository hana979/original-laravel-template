<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, usePage } from '@inertiajs/vue3';

type Page = { auth: { user: { name: string, email: string }} }
const page = usePage<Page>();
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="font-medium text-base text-gray-800">{{ page.props.auth.user.name }}</div>
                <div class="font-medium text-sm text-gray-500">{{ page.props.auth.user.email }}</div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>