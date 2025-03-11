

interface DetailedTableProps {
  kmlData: Document | null;
}

function DetailedTable({ kmlData }: DetailedTableProps) {
  if (!kmlData) {
    return null;
  }

  const elements = kmlData.getElementsByTagName('Placemark');
  const details = Array.from(elements).map((element) => {
    const name = element.getElementsByTagName('name')[0]?.textContent;
    const lineString = element.getElementsByTagName('LineString')[0];
    const coordinates = lineString?.getElementsByTagName('coordinates')[0]?.textContent ?? undefined;
    const length = calculateLength(coordinates);

    return { name, type: 'LineString', length };
  });

  function calculateLength(coordinates: string | undefined): number {
    if (!coordinates) return 0;
    const coords = coordinates.trim().split(/\s+/).map(coord => {
      const [lng, lat] = coord.split(',').map(Number);
      return { lng, lat };
    });

    let totalLength = 0;
    for (let i = 1; i < coords.length; i++) {
      const { lng: lng1, lat: lat1 } = coords[i - 1];
      const { lng: lng2, lat: lat2 } = coords[i];
      const distance = Math.sqrt((lng2 - lng1) ** 2 + (lat2 - lat1) ** 2);
      totalLength += distance;
    }
    return totalLength;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Element Type</th>
          <th>Total Length</th>
        </tr>
      </thead>
      <tbody>
        {details.map((detail, index) => (
          <tr key={index}>
            <td>{detail.name}</td>
            <td>{detail.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DetailedTable;
