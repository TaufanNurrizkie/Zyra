import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';

export default function Dashboard({ mustahik, program, dana, gallery }) {
    return (
        <UserLayout
            mustahik={mustahik}
            // donatur={donatur}
            program={program}
            dana={dana}
            gallery={gallery}
        />
    );
}
