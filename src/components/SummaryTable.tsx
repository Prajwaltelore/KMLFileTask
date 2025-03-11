

interface SummaryTableProps {
  kmlData: Document | null;
}

function SummaryTable({ kmlData }: SummaryTableProps) {
  if (!kmlData) {
    return null;
  }

  const counts: { [key: string]: number } = {
    Placemarks: kmlData.getElementsByTagName("Placemark").length,
    LineStrings: kmlData.getElementsByTagName("LineString").length,
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Element Type</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(counts).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{counts[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SummaryTable;
