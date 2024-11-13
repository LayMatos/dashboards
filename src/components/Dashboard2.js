import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import styled from 'styled-components';


// URL do GeoJSON para os limites dos municípios de Mato Grosso
const MATO_GROSSO_GEOJSON =
  "https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-51-mun.json?short_path=61d52f3";

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


// Definindo os grupos de municípios e suas cores
const gruposDeMunicipios = {
    laranja: [
      "Acorizal", "Rosário Oeste", "Nobres", "Jangada", "Várzea Grande",
      "Nossa Senhora do Livramento", "Poconé", "Chapada dos Guimarães"
    ],
    preto: [
      "Cáceres", 
      "Porto Esperidião", 
      "Curvelândia", 
      "Mirassol d'Oeste", 
      "Glória D'Oeste", 
      "São José dos Quatro Marcos", 
      "Indiavaí", 
      "Araputanga",
      "Reserva do Cabaçal",
      "Salto do Céu",
      "Lambari D'Oeste",
      "Rio Branco",
    ],
    azul: [
      "Comodoro", 
      "Campos de Júlio", 
      "Nova Lacerda", 
      "Conquista D'Oeste", 
      "Vale de São Domingos", 
      "Vila Bela da Santíssima Trindade", 
      "Pontes e Lacerda", 
      "Jauru",
      "Figueirópolis D'Oeste",
      "Rondolândia",
    ],
    Rosa : [
      "Porto Estrela", 
      "Barra do Bugres", 
      "Nova Olímpia", 
      "Denise", 
      "Tangará da Serra", 
      "Campo Novo do Parecis", 
      "Sapezal", 
      "Brasnorte",
   ],
   Roxo : [
      "Tabaporã", 
      "Porto dos Gaúchos", 
      "Novo Horizonte do Norte", 
      "Juara", 
      "Castanheira", 
      "Juruena", 
      "Juína", 
      "Cotriguaçu",
      "Aripuanã",
      "Colniza"
   ],
   Marrom : [
      "Apiacás", 
      "Nova Bandeirantes", 
      "Nova Monte Verde", 
      "Paranaíta", 
      "Alta Floresta", 
      "Carlinda", 
      "Nova Canaã do Norte", 
      "Colíder",
   ],
   RoxoClaro : [
      "Novo Mundo", 
      "Nova Guarita", 
      "Guarantã do Norte", 
      "Matupá", 
      "Peixoto de Azevedo", 
      "Terra Nova do Norte", 
      "Nova Santa Helena", 
      "Marcelândia",
      "Itaúba",
   ],
   gold : [
      "Cláudia", 
      "União do Sul", 
      "Feliz Natal", 
      "Sinop", 
      "Ipiranga do Norte", 
      "Vera", 
      "Sorriso", 
      "Nova Ubiratã",
      "Itaúba",
      "Santa Carmem"
   ],
   Peru : [
      "Vila Rica", 
      "Santa Cruz do Xingu", 
      "Confresa", 
      "Santa Terezinha", 
      "São José do Xingu", 
      "Porto Alegre do Norte", 
      "Luciara", 
      "Canabrava do Norte",
      "São Félix do Araguaia",
      "Alto Boa Vista",
      "Serra Nova Dourada",
      "Novo Santo Antônio",
      "Bom Jesus do Araguaia"
   ],
   Crimson : [
      "Querência", 
      "Ribeirão Cascalheira", 
      "Canarana", 
      "Cocalinho", 
      "Água Boa", 
      "Nova Nazaré", 
      "Campinápolis", 
      "Nova Xavantina",
   ],
   DarkGreen : [
      "Araguaiana", 
      "Barra do Garças", 
      "Novo São Joaquim", 
      "General Carneiro", 
      "Pontal do Araguaia", 
      "Torixoréu", 
      "Ribeirãozinho", 
   ],
   DarkTurquoise : [
      "Tesouro", 
      "Guiratinga", 
      "Araguainha", 
      "Alto Garças", 
      "Alto Araguaia", 
      "Alto Taquari", 
      "Itiquira", 
      "Pedra Preta",
      "São José do Povo",
      "Rondonópolis",
      "Juscimeira",
      "Jaciara",
      "São Pedro da Cipa",
      "Dom Aquino",
      "Ponte Branca"
   ],
   amarelo : [
      "Barão de Melgaço", 
      "Santo Antônio do Leverger", 
      "Cuiabá", 
      "Chapada dos Guimarães", 
      "Nova Brasilândia", 
      "Planalto da Serra"
   ],
   verde : [
      "Poxoréo", 
      "Campo Verde", 
      "Primavera do Leste", 
      "Santo Antônio do Leste", 
      "Paranatinga", 
      "Gaúcha do Norte"
   ],
   turquesa : [
      "Itanhangá", 
      "Tapurah", 
      "Lucas do Rio Verde", 
      "Nova Maringá", 
      "São José do Rio Claro", 
      "Nova Mutum",
      "Santa Rita do Trivelato",
      "Diamantino",
      "Nova Marilândia",
      "Santo Afonso",
      "Nortelândia",
      "Arenápolis",
      "Alto Paraguai",
      "Nortelândia"
   ],
  };
  
  // Função para retornar a cor com base no grupo do município
 // Função para retornar a cor com base no grupo do município
const getCorPorGrupo = (municipioNome) => {
    if (gruposDeMunicipios.laranja.includes(municipioNome)) return "#ADD8E6"; // Azul claro
    if (gruposDeMunicipios.preto.includes(municipioNome)) return "#4682B4"; // Azul aço
    if (gruposDeMunicipios.azul.includes(municipioNome)) return "#1E90FF"; // Azul dodger
    if (gruposDeMunicipios.Rosa.includes(municipioNome)) return "#87CEFA"; // Azul claro (skyblue)
    if (gruposDeMunicipios.Crimson.includes(municipioNome)) return "#5F9EA0"; // Azul esverdeado (cadetblue)
    if (gruposDeMunicipios.DarkGreen.includes(municipioNome)) return "#6495ED"; // Azul moderado (cornflowerblue)
    if (gruposDeMunicipios.DarkTurquoise.includes(municipioNome)) return "#00CED1"; // Turquesa escuro
    if (gruposDeMunicipios.Marrom.includes(municipioNome)) return "#4682B4"; // Azul aço
    if (gruposDeMunicipios.Peru.includes(municipioNome)) return "#20B2AA"; // Azul escuro (lightseagreen)
    if (gruposDeMunicipios.Roxo.includes(municipioNome)) return "#0000CD"; // Azul médio (mediumblue)
    if (gruposDeMunicipios.RoxoClaro.includes(municipioNome)) return "#4169E1"; // Azul real
    if (gruposDeMunicipios.amarelo.includes(municipioNome)) return "#1E90FF"; // Azul dodger
    if (gruposDeMunicipios.turquesa.includes(municipioNome)) return "#4682B4"; // Azul aço
    if (gruposDeMunicipios.gold.includes(municipioNome)) return "#5F9EA0"; // Azul esverdeado (cadetblue)
    if (gruposDeMunicipios.verde.includes(municipioNome)) return "#1E90FF"; // Azul dodger
    return "#D0D0D0"; // Cor padrão para municípios não classificados
  };
  

