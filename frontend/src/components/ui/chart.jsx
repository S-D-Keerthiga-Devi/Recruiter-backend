import * as React from "react";
import { ResponsiveContainer, Tooltip, Legend } from "recharts";
import { cn } from "@/lib/utils";

const THEMES = {
  light: "",
  dark: ".dark",
};

const ChartContext = React.createContext(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

function ChartContainer({ id, className, children, config = {}, ...props }) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn("flex aspect-video justify-center text-xs", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer>
          {React.Children.count(children) > 0 ? children : <div>No Chart Data</div>}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartStyle = ({ id, config = {} }) => {
  if (!config || typeof config !== "object") return null;

  const colorConfig = Object.entries(config).filter(([, item]) => item?.theme || item?.color);
  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
            ${prefix} [data-chart=${id}] {
              ${colorConfig
                .map(([key, itemConfig]) => {
                  const color = itemConfig?.theme?.[theme] || itemConfig?.color;
                  return color ? `  --color-${key}: ${color};` : "";
                })
                .join("\n")}
            }
          `
          )
          .join("\n"),
      }}
    />
  );
};

function ChartTooltipContent({
  active,
  payload = [],
  className,
  hideIndicator = false,
  formatter,
  color,
}) {
  const context = React.useContext(ChartContext);
  if (!context || !active || !payload?.length) return null;

  return (
    <div className={cn("border bg-background p-2 text-xs shadow-xl", className)}>
      {payload.map((item, index) => (
        <div key={index} className="flex justify-between gap-2">
          {!hideIndicator && (
            <span
              style={{ backgroundColor: color || item?.color }}
              className="w-2 h-2 rounded-full"
            />
          )}
          <span>{formatter ? formatter(item?.value) : item?.value}</span>
        </div>
      ))}
    </div>
  );
}

function ChartLegendContent({ className, payload = [], nameKey }) {
  const context = React.useContext(ChartContext);
  if (!context || !payload?.length) return null;

  return (
    <div className={cn("flex gap-4", className)}>
      {payload.map((item) => (
        <div key={item.value} className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item?.color }} />
          <span>{context?.config?.[nameKey || item?.dataKey]?.label || item?.value}</span>
        </div>
      ))}
    </div>
  );
}

export {
  ChartContainer,
  Tooltip as ChartTooltip,
  ChartTooltipContent,
  Legend as ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
