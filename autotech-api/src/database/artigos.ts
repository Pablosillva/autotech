export type Artigo = {
  slug: string;
  titulo: string;
  descricao: string;
  categoria: string; // "mecanica", "funilaria", etc.
  tempoLeitura: string;
  visualizacoes: string;
  imagem: string;
  conteudo: string; // texto do artigo
  autor: string;
  data: string;
};

export const artigos: Artigo[] = [
  {
    slug: "como-trocar-correia-dentada",
    titulo: "Como trocar a correia dentada do motor",
    descricao:
      "Passo a passo completo para realizar a troca da correia dentada com segurança.",
    categoria: "mecanica",
    tempoLeitura: "12 min de leitura",
    visualizacoes: "18,4k",
    imagem: "/artigo-correia.png",
    autor: "Carlos Silva",
    data: "10/09/2026",
    conteudo: `
A correia dentada é uma das peças mais importantes do motor. Ela sincroniza o movimento do virabrequim com o comando de válvulas, garantindo que o motor funcione corretamente.

## Quando trocar?

A recomendação geral é trocar a correia dentada a cada 60.000 km ou 5 anos, o que vier primeiro. Sempre consulte o manual do seu veículo.

## Ferramentas necessárias

- Chave de boca
- Chave catraca
- Macaco hidráulico
- Cavalete de segurança
- Kit de correia nova

## Passo a passo

1. Desconecte o terminal negativo da bateria.
2. Remova as tampas de proteção da correia.
3. Marque a posição dos componentes.
4. Solte o tensor da correia.
5. Remova a correia antiga.
6. Instale a correia nova seguindo as marcas.
7. Ajuste o tensor.
8. Monte tudo de volta.

## Cuidados importantes

Nunca force a correia. Se estiver difícil de encaixar, algo está errado. Consulte um profissional se tiver dúvidas.
    `,
  },
  {
    slug: "pintura-automotiva-preparo-acabamento",
    titulo: "Pintura automotiva: do preparo ao acabamento",
    descricao:
      "Tudo sobre o processo de pintura e como conseguir um resultado profissional.",
    categoria: "funilaria",
    tempoLeitura: "10 min de leitura",
    visualizacoes: "12,7k",
    imagem: "/artigo-pintura.png",
    autor: "Ana Costa",
    data: "08/09/2026",
    conteudo: `
Uma pintura automotiva bem feita dura anos. Mas o segredo não está só na tinta — está em todo o preparo antes dela.

## Etapas da pintura

### 1. Limpeza e desmontagem
Retire peças que não devem ser pintadas (faróis, maçanetas, etc).

### 2. Lixamento
Lixe toda a superfície para garantir aderência. Comece com lixa grossa e vá para a fina.

### 3. Aplicação de massa
Corrija imperfeições com massa automotiva.

### 4. Primer
Aplique o primer para uniformizar a superfície.

### 5. Tinta base
Aplique a tinta em camadas finas, respeitando o tempo de secagem.

### 6. Verniz
O verniz protege a tinta e dá o brilho.

### 7. Polimento
Finalize com polimento para um acabamento espelhado.
    `,
  },
  {
    slug: "codigos-obd2-o-que-significam",
    titulo: "Códigos OBD2: o que significam e como resolver",
    descricao:
      "Entenda os principais códigos de erro e como corrigir cada um.",
    categoria: "diagnostico",
    tempoLeitura: "8 min de leitura",
    visualizacoes: "22,1k",
    imagem: "/artigo-obd2.png",
    autor: "Roberto Lima",
    data: "05/09/2026",
    conteudo: `
O OBD2 (On-Board Diagnostics 2) é o sistema de diagnóstico de bordo presente em todos os carros fabricados após 1996.

## Como funciona?

O sistema monitora diversos sensores do carro. Quando algo está fora do padrão, ele aciona a luz "Check Engine" e grava um código de erro.

## Principais códigos

- **P0100** — Problema no sensor MAF
- **P0300** — Falha de ignição em vários cilindros
- **P0420** — Eficiência do catalisador abaixo do limite
- **P0171** — Mistura pobre (banco 1)

## Como ler os códigos

Você pode usar um scanner OBD2 simples. Basta conectá-lo na porta OBD (geralmente embaixo do volante) e ler os códigos.

## O que fazer?

Nem todo código indica um problema grave. Alguns são resolvidos só apagando e monitorando. Mas códigos de falha de ignição, por exemplo, exigem ação imediata.
    `,
  },
  {
    slug: "quando-trocar-oleo-motor",
    titulo: "Quando trocar o óleo do motor?",
    descricao:
      "Veja os intervalos ideais e os melhores tipos de óleo para cada veículo.",
    categoria: "mecanica",
    tempoLeitura: "6 min de leitura",
    visualizacoes: "15,6k",
    imagem: "/artigo-oleo.png",
    autor: "Pedro Almeida",
    data: "02/09/2026",
    conteudo: `
A troca de óleo é a manutenção mais básica e mais importante do motor.

## Intervalo recomendado

A regra geral é a cada 10.000 km ou 1 ano, o que vier primeiro. Mas isso varia:

- **Óleo mineral:** 5.000 km
- **Óleo semissintético:** 7.500 km
- **Óleo sintético:** 10.000 a 15.000 km

## Fatores que encurtam o intervalo

- Trânsito intenso (anda e para)
- Percursos muito curtos
- Poeira e clima seco
- Motor turbo

## Como saber se o óleo está ruim?

- Cor muito escura (quase preta)
- Cheiro de queimado
- Nível baixo frequente
- Luz de óleo acendendo

## Tipos de óleo

Verifique sempre a especificação no manual do fabricante. Usar o óleo errado pode danificar o motor.
    `,
  },
  {
    slug: "problemas-suspensao-sinais",
    titulo: "Como identificar problemas na suspensão",
    descricao:
      "Sinais de desgaste e como evitar prejuízos maiores.",
    categoria: "mecanica",
    tempoLeitura: "7 min de leitura",
    visualizacoes: "9,8k",
    imagem: "/artigo-suspensao.png",
    autor: "Marina Souza",
    data: "28/08/2026",
    conteudo: `
A suspensão é responsável pelo conforto e pela segurança do carro. Problemas nela podem causar acidentes.

## Sintomas mais comuns

- Barulhos ao passar em buracos
- Carro "puxando" para um lado
- Direção pesada ou vibratória
- Pneus com desgaste irregular
- Carro balançando demais

## O que verificar

- Amortecedores
- Molas
- Buchas
- Pivôs
- Bandejas
- Rolamentos

## Quando procurar ajuda

Se notar mais de um sintoma ao mesmo tempo, procure uma oficina imediatamente. Suspensão ruim afeta freios e direção.
    `,
  },
  {
    slug: "carros-eletricos-vale-a-pena-2026",
    titulo: "Carros elétricos: vale a pena em 2026?",
    descricao:
      "Analisamos os prós e contras dos veículos elétricos no Brasil.",
    categoria: "carros",
    tempoLeitura: "9 min de leitura",
    visualizacoes: "11,2k",
    imagem: "/artigo-eletricos.png",
    autor: "Lucas Ferreira",
    data: "25/08/2026",
    conteudo: `
Os carros elétricos ganharam espaço no Brasil nos últimos anos. Mas ainda há muitas dúvidas.

## Prós

- Economia no combustível
- Menos manutenção
- Silencioso
- Torque instantâneo

## Contras

- Preço inicial alto
- Autonomia limitada em viagens
- Rede de recarga ainda pequena
- Bateria cara de substituir

## Vale a pena?

Depende do seu perfil. Se você roda muito na cidade e tem onde carregar em casa, pode valer muito. Se viaja com frequência, um híbrido pode ser melhor.
    `,
  },
];