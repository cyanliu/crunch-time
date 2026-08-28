import { LineChart, type DataItem } from "./Linechart.tsx";

const chartData: DataItem[] = [
  { label: "Apples", value: 45 },
  { label: "Bananas", value: 82 },
  { label: "Oranges", value: 61 },
];

export default function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>crunch o'meter</h1>
      <LineChart data={chartData} width={600} height={400} />
    </div>
  );
}
