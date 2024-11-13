import React from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// URL do GeoJSON para os limites dos municípios de Mato Grosso
const MATO_GROSSO_GEOJSON =
  "https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-51-mun.json?short_path=61d52f3";

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
  grid-template-rows: auto auto;
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  margin: 20px;
`;

const MapContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  background-color: #F5F5F5;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
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
`;

const LargeCard = styled(Card)`
  min-height: 400px;
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
  { name: 'Ativos', value: 400, color: '#1f77b4' },
  { name: 'Aposentados', value: 300, color: '#ff7f0e' },
  { name: 'Afastados', value: 300, color: '#ffbb78' },
];

// Componente principal
const Dashboard = () => {
  return (
    <Container>
      <Header>
        <Logo src="logo_policia_militar.png" alt="Polícia Militar" />
      </Header>
      <MainContent>
        {/* Mapa ocupa duas linhas à esquerda */}
        <MapContainer style={{ height: '500px', width: '90%' }}>
          <Title>Mapa de Comandos Regionais</Title>
          <div style={{ height: '400px', width: '100%' }}>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 3000, center: [-55.0, -12.5] }}
              style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
            >
              <Geographies geography={MATO_GROSSO_GEOJSON}>
                {({ geographies }) =>
                  geographies.map((geo, index) => (
                    <Geography
                      key={index}
                      geography={geo}
                      stroke="#FFFFFF"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: 'none' },
                        hover: { outline: 'none' },
                        pressed: { outline: 'none' },
                      }}
                    />
                  ))
                }
              </Geographies>
            </ComposableMap>
          </div>
        </MapContainer>

        {/* Gráfico de barras abaixo do mapa */}
        <Card style={{ height: '100px', width: '90%' }}>
          <Title>TEXTO 1 - Gráfico de Barras</Title>
          <BarChart width={300} height={200} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#1f77b4" />
          </BarChart>
        </Card>

        {/* Gráficos à direita */}
        <Card>
          <Title>TEXTO 2</Title>
          <BarChart width={300} height={200} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#1f77b4" />
          </BarChart>
        </Card>

        {/* Card maior com gráfico de pizza para "TEXTO 3" */}
        <LargeCard style={{ height: '500px', width: '90%' }}>
          <Title>TEXTO 3</Title>
          <PieChart width={350} height={250}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name }) => name}
              outerRadius={100}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </LargeCard>
      </MainContent>
    </Container>
  );
};

export default Dashboard;
