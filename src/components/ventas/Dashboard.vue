<template>
  <div>
    <div class="mt-10 flex justify-center" >
        <canvas class="max-w-7xl" id="graficoBarras" width="400" height="400"></canvas>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";

export default {
  data() {
    return {
      ventas: [],
      categorias: [],
    };
  },

  methods: {
    getVentas() {
      try {
        axios.get("http://localhost:8080/api/getVentas/").then((res) => {
          this.ventas = res.data;
        });
      } catch (error) {
        console.error(error);
      }
    },

    getCategorias() {
      try {
        axios.get("http://localhost:8080/api/getCategorias/").then((res) => {
          this.categorias = res.data;
          console.log(this.categorias);
          this.getVentasCategoria();
        });
      } catch (error) {
        console.error(error);
      }
    },

    getVentasCategoria() {
      const conteoVentasPorCategoria = {};

      // Iterar sobre las ventas y contar las ventas por categoría
      this.ventas.forEach((venta) => {
        const categoria = this.categorias.find(
          (c) => c.id === venta.idcategoria
        );
        if (categoria) {
          const nombreCategoria = categoria.categoria;
          if (conteoVentasPorCategoria[nombreCategoria]) {
            // Si la categoría ya existe en el objeto, incrementa el contador
            conteoVentasPorCategoria[nombreCategoria]++;
          } else {
            // Si la categoría no existe en el objeto, inicializa el contador en 1
            conteoVentasPorCategoria[nombreCategoria] = 1;
          }
        }
      });

      // Mostrar el conteo de ventas por categoría
      this.showChart(conteoVentasPorCategoria);
    },

    showChart(ventasPorCategoria) {
      // Extraer las etiquetas (nombres de categoría) y los datos (número de ventas) del objeto ventasPorCategoria
      const etiquetas = Object.keys(ventasPorCategoria);
      const datos = Object.values(ventasPorCategoria);

      // Configurar el gráfico de barras con Chart.js
      const ctx = document.getElementById("graficoBarras").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: etiquetas,
          datasets: [
            {
              label: "Ventas por categoría",
              backgroundColor: "#36A2EB", // Color de las barras
              data: datos,
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
    this.getVentas();
    this.getCategorias();
  },
};
</script>
