import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';

export default function Dashboard() {
    return (

        <UserLayout>
            <h1 className="text-2xl font-bold">Halo dari Dashboard Mustahik!</h1>
        </UserLayout>


    );
}
