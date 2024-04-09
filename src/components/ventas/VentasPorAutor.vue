<template>
    <div>
      <div class="mt-10 flex justify-center" >
          <canvas class="max-w-6xl" id="graficoBarrasAutor" width="400" height="400"></canvas>
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
        autores: [],
        conteoVentasPorAutor: {}
      };
    },

    mounted() {
      this.getVentas();
      
    },
  
    methods: {
      getVentas() {
        
        try {
          axios.get("http://localhost:8080/api/getVentas/").then((res) => {
            this.ventas = res.data.ventas;
            this.getAutores()
          });
        } catch (error) {
          console.error(error);
        }
      },
  
      getAutores() {
        
        try {
          axios.get("http://localhost:8080/api/getAutores/").then((res) => {
            this.autores = res.data;
           this.getVentasAutor()
          });
        } catch (error) {
          console.error(error);
        }
      },
  
      getVentasAutor() {
        
        // Iterar sobre las ventas y contar las ventas por categoría
        this.ventas.forEach((venta) => {
          const autor = this.autores.find(
            (a) => a.id === venta.idautor
          );
          if (autor) {
            const nombreAutor = autor.autor;
            if (this.conteoVentasPorAutor[nombreAutor]) {
              // Si la categoría ya existe en el objeto, incrementa el contador
             this.conteoVentasPorAutor[nombreAutor]++;
            } else {
              // Si la categoría no existe en el objeto, inicializa el contador en 1
              this.conteoVentasPorAutor[nombreAutor] = 1;
            }
          }

        });

        this.showChart()
  
        // Mostrar el conteo de ventas por categoría
      },
  
      showChart() {
        // Extraer las etiquetas (nombres de categoría) y los datos (número de ventas) del objeto ventasPorAutor
        const etiquetas = Object.keys(this.conteoVentasPorAutor);
        const datos = Object.values(this.conteoVentasPorAutor);
  
        // Configurar el gráfico de barras con Chart.js
        const ctx = document.getElementById("graficoBarrasAutor").getContext("2d");
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: etiquetas,
            datasets: [
              {
                label: "Ventas por autor",
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
  