import UserLayout from '@/Layouts/UserLayout';
import React, { useState } from "react";

export default function Index() {
  const [selected, setSelected] = useState(0);

  const zakatTypes = [
    {
      title: "Zakat Fitrah",
      desc: `Zakat Fitrah adalah zakat yang wajib ditunaikan oleh setiap Muslim menjelang Idul Fitri,
      sebagai penyempurna ibadah puasa di bulan Ramadan. Zakat ini dibayarkan dalam bentuk makanan pokok
      yang biasa dikonsumsi di daerah tersebut (misalnya beras, gandum, kurma), atau boleh juga diganti
      dengan uang senilai makanan pokok itu. Besaran zakat fitrah umumnya setara dengan 1 sha’ (sekitar 2,5–3 kg beras).
      Tujuannya adalah untuk menyucikan jiwa orang yang berpuasa, sekaligus membantu fakir miskin agar dapat
      ikut bergembira di hari raya Idul Fitri.`
    },
    {
      title: "Zakat Mal",
      desc: `Zakat Mal adalah zakat yang dikeluarkan dari harta kekayaan apabila telah mencapai nisab (batas minimum)
      dan haul (telah dimiliki selama 1 tahun penuh). Jenis harta yang wajib dizakati meliputi emas, perak, uang tunai,
      tabungan, surat berharga, hasil investasi, hingga harta perdagangan. Besarnya zakat mal adalah 2,5% dari jumlah harta
      yang dimiliki. Zakat Mal berfungsi untuk membersihkan harta dari hak orang lain yang masih melekat di dalamnya
      serta membantu pemerataan kesejahteraan di masyarakat.`
    },
    {
      title: "Zakat Emas dan Perak",
      desc: `Zakat emas dan perak berlaku jika jumlah emas telah mencapai nisab sebesar 85 gram emas murni,
      atau perak setara dengan 595 gram. Syarat lain adalah sudah dimiliki selama 1 tahun (haul).
      Besaran zakat yang harus dikeluarkan adalah 2,5% dari total kepemilikan emas atau perak tersebut.
      Zakat ini bertujuan untuk menyucikan harta perhiasan atau simpanan emas/perak, agar tidak menimbulkan sifat kikir
      dan tetap memberi manfaat sosial bagi orang yang membutuhkan.`
    },
    {
      title: "Zakat Perdagangan",
      desc: `Zakat perdagangan wajib ditunaikan oleh para pelaku usaha atau pedagang yang harta dagangannya telah mencapai nisab
      (setara dengan 85 gram emas) dan telah dimiliki selama 1 tahun. Perhitungan zakat perdagangan mencakup seluruh modal,
      keuntungan, piutang yang bisa ditagih, kemudian dikurangi dengan hutang dan kerugian. Besarnya zakat adalah 2,5%
      dari total harta yang tersisa. Zakat ini bertujuan agar kegiatan perdagangan tidak hanya menguntungkan individu,
      tetapi juga memberi kontribusi nyata kepada masyarakat miskin.`
    },
    {
      title: "Zakat Pertanian",
      desc: `Zakat pertanian dikenakan pada hasil panen tanaman yang menjadi makanan pokok, seperti padi, gandum, jagung, dan kurma.
      Nisab zakat pertanian adalah 653 kg gabah (atau setara 520 kg beras). Berbeda dengan zakat mal, zakat pertanian tidak
      menunggu 1 tahun, melainkan langsung ditunaikan setiap kali panen. Jika pengairan sawah menggunakan air hujan atau sungai,
      zakatnya 10% dari hasil panen. Jika menggunakan biaya irigasi, zakatnya 5%. Hal ini menunjukkan keadilan syariat Islam
      dalam memperhatikan beban petani.`
    },
    {
      title: "Zakat Peternakan",
      desc: `Zakat peternakan berlaku untuk hewan ternak seperti unta, sapi, kerbau, dan kambing, apabila jumlahnya telah mencapai nisab.
      Misalnya, nisab kambing adalah 40 ekor, sedangkan nisab sapi adalah 30 ekor. Hewan ternak tersebut juga harus digembalakan
      dan dipelihara, bukan hanya untuk tenaga kerja. Zakat yang dikeluarkan berupa hewan ternak itu sendiri, sesuai ketentuan syariat.
      Tujuannya adalah agar harta berupa ternak yang produktif juga memiliki keberkahan dan tidak menimbulkan ketimpangan sosial.`
    },
    {
      title: "Zakat Rikaz",
      desc: `Zakat rikaz adalah zakat atas harta karun, barang temuan, atau peninggalan berharga yang ditemukan dan tidak diketahui pemiliknya.
      Besarnya zakat rikaz adalah 20% dari nilai harta temuan tersebut, yang langsung ditunaikan tanpa menunggu haul.
      Zakat ini berbeda dengan zakat mal karena sifatnya tidak rutin, melainkan hanya ketika ada harta temuan.
      Tujuannya adalah untuk menyalurkan manfaat dari harta yang tiba-tiba didapatkan agar tidak hanya dinikmati oleh individu,
      tetapi juga bermanfaat untuk kepentingan umat.`
    }
  ];

  return (
    <UserLayout>
      <div className="bg-gray-100 text-black min-h-screen">
        <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
          {/* Pengertian Zakat */}
          <section className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">Apa itu Zakat?</h2>
            <p className="text-gray-700 leading-relaxed">
              Zakat adalah kewajiban bagi setiap Muslim yang mampu untuk mengeluarkan sebagian hartanya
              sesuai ketentuan syariat. Zakat berfungsi untuk membersihkan harta dan jiwa serta membantu
              mereka yang membutuhkan. Dalam Islam, zakat juga menjadi salah satu rukun Islam yang kelima,
              sehingga memiliki kedudukan yang sangat penting dalam kehidupan umat Muslim.
              Selain itu, zakat adalah instrumen sosial yang efektif untuk pemerataan ekonomi,
              mengurangi kemiskinan, dan memperkuat ikatan persaudaraan di masyarakat.
            </p>
          </section>

          {/* Jenis-jenis Zakat */}
          <section className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Jenis-Jenis Zakat</h2>

            {/* Tab Button */}
            <div className="flex flex-wrap gap-2 mb-6">
              {zakatTypes.map((z, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelected(idx)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition
                    ${selected === idx
                      ? "bg-blue-600 text-white shadow"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                >
                  {z.title}
                </button>
              ))}
            </div>

            {/* Konten Tab */}
            <div className="p-4 bg-gray-50 border rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">{zakatTypes[selected].title}</h3>
              <p className="mt-2 text-gray-700 leading-relaxed whitespace-pre-line">
                {zakatTypes[selected].desc}
              </p>
            </div>
          </section>

          {/* Hikmah Zakat */}
          <section className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">Hikmah Zakat</h2>
            <p className="text-gray-700 leading-relaxed">
              Zakat bukan hanya kewajiban, tetapi juga sarana untuk menumbuhkan kepedulian sosial,
              mengurangi kesenjangan ekonomi, dan menyucikan harta serta jiwa. Dengan zakat, terjalin
              ukhuwah antar sesama Muslim dan tercipta keadilan sosial. Lebih dari itu, zakat juga
              berfungsi sebagai instrumen distribusi kekayaan, sehingga perputaran ekonomi tidak hanya
              berpusat pada kelompok tertentu saja, tetapi menyebar merata pada seluruh lapisan masyarakat.
            </p>
          </section>
        </main>
      </div>
    </UserLayout>
  );
}
