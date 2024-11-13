import React, { useState } from 'react';
import { Doughnut, Bar, Pie } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement, Legend, Tooltip } from 'chart.js';

Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, Legend, Tooltip);

const doughnutData = {
  labels: ['Guarda roupas', 'Cadeiras', 'Armário aéreo', 'Cama', 'Mesa', 'Armário de cozinha'],
  datasets: [
    {
      data: [31.47, 6.42, 7.07, 10.45, 29.53, 15.06],
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#66BB6A', '#FF8A65', '#BA68C8'],
    },
  ],
};

const pieDataStatusEstoque = {
  labels: ['Em estoque', 'Separado para entrega', 'Entregues'],
  datasets: [
    {
      data: [50, 30, 20],
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
    },
  ],
};

const pieDataStatusCautela = {
  labels: ['Assinados', 'Aguardando assinatura', 'Descautela'],
  datasets: [
    {
      data: [40, 35, 25],
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
    },
  ],
};

const barDataMonthly = {
  labels: ['CR-1', 'CR-2', 'CR-3', 'CR-4', 'CR-5', 'CR-6', 'CR-7', 'CR-8', 'CR-9', 'CR-10', 'CR-11', 'CR-12', 'CR-13', 'CR-14', 'CR-15'],
  datasets: [
    {
      label: 'Computador',
      data: [10, 20, 15, 25, 30, 20, 18, 24, 29, 27, 23, 30, 18, 22, 25],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Notebook',
      data: [8, 18, 13, 22, 26, 17, 15, 20, 25, 23, 20, 27, 15, 19, 21],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    },
    {
      label: 'Nobreak',
      data: [12, 22, 16, 24, 28, 22, 19, 26, 31, 29, 25, 32, 17, 24, 26],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ],
};

const comandosRegionaisOptions = ['CR-1', 'CR-2', 'CR-3', 'CR-4', 'CR-5', 'CR-6', 'CR-7', 'CR-8', 'CR-9', 'CR-10', 'CR-11', 'CR-12', 'CR-13', 'CR-14', 'CR-15'];
const unidadesOptions = ['Unidade 1', 'Unidade 2', 'Unidade 3', 'Unidade 4', 'Unidade 5'];

const Dashboard = () => {
  const [selectedComando, setSelectedComando] = useState('');
  const [selectedUnidade, setSelectedUnidade] = useState('');

  const filteredBarData = {
    ...barDataMonthly,
    labels: barDataMonthly.labels.filter(label => !selectedComando || label === selectedComando),
    datasets: barDataMonthly.datasets.map(dataset => ({
      ...dataset,
      data: dataset.data.slice(0, selectedComando ? 1 : dataset.data.length),
    })),
  };

  return (
    <div>
      <header style={styles.header}>
        <img src="/path/to/logo-left.png" alt="Logo Esquerda" style={styles.headerLogoLeft} />
        <h1 style={styles.headerText}>Gestão de Equipamentos de TI</h1>
        <img src="/path/to/logo-right.png" alt="Logo Direita" style={styles.headerLogoRight} />
      </header>

      {/* Dropdowns para filtros - fixado no canto superior esquerdo */}
      <div style={styles.filterContainer}>
        <label>
          Comando Regional:
          <select value={selectedComando} onChange={(e) => setSelectedComando(e.target.value)}>
            <option value="">Todos</option>
            {comandosRegionaisOptions.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label>
          Unidade:
          <select value={selectedUnidade} onChange={(e) => setSelectedUnidade(e.target.value)}>
            <option value="">Todas</option>
            {unidadesOptions.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div style={styles.container}>
        <div style={styles.chartContainer}>
          <h3>Quantitativo de Equipamentos</h3>
          <Doughnut data={doughnutData} />
        </div>

        <div style={styles.smallChartContainer}>
          <h3>Status Atual do Estoque</h3>
          <Pie data={pieDataStatusEstoque} />
        </div>
        <div style={styles.smallChartContainer}>
          <h3>Status Cautela</h3>
          <Pie data={pieDataStatusCautela} />
        </div>

        <div style={styles.fullWidthChartContainer}>
          <h3>Pagamentos Mensais por CR</h3>
          <Bar data={filteredBarData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      <footer style={styles.footer}>
        <img src="/path/to/central-logo.png" alt="Logo Central" style={styles.footerLogo} />
      </footer>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    background: 'linear-gradient(to right, #00008B, white, #00008B)',
  },
  headerText: {
    color: 'white',
    textShadow: '1px 1px 2px black',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  headerLogoLeft: {
    height: '50px',
    width: '50px',
  },
  headerLogoRight: {
    height: '50px',
    width: '50px',
  },
  filterContainer: {
    position: 'fixed',
    top: '80px', // abaixo do header
    left: '20px',
    backgroundColor: 'white',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    zIndex: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: '80px', // espaçamento para evitar sobreposição com o filtro
  },
  chartContainer: {
    width: '20%',
    margin: '10px',
    minWidth: '280px',
  },
  smallChartContainer: {
    width: '20%',
    margin: '10px',
    minWidth: '250px',
  },
  fullWidthChartContainer: {
    width: '90%',
    margin: '20px',
    minWidth: '300px',
    height: '400px',
  },
  footer: {
    position: 'relative',
    padding: '30px 20px',
    background: 'linear-gradient(to top, #00008B, white)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  footerLogo: {
    position: 'absolute',
    top: '-40px',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
  },
};

export default Dashboard;
