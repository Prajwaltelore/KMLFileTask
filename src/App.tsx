import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import KMLUploader from "./components/KMLUploader";
import SummaryTable from "./components/SummaryTable";
import DetailedTable from "./components/DetailedTable";
import "leaflet/dist/leaflet.css";

function App() {
  const [kmlData, setKmlData] = useState<Document | null>(null);
  const [view, setView] = useState<"summary" | "detailed" | null>(null);

  return (
    <div className="container-fluid">
      <h1>KML Viewer</h1>
      <KMLUploader setKmlData={setKmlData} />
      <button onClick={() => setView("summary")}>Summary</button>
      <button onClick={() => setView("detailed")}>Detailed</button>
      {view === "summary" && <SummaryTable kmlData={kmlData} />}
      {view === "detailed" && <DetailedTable kmlData={kmlData} />}
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
}

export default App;
