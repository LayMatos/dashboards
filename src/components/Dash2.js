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

// URL do GeoJSON para os limites dos municípios de Mato Grosso
const MATO_GROSSO_GEOJSON =
  "https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-51-mun.json?short_path=61d52f3";

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
  const getCorPorGrupo = (municipioNome) => {
    if (gruposDeMunicipios.laranja.includes(municipioNome)) return "#FF6347"; // Cor laranja
    if (gruposDeMunicipios.preto.includes(municipioNome)) return "#000000"; // Cor preta
    if (gruposDeMunicipios.azul.includes(municipioNome)) return "#0000FF"; // Cor azul
    if (gruposDeMunicipios.Rosa.includes(municipioNome)) return "#6495ED"; // Cor laranja
    if (gruposDeMunicipios.Crimson.includes(municipioNome)) return "#4169E1"; // Cor preta
    if (gruposDeMunicipios.DarkGreen.includes(municipioNome)) return "#1E90FF"; // Cor azul
  
    if (gruposDeMunicipios.DarkTurquoise.includes(municipioNome)) return "#00BFFF"; // Cor laranja
    if (gruposDeMunicipios.Marrom.includes(municipioNome)) return "#FFD700"; // Cor preta
    if (gruposDeMunicipios.Peru.includes(municipioNome)) return "#20B2AA"; // Cor azul
    if (gruposDeMunicipios.Roxo.includes(municipioNome)) return "#008080"; // Cor laranja
    if (gruposDeMunicipios.RoxoClaro.includes(municipioNome)) return "#006400"; // Cor preta
    if (gruposDeMunicipios.amarelo.includes(municipioNome)) return "#B8860B"; // Cor azul
    if (gruposDeMunicipios.turquesa.includes(municipioNome)) return "#8B008B"; // Cor azul
    if (gruposDeMunicipios.gold.includes(municipioNome)) return "#8B0000"; // Cor azul
    if (gruposDeMunicipios.verde.includes(municipioNome)) return "#556B2F"; // Cor azul
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
    const [selectedData, setSelectedData] = useState(dataPorGrupo.laranja);
  
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
  
    const handleGroupClick = (cor) => {
      const grupo =
        cor === "#FF6347" ? "laranja" :
        // (adicionar mapeamentos para as demais cores)
        null;
  
      if (grupo && dataPorGrupo[grupo]) {
        setSelectedData(dataPorGrupo[grupo]);
      }
    };
  
    if (loading) {
      return <div>Carregando mapa...</div>;
    }
  
    return (
      <div>
        <header style={{ textAlign: "center", padding: "10px", backgroundColor: "#333", color: "#fff" }}>
          <h1>Mapa Interativo de Mato Grosso</h1>
        </header>
  
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "yellow" }}>
            <PieChart width={400} height={400}>
              <Pie data={selectedData.pizza} dataKey="value" outerRadius={150} fill="#8884d8">
                {selectedData.pizza.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={["#FF6347", "#000000", "#0000FF"][index % 3]} />
                ))}
              </Pie>
            </PieChart>
            <BarChart width={400} height={300} data={selectedData.barra}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="valor" fill="#8884d8" />
            </BarChart>
          </div>
  
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 3000,
              center: [-55.0, -12.5],
            }}
            style={{ width: "40%", height: "80%" }}
          >
            <Geographies geography={MATO_GROSSO_GEOJSON}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const municipioNome = geo.properties.name;
                  const cor = getCorPorGrupo(municipioNome);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={cor}
                      stroke="#FFF"
                      onClick={() => handleGroupClick(cor)}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#F53", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
    );
  };
  
  export default MapChart;
