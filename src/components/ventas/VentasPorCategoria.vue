<template>
    <div>
      <div class="mt-10 flex justify-center" >
          <canvas class="max-w-6xl" id="graficoBarrasCategoria" width="400" height="400"></canvas>
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
        conteoVentasPorCategoria: {}
      };
    },

    mounted() {
      this.getVentas();
    },
  
    methods: {
      getVentas() {
        try {
          axios.get("http://localhost:8080/api/getVentas/").then((res) => {
            this.ventas = res.data;
            this.getCategorias()
          });
        } catch (error) {
          console.error(error);
        }
      },
  
      getCategorias() {
        try {
          axios.get("http://localhost:8080/api/getCategorias/").then((res) => {
            this.categorias = res.data;
            this.getVentasCategoria();
          });
        } catch (error) {
          console.error(error);
        }
      },
  
      getVentasCategoria() {
  
        // Iterar sobre las ventas y contar las ventas por categoría
        this.ventas.forEach((venta) => {
          const categoria = this.categorias.find(
            (c) => c.id === venta.idcategoria
          );
          if (categoria) {
            const nombreCategoria = categoria.categoria;
            if (this.conteoVentasPorCategoria[nombreCategoria]) {
              // Si la categoría ya existe en el objeto, incrementa el contador
              this.conteoVentasPorCategoria[nombreCategoria]++;
            } else {
              // Si la categoría no existe en el objeto, inicializa el contador en 1
              this.conteoVentasPorCategoria[nombreCategoria] = 1;
            }
          }
        });
  
        // Mostrar el conteo de ventas por categoría
        this.showChart();
      },
  
      showChart() {
        // Extraer las etiquetas (nombres de categoría) y los datos (número de ventas) del objeto ventasPorCategoria
        const etiquetas = Object.keys(this.conteoVentasPorCategoria);
        const datos = Object.values(this.conteoVentasPorCategoria);
  
        // Configurar el gráfico de barras con Chart.js
        const ctx = document.getElementById("graficoBarrasCategoria").getContext("2d");
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
  
    
  };
  </script>
  