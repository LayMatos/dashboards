import React from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Estilização dos componentes
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #001B49;
`;

const Header = styled.header`
  width: 100%;
  background-color: #001B49;
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const Logo = styled.img`
  height: 60px;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  margin: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const MapContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  background-color: #F5F5F5;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    grid-column: 1 / 2;
    grid-row: 1;
  }
`;

const Card = styled.div`
  background-color: #F5F5F5;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;

  @media (max-width: 768px) {
    width: 100%;
    min-height: 250px;
    margin: 10px;
  }
`;

const ResponsiveCard = styled(Card)`
  grid-column: span 2;

  @media (max-width: 768px) {
    grid-column: span 1;
    margin: 10px;
  }
`;

const Title = styled.h3`
  margin-bottom: 20px;
  text-align: center;
`;

// Dados fictícios para os gráficos
const barData = [
  { name: 'Janeiro', value: 300 },
  { name: 'Fevereiro', value: 200 },
  { name: 'Março', value: 400 },
  { name: 'Abril', value: 150 },
  { name: 'Maio', value: 300 },
];

const pieData = [
  { name: 'Entregues', value: 400, color: '#1f77b4' },
  { name: 'Aguardando assinaturas', value: 300, color: '#ff7f0e' },
  { name: 'Separados para entregas', value: 300, color: '#ffbb78' },
];

// Componente principal
const Dashboard = () => {
  return (
    <Container>
      <Header>
        <Logo src="logo_policia_militar.png" alt="Polícia Militar" />
      </Header>
      <MainContent>
        <MapContainer>
          <Title>TEXTO 1</Title>
          <div style={{ height: '600px', width: '100%' }}>
            <h2>Mapa de Comandos Regionais</h2>
          </div>
        </MapContainer>

        <Card>
          <Title>TEXTO 4</Title>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                label={({ name }) => name}
                outerRadius="80%"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card style={{ gridRow: '2' }}>
          <Title>TEXTO 3</Title>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#1f77b4" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <ResponsiveCard>
          <Title>TEXTO 2</Title>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#1f77b4" />
            </BarChart>
          </ResponsiveContainer>
        </ResponsiveCard>
      </MainContent>
    </Container>
  );
};

export default Dashboard;
