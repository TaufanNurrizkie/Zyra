import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminIndex() {
    return (

        <AdminLayout>
            <h1 className="text-2xl font-bold">Halo Admin</h1>
        </AdminLayout>


    );
}