// Dados de exemplo para os gráficos de cada grupo
// Dados de exemplo para os gráficos de cada grupo
const dataPorGrupo = {
    laranja: {
      pizza: [{ name: "Categoria A", value: 200 }, { name: "Categoria B", value: 150 }],
      barra: [{ name: "Jan", valor: 200 }, { name: "Feb", valor: 100 }],
    },
    preto: {
      pizza: [{ name: "Categoria A", value: 100 }, { name: "Categoria B", value: 180 }],
      barra: [{ name: "Jan", valor: 150 }, { name: "Feb", valor: 200 }],
    },
    azul: {
      pizza: [{ name: "Categoria A", value: 300 }, { name: "Categoria B", value: 120 }],
      barra: [{ name: "Jan", valor: 100 }, { name: "Feb", valor: 300 }],
    },
    Rosa: {
      pizza: [{ name: "Categoria A", value: 130 }, { name: "Categoria B", value: 90 }],
      barra: [{ name: "Jan", valor: 140 }, { name: "Feb", valor: 120 }],
    },
    Crimson: {
      pizza: [{ name: "Categoria A", value: 80 }, { name: "Categoria B", value: 60 }],
      barra: [{ name: "Jan", valor: 70 }, { name: "Feb", valor: 60 }],
    },
    DarkGreen: {
      pizza: [{ name: "Categoria A", value: 50 }, { name: "Categoria B", value: 110 }],
      barra: [{ name: "Jan", valor: 60 }, { name: "Feb", valor: 90 }],
    },
    DarkTurquoise: {
      pizza: [{ name: "Categoria A", value: 250 }, { name: "Categoria B", value: 150 }],
      barra: [{ name: "Jan", valor: 180 }, { name: "Feb", valor: 160 }],
    },
    Marrom: {
      pizza: [{ name: "Categoria A", value: 170 }, { name: "Categoria B", value: 100 }],
      barra: [{ name: "Jan", valor: 130 }, { name: "Feb", valor: 140 }],
    },
    Peru: {
      pizza: [{ name: "Categoria A", value: 90 }, { name: "Categoria B", value: 180 }],
      barra: [{ name: "Jan", valor: 100 }, { name: "Feb", valor: 200 }],
    },
    Roxo: {
      pizza: [{ name: "Categoria A", value: 220 }, { name: "Categoria B", value: 170 }],
      barra: [{ name: "Jan", valor: 150 }, { name: "Feb", valor: 130 }],
    },
    RoxoClaro: {
      pizza: [{ name: "Categoria A", value: 60 }, { name: "Categoria B", value: 70 }],
      barra: [{ name: "Jan", valor: 55 }, { name: "Feb", valor: 75 }],
    },
    amarelo: {
      pizza: [{ name: "Categoria A", value: 180 }, { name: "Categoria B", value: 200 }],
      barra: [{ name: "Jan", valor: 190 }, { name: "Feb", valor: 210 }],
    },
    turquesa: {
      pizza: [{ name: "Categoria A", value: 240 }, { name: "Categoria B", value: 130 }],
      barra: [{ name: "Jan", valor: 150 }, { name: "Feb", valor: 180 }],
    },
    gold: {
      pizza: [{ name: "Categoria A", value: 110 }, { name: "Categoria B", value: 140 }],
      barra: [{ name: "Jan", valor: 130 }, { name: "Feb", valor: 160 }],
    },
    verde: {
      pizza: [{ name: "Categoria A", value: 100 }, { name: "Categoria B", value: 190 }],
      barra: [{ name: "Jan", valor: 120 }, { name: "Feb", valor: 170 }],
    },
  };
  

const MapChart = () => {
  const [geographies, setGeographies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedData, setSelectedData] = useState(dataPorGrupo.laranja); // Define dados do grupo selecionado

  useEffect(() => {
    fetch(MATO_GROSSO_GEOJSON)
      .then((response) => response.json())
      .then((data) => {
        setGeographies(data.features);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar o GeoJSON", error);
        setLoading(false);
      });
  }, []);

  // Função de clique para atualizar os dados com base na cor selecionada
 // Função de clique para atualizar os dados com base na cor selecionada
 const handleGroupClick = (cor) => {
  const grupo = {
    "#ADD8E6": "laranja",           // Azul claro
    "#4682B4": "preto",             // Azul aço
    "#1E90FF": "azul",              // Azul dodger
    "#87CEFA": "Rosa",              // Azul claro (skyblue)
    "#5F9EA0": "Crimson",           // Azul esverdeado (cadetblue)
    "#6495ED": "DarkGreen",         // Azul moderado (cornflowerblue)
    "#00CED1": "DarkTurquoise",     // Turquesa escuro
    "#FFD700": "Marrom",            // Azul aço
    "#20B2AA": "Peru",              // Azul escuro (lightseagreen)
    "#0000CD": "Roxo",              // Azul médio (mediumblue)
    "#4169E1": "RoxoClaro",         // Azul real
    "#1E90FF": "amarelo",           // Azul dodger
    "#4682B4": "turquesa",          // Azul aço
    "#5F9EA0": "gold",              // Azul esverdeado (cadetblue)
    "#1E90FF": "verde"              // Azul dodger
  }[cor];

  if (grupo && dataPorGrupo[grupo]) {
    setSelectedData(dataPorGrupo[grupo]);
  }
};
  

  if (loading) {
    return <div>Carregando mapa...</div>;
  }

  return (
    <div style={{ padding: '0', margin: '0', maxWidth: '100vw' }}>
    {/* Header */}
    <header
      style={{
        textAlign: 'center',
        padding: '1rem 0', // Remove padding lateral
        background: 'radial-gradient(circle, #87CEEB, #000080)',
        color: '#fff',
        width: '100%', // Ocupa toda a largura
      }}
    >
      <h1>Mapa Interativo de Mato Grosso</h1>
    </header>

    {/* Conteúdo principal com o mapa e gráficos */}
    <div
      className="mapContainer"
      style={{
        display: 'grid',
        gap: '1rem',
        alignItems: 'center',
      }}
    >
     
      {/* Mapa */}
      <div className="mapWrapper" style={{ justifyContent: 'center', backgroundColor: "green", width:"60vw", height:"90vh", padding:"1rem" }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 3500, center: [-55.0, -12.5] }}
          style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
        >
          <Geographies geography={MATO_GROSSO_GEOJSON}>
            {({ geographies }) =>
              geographies.map((geo, index) => {
                const fillColor = getCorPorGrupo(geo.properties.name);
                return (
                  <Geography
                    key={index}
                    geography={geo}
                    fill={fillColor}
                    onClick={() => fillColor && handleGroupClick(fillColor)}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      {/* Gráficos de Barra */}
      <div className="barCharts" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor:"red" }}>
           <Card>
          <Title>TEXTO 3</Title>
          <BarChart width={300} height={200} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#1f77b4" />
          </BarChart>
        </Card>

      </div>

      
    </div>

    {/* Footer */}
    <footer
  style={{
    textAlign: 'center',
    padding: '1rem 0', // Remove padding lateral
    background: 'radial-gradient(circle, #87CEEB, #000080)',
    position: 'fixed',
    color: '#fff',
    bottom: 0, // Alinha o footer no final da página
    width: '100%', // Ocupa toda a largura
    zIndex: 10, // Garante que o footer fique sobre outros elementos, se necessário
  }}
>
  <img
    src="/logo.jpg"
    alt="Logo"
    style={{
      width: '60px',
      position: 'absolute',
      top: '-30px',
      left: '50%',
      transform: 'translateX(-50%)',
      borderRadius: '30px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.7)',
    }}
  />
  <p style={{ marginTop: '1.5rem' }}>
    &copy; 2024 Mapa Interativo - Todos os direitos reservados.
  </p>
</footer>

    {/* Estilos responsivos usando CSS inline */}
    <style jsx>{`
      @media (min-width: 1024px) {
        .mapContainer {
          grid-template-columns: 1fr 2fr 1fr;
        }
      }

      @media (max-width: 768px) {
        header, footer, .mapContainer {
          padding: 0.5rem;
          font-size: 0.9rem;
        }

        h1 {
          font-size: 1.5rem;
        }

        h4 {
          font-size: 1rem;
        }

        .pizzaCharts {
          width: 100%;
          height: auto;
        }

        .mapWrapper {
          grid-template-columns: 1fr;
          justify-content: center;
          width: 100%;
        }
        
        .barCharts {
          display: none;
        }
      }
    `}</style>
</div>


  );
};

export default MapChart;
