<template>
  <div class="container">
    <div class="card">
      <h1>Nombre del Nodo: {{ node_name }}</h1>
      <h2>Ip: {{ ip_address }}</h2>
      <h3 id="simulated-time">Hora Simulada: {{ simulated_time }}</h3>
      <p>Creación Nodo Hora del Sistema: {{ system_time }}</p>
    </div>
    <div class="logs">
    <h2>Logs de Envío y Recepción de Datos</h2>
    <ul id="logs-list">
      <li v-for="(log, index) in logs" :key="index">{{ log }}</li>
    </ul>
  </div>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      node_name: "",
      ip_address: "",
      simulated_time: "",
      system_time: "",
      logs: [] 
    };
  },
  methods: {},
  mounted(){
    this.socket = io('http://localhost:5003');
    
    this.socket.on('connect', () => {
        console.log('Connected to node client server');
        this.socket.emit('join_vue_clients');
    });

    this.socket.on('disconnect', () => {
        console.log('Disconnected from node client server');
        const event = {
            id: this.events.length + 1,
            timestamp: new Date(),
            description: "Deconnected",
        };
        this.events.unshift(event);
    });

    // Escucha el evento 'node_data' y actualiza las propiedades correspondientes en tus datos
    this.socket.on('node_data', (data) => {
        this.node_name = data.node_name;
        this.ip_address = data.ip_address;
        this.simulated_time = data.simulated_time;
        this.system_time = data.system_time;
    });
     // Escucha los eventos de logs enviados por el servidor y actualiza la matriz de logs
    this.socket.on('log_message', (message) => {
      this.logs.unshift(`[${new Date().toLocaleTimeString()}] ${message}`);
    });
  },
};
</script>


<style>
body {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #f4f4f4;
}

.container {
  margin-top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 70dvh;
}

.card {
  background-color: #000000;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  width: 100%;
  text-align: left;
  margin-bottom: 20px;
}

.card h1 {
  font-size: 24px;
  margin-bottom: 35px;
  color: #ffffff;
}

.card h2 {
  font-size: 18px;
  margin-bottom: 8px;
  color: #169426;
}

.card h3 {
  font-size: 16px;
  color: #e1e3e1;
}

.card p {
  font-size: 10px;
  color: #e1e3e1;
}

.logs {
  max-width: 500px;
  width: 100%;
  text-align: left;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.logs h2 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.logs ul {
  list-style-type: none;
  padding: 0;
  margen: 0;
  font-size: 12px;
}

.logs li {
  margin-bottom: 5px;
}
</style>
