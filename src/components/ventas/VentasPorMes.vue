<template>
  <div>
    <div class="flex justify-center">
      <canvas
        class="max-w-6xl"
        id="graficoVentasMeses"
        width="400"
        height="400"
      ></canvas>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";

export default {
  data() {
    return {
      recibos: [],
    };
  },

  methods: {
    getRecibos() {
      try {
        axios.get("http://localhost:8080/api/getRecibos/").then((res) => {
          this.recibos = res.data.recibos;
          this.getVentasMes();
        });
      } catch (error) {
        console.error(error);
      }
    },

    getVentasMes() {
      const ventasPorMes = {};

      // Iterar sobre las ventas y contar las ventas por categoría
      this.recibos.forEach((recibo) => {
        const fechaVenta = new Date(recibo.fecha);
        const añoVenta = fechaVenta.getFullYear();
        const mesVenta = fechaVenta.getMonth() + 1; // Obtener el número de mes (enero es 0, febrero es 1, etc.)

        const claveMes = `${añoVenta}-${mesVenta.toString().padStart(2, "0")}`; // Formar una clave para identificar el mes (por ejemplo, "2024-01" para enero de 2024)
        if (ventasPorMes[claveMes]) {
          // Si el mes ya existe en el objeto, incrementa el contador
          ventasPorMes[claveMes]++;
        } else {
          // Si el mes no existe en el objeto, inicializa el contador en 1
          ventasPorMes[claveMes] = 1;
        }
      });

      // Mostrar el conteo de ventas por categoría
      this.showChart(ventasPorMes);
    },

    showChart(ventasPorMes) {
      // Nombres de los meses
      const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];

      // Extraer las etiquetas (meses) y los datos (número de ventas) del objeto ventasPorMes
      const etiquetasMeses = Object.keys(ventasPorMes).map((clave) => {
        const [año, mes] = clave.split("-");
        return `${meses[parseInt(mes) - 1]} ${año}`;
      });
      const datosVentasMeses = Object.values(ventasPorMes);

      // Configurar el gráfico de barras con Chart.js
      const ctx = document
        .getElementById("graficoVentasMeses")
        .getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: etiquetasMeses,
          datasets: [
            {
              label: "Ventas Mensuales",
              backgroundColor: "#36A2EB", 
              data: datosVentasMeses,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },

  mounted() {
    this.getRecibos();
  },
};
</script>
