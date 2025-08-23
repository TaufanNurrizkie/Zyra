import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        judul: "",
        isi: "",
        jenis: "",
        daerah: "",
        foto: null,
        status: "segera",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("programs.store"));
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Tambah Program</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div>
                        <label>Judul</label>
                        <input
                            type="text"
                            value={data.judul}
                            onChange={(e) => setData("judul", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.judul && <p className="text-red-500">{errors.judul}</p>}
                    </div>

                    <div>
                        <label>Isi</label>
                        <textarea
                            value={data.isi}
                            onChange={(e) => setData("isi", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.isi && <p className="text-red-500">{errors.isi}</p>}
                    </div>

                    <div>
                        <label>Jenis</label>
                        <input
                            type="text"
                            value={data.jenis}
                            onChange={(e) => setData("jenis", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.jenis && <p className="text-red-500">{errors.jenis}</p>}
                    </div>

                    <div>
                        <label>Daerah</label>
                        <input
                            type="text"
                            value={data.daerah}
                            onChange={(e) => setData("daerah", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.daerah && <p className="text-red-500">{errors.daerah}</p>}
                    </div>

                    <div>
                        <label>Foto</label>
                        <input
                            type="file"
                            onChange={(e) => setData("foto", e.target.files[0])}
                            className="w-full border rounded p-2"
                        />
                        {errors.foto && <p className="text-red-500">{errors.foto}</p>}
                    </div>

                    <div>
                        <label>Status</label>
                        <select
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                            className="w-full border rounded p-2"
                        >
                            <option value="segera">Segera</option>
                            <option value="berjalan">Berjalan</option>
                            <option value="selesai">Selesai</option>
                        </select>
                        {errors.status && <p className="text-red-500">{errors.status}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        Simpan
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
