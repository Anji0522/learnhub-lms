import { ChartNoAxesCombined } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartColors = [
  "var(--color-primary)",
  "var(--color-teal)",
  "var(--color-warning)",
  "var(--color-success)",
];

export default function ProgressChart({
  data,
  title = "Course progress",
  valueLabel = "Complete",
}) {
  const hasData = data.some((item) => item.progress > 0);

  return (
    <section className="analytics-card" aria-label={title}>
      <div className="analytics-heading">
        <div>
          <span className="analytics-kicker">LEARNING ANALYTICS</span>
          <h3>{title}</h3>
        </div>
        <span className="analytics-legend">
          <i />
          {valueLabel}
        </span>
      </div>
      {hasData ? (
        <div className="analytics-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 4, right: 18, bottom: 4, left: 8 }}
              barCategoryGap={16}
            >
              <CartesianGrid
                horizontal={false}
                stroke="var(--color-border)"
                strokeDasharray="3 3"
              />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-secondary)", fontSize: 11 }}
                domain={[0, "dataMax"]}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={122}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-secondary)", fontSize: 11 }}
              />
              <Tooltip
                cursor={{ fill: "var(--color-chart-cursor)" }}
                contentStyle={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-surface)",
                  color: "var(--color-text)",
                  boxShadow: "var(--shadow-md)",
                }}
                formatter={(value) => [
                  `${value}${valueLabel === "Complete" ? "%" : ""}`,
                  valueLabel,
                ]}
              />
              <Bar
                dataKey="progress"
                fill="var(--color-primary)"
                radius={[0, 6, 6, 0]}
                maxBarSize={22}
              >
                {data.map((item, index) => (
                  <Cell
                    key={item.name}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="analytics-empty">
          <ChartNoAxesCombined size={20} />
          <span>Activity will appear here as courses get underway.</span>
        </div>
      )}
    </section>
  );
}
