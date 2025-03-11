import React from 'react';

interface KMLUploaderProps {
  setKmlData: React.Dispatch<React.SetStateAction<Document | null>>;
}

function KMLUploader({ setKmlData }: KMLUploaderProps) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const kmlText = reader.result as string;
      const parser = new DOMParser();
      const kmlDoc = parser.parseFromString(kmlText, 'application/xml');
      setKmlData(kmlDoc);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" accept=".kml" onChange={handleFileUpload} />
    </div>
  );
}

export default KMLUploader;
