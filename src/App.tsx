import { LineChart, type DataItem } from "./Linechart.tsx";

const chartData: DataItem[] = [
  { date: new Date("2026-04-20"), value: 3 },
  { date: new Date("2026-08-20"), value: 4 },
  { date: new Date("2026-09-24"), value: 10 },
  { date: new Date("2026-10-26"), value: 20 },
];

export default function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>crunch o'meter</h1>
      <LineChart dataset={chartData} width={600} height={400} />
    </div>
  );
}
