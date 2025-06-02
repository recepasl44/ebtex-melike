export function generateChartOptions(): any {
    return {
        chart: {
            redrawOnWindowResize: true,
            height: 315,
            type: "bar",
            toolbar: {
                show: false,
            },
            dropShadow: {
                enabled: true,
                enabledOnSeries: undefined,
                top: 7,
                left: 0,
                blur: 1,
                color: ["transparent", "transparent", "rgb(227, 84, 212)"],
                opacity: 0.05,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "18%",
                borderRadius: 2,
            },
        },
        grid: {
            borderColor: "#f1f1f1",
            strokeDashArray: 3,
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: [0, 2, 2],
            curve: "smooth",
        },
        legend: {
            show: true,
            fontSize: "12px",
            position: "bottom",
            horizontalAlign: "center",
            fontWeight: 500,
            height: 40,
            offsetX: 0,
            offsetY: 10,
            labels: {
                colors: "#9ba5b7",
            },
            markers: {
                width: 7,
                height: 7,
                shape: "circle",
                size: 3.5,
                strokeWidth: 0,
                strokeColor: "#fff",
                fillColors: undefined,
                radius: 12,
                offsetX: 0,
                offsetY: 0,
            },
        },
        colors: [
            "#4461FD",
            "#E354D4",
        ],
        yaxis: {
            title: {
                style: {
                    color: "#adb5be",
                    fontSize: "14px",
                    fontFamily: "poppins, sans-serif",
                    fontWeight: 600,
                    cssClass: "apexcharts-yaxis-label",
                },
            },
            labels: {
                formatter: function (y: number) {
                    return y.toFixed(0) + "";
                },
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: "11px",
                    fontWeight: 600,
                    cssClass: "apexcharts-xaxis-label",
                },
            },
        },
        xaxis: {
            type: "category",
            categories: [
                "Ocak",
                "Şub",
                "Mar",
                "Nis",
                "May",
                "Haz",
                "Tem",
                "Agu",
                "Eyl",
                "Eki",
                "Kas",
                "Ara",
            ],
            axisBorder: {
                show: true,
                color: "rgba(119, 119, 142, 0.05)",
                offsetX: 0,
                offsetY: 0,
            },
            axisTicks: {
                show: true,
                borderType: "solid",
                color: "rgba(119, 119, 142, 0.05)",
                width: 6,
                offsetX: 0,
                offsetY: 0,
            },
            labels: {
                rotate: -90,
                style: {
                    colors: "#8c9097",
                    fontSize: "11px",
                    fontWeight: 600,
                    cssClass: "apexcharts-xaxis-label",
                },
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y: number) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + "%";
                    }
                    return y;
                },
            },
        },
        fill: {
            colors: undefined,
            opacity: [0.7, 0.6],
            gradient: {
                shade: "light",
                type: "horizontal",
                shadeIntensity: 0.5,
                gradientToColors: ["#fdc530"],
                inverseColors: true,
                opacityFrom: 0.35,
                opacityTo: 0.05,
                stops: [0, 50, 100],
                colorStops: ["#fdc530"],
            },
        },
    };
}