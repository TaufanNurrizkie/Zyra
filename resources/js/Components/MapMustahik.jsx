import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import L from "leaflet";

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Komponen untuk auto-fit ke Indonesia
function FitIndoBounds() {
  const map = useMap();

  useEffect(() => {
    const indoBounds = [
      [-11.0, 95.0],  // Southwest Indonesia
      [6.0, 141.0],   // Northeast Indonesia
    ];

    // fit saat pertama kali render
    map.fitBounds(indoBounds, { padding: [20, 20] });

    // fit ulang setiap kali window resize (misalnya sidebar dibuka/dikurangi)
    const handleResize = () => {
      map.invalidateSize();
      map.fitBounds(indoBounds, { padding: [20, 20] });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [map]);

  return null;
}

export default function MapMustahik() {
  const mustahikData = [
    { id: 1, nama: "Mustahik A", alamat: "Bandung", lat: -6.914744, lng: 107.60981 },
    { id: 2, nama: "Mustahik B", alamat: "Cimahi", lat: -6.8722, lng: 107.5426 },
    { id: 3, nama: "Mustahik C", alamat: "Sumedang", lat: -6.8575, lng: 107.9205 },
  ];

  const indoBounds = [
    [-11.0, 95.0],
    [6.0, 141.0],
  ];

  return (
    <div className="w-full h-[300px] md:h-[400px] rounded-lg shadow-md overflow-hidden">
      <MapContainer
        bounds={indoBounds}
        maxBounds={indoBounds}
        maxBoundsViscosity={1.0}
        minZoom={5}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Auto-fit ke batas Indonesia */}
        <FitIndoBounds />

        {mustahikData.map((m) => (
          <Marker key={m.id} position={[m.lat, m.lng]}>
            <Popup>
              <div>
                <h3 className="font-bold">{m.nama}</h3>
                <p className="text-sm">{m.alamat}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
