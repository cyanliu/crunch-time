import { BarChart, type DataItem } from "./Barchart.tsx";

const chartData: DataItem[] = [
  { label: "Apples", value: 45 },
  { label: "Bananas", value: 82 },
  { label: "Oranges", value: 61 },
];

export default function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Fruit Inventory</h2>
      <BarChart data={chartData} width={600} height={400} />
    </div>
  );
}
