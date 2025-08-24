import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';

export default function Dashboard({ mustahik, program, dana, gallery, programData, donatur, danaHariIni, berita }) {
    return (
        <UserLayout
            mustahik={mustahik}
            programData={programData}
            program={program}
            danaHariIni={danaHariIni}
            dana={dana}
            donatur={donatur}
            gallery={gallery}
            berita={berita}
        />
    );
}
