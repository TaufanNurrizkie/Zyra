import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import L from "leaflet";

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Komponen untuk auto-fit ke Indonesia
function FitIndoBounds() {
  const map = useMap();

  useEffect(() => {
    const indoBounds = [
      [-11.0, 95.0], // Southwest Indonesia
      [6.0, 141.0], // Northeast Indonesia
    ];

    map.fitBounds(indoBounds, { padding: [20, 20] });

    const handleResize = () => {
      map.invalidateSize();
      map.fitBounds(indoBounds, { padding: [20, 20] });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [map]);

  return null;
}

export default function MapMustahik({ mustahik }) {
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
        minZoom={3}
        className="h-full w-full"
      >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {mustahik.map((item) => (
        <Marker key={item.id} position={[item.latitude, item.longitude]}>
          <Popup>
            <strong>{item.nama}</strong> <br />
            {item.alamat}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
}
