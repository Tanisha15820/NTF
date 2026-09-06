export const CHART_COLORS = {
  primary: "#6F4AE7",
  primaryLight: "#7A5AF8",
  primaryDark: "#5A38D6",
  success: "#10B981",
  successLight: "#34D399",
  warning: "#F59E0B",
  warningLight: "#FBBF24",
  danger: "#EF4444",
  dangerLight: "#F87171",
  blue: "#3B82F6",
  indigo: "#6366F1",
  pink: "#EC4899",
  teal: "#06B6D4",
  slate: "#64748B",
  requirement: "#6C4DF6",
  present: "#16B8A6",
  total: "#4F7DF3",
};

export const getBarChartOptions = ({
  yStepSize = 20,
  yMax,
  yMin = 0,
  legendPosition = "top",
  legendAlign = "end",
  showGridLines = true,
  stacked = false,
  barPercentage = 0.7,
  categoryPercentage = 0.75,
  yAxisFormatter,
  xAxisFormatter,
} = {}) => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 8,
        bottom: 4,
        left: 4,
        right: 8,
      },
    },
    animation: {
      duration: 800,
      easing: "easeOutQuart",
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: legendPosition,
        align: legendAlign,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          boxWidth: 8,
          boxHeight: 8,
          color: "#475569",
          font: {
            size: 12,
            weight: "600",
            family:
              "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        titleColor: "#F8FAFC",
        bodyColor: "#E2E8F0",
        borderColor: "rgba(255, 255, 255, 0.08)",
        borderWidth: 1,
        padding: {
          top: 10,
          bottom: 10,
          left: 14,
          right: 14,
        },
        cornerRadius: 10,
        boxPadding: 6,
        usePointStyle: true,
        titleFont: {
          size: 12,
          weight: "700",
          family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        },
        bodyFont: {
          size: 12,
          weight: "500",
          family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        },
        callbacks: {
          labelColor: function (context) {
            return {
              borderColor: "transparent",
              backgroundColor: context.dataset.backgroundColor || "#6F4AE7",
              borderRadius: 4,
            };
          },
          ...(yAxisFormatter
            ? {
                label: function (context) {
                  let label = context.dataset.label || "";
                  if (label) label += ": ";
                  if (context.parsed.y !== null) {
                    label += yAxisFormatter(context.parsed.y);
                  }
                  return label;
                },
              }
            : {}),
        },
      },
    },
    scales: {
      x: {
        stacked: stacked,
        grid: {
          display: false,
          drawBorder: false,
          drawTicks: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#64748B",
          font: {
            size: 11,
            weight: "500",
            family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          },
          padding: 8,
          callback: xAxisFormatter ? xAxisFormatter : undefined,
        },
      },
      y: {
        stacked: stacked,
        beginAtZero: yMin === 0,
        min: yMin,
        max: yMax,
        grid: {
          display: showGridLines,
          color: "rgba(226, 232, 240, 0.7)",
          drawBorder: false,
          drawTicks: false,
          borderDash: [4, 4],
          lineWidth: 1,
        },
        border: {
          display: false,
          dash: [4, 4],
        },
        ticks: {
          stepSize: yStepSize,
          color: "#64748B",
          font: {
            size: 11,
            weight: "500",
            family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          },
          padding: 10,
          callback: yAxisFormatter
            ? (value) => yAxisFormatter(value)
            : undefined,
        },
      },
    },
  };
};

/**
 * Helper to build stylized bar dataset with custom thickness and no border radius
 */
export const createBarDataset = ({
  label,
  data,
  color,
  borderRadius = 0,
  barPercentage = 0.7,
  categoryPercentage = 0.75,
  barThickness = 20,
  maxBarThickness = 32,
  stack,
}) => ({
  label,
  data,
  backgroundColor: color,
  hoverBackgroundColor: color,
  borderRadius: borderRadius,
  borderSkipped: false,
  barPercentage,
  categoryPercentage,
  barThickness: barThickness,
  maxBarThickness,
  stack,
});
