import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';

export default function Dashboard({ gallery }) {
    return (
        <UserLayout gallery={gallery}>
        </UserLayout>
    );
}
