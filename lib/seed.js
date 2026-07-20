const V = (o)=>Object.assign({
  fotos:[],capa:0,frame:{x:50,y:50,z:1},status:'disponivel',views:0,
  leilao:false,sinistro:false,aceitaTroca:true,financia:true,
  garantia:'Garantia de 90 dias para motor e câmbio',
  documentacao:'Documentação em dia, IPVA 2026 pago, sem multas ou restrições',
  criadoEm:Date.now()
},o);

function seedDB(){
  return {
    config:{
      nome:'Ryan Veículos',
      whatsappNum:'5511995399892',
      whatsappFmt:'(11) 99539-9892',
      instagram:'@ryanveiculos_',
      instagramUrl:'https://instagram.com/ryanveiculos_',
      email:'ryansoares744@gmail.com',
      endereco:'Av. Eng. Eusébio Stevaux, 2677 – Jurubatuba, São Paulo – SP, CEP 04696-000',
      regiao:'Zona Sul de São Paulo e região',
      horario:'Seg a Sex 9h às 18h · Sáb 9h às 14h',
      heroTitulo:'Seu próximo carro está aqui.',
      heroSub:'Veículos selecionados, procedência e atendimento personalizado na Zona Sul de São Paulo.',
      sobre:'A Ryan Veículos trabalha com veículos selecionados e atendimento personalizado, buscando oferecer segurança, transparência e facilidade em cada negociação. Estamos localizados na Zona Sul de São Paulo e atendemos clientes de toda a região.',
      adminEmail:'ryansoares744@gmail.com',
      adminSenha:'admin123',
      mostrarVendidos:true
    },
    veiculos:[
      V({id:1,marca:'Hyundai',modelo:'HB20',versao:'Vision 1.6 Flex',anoFab:2021,anoMod:2022,preco:73900,km:41200,cambio:'Automático',combustivel:'Flex',cor:'Prata',motor:'1.6 16V',portas:4,placaFinal:'7',carroceria:'Hatch',categoria:'Hatch compacto',entradaSugerida:15000,views:184,
        descricao:'HB20 Vision automático, único dono, revisões feitas na concessionária. Carro muito econômico, ideal para o dia a dia. Pneus novos e laudo cautelar aprovado.',
        opcionais:['Ar-condicionado','Direção elétrica','Central multimídia com Android Auto e Apple CarPlay','Câmera de ré','Vidros e travas elétricas','Sensor de estacionamento']}),
      V({id:2,marca:'Chevrolet',modelo:'Onix',versao:'LTZ 1.0 Turbo',anoFab:2021,anoMod:2021,preco:74900,km:38500,cambio:'Automático',combustivel:'Flex',cor:'Branco',motor:'1.0 Turbo',portas:4,placaFinal:'2',carroceria:'Hatch',categoria:'Hatch compacto',entradaSugerida:15000,views:162,
        descricao:'Onix LTZ turbo automático com baixa quilometragem. Interior impecável, sem detalhes. Todas as revisões em dia.',
        opcionais:['MyLink com espelhamento','Ar-condicionado digital','Rodas de liga leve','Controle de cruzeiro','Sensor de ré','Chave presencial']}),
      V({id:3,marca:'Toyota',modelo:'Corolla',versao:'XEi 2.0 Flex',anoFab:2020,anoMod:2020,preco:115900,km:62300,cambio:'Automático CVT',combustivel:'Flex',cor:'Preto',motor:'2.0 16V',portas:4,placaFinal:'9',carroceria:'Sedã',categoria:'Sedã médio',entradaSugerida:25000,views:241,
        descricao:'Corolla XEi impecável, procedência garantida com laudo cautelar aprovado. Manual e chave reserva. O sedã mais valorizado do mercado.',
        opcionais:['Bancos em couro','Central multimídia 9"','Toyota Safety Sense','Piloto automático adaptativo','Faróis full LED','Rodas 17"']}),
      V({id:4,marca:'Jeep',modelo:'Renegade',versao:'Longitude 1.3 T270',anoFab:2021,anoMod:2021,preco:92900,km:47800,cambio:'Automático',combustivel:'Flex',cor:'Cinza',motor:'1.3 Turbo',portas:4,placaFinal:'4',carroceria:'SUV',categoria:'SUV compacto',entradaSugerida:20000,views:139,
        descricao:'Renegade Longitude com motor T270 turbo. SUV completo, revisado e com pneus em ótimo estado. Aceita troca.',
        opcionais:['Central multimídia 8.4"','Ar digital dual zone','Rodas 17"','Sensor de estacionamento','Câmera de ré','Faróis de LED']}),
      V({id:5,marca:'Fiat',modelo:'Toro',versao:'Freedom 1.8 AT6',anoFab:2022,anoMod:2022,preco:112900,km:35900,cambio:'Automático',combustivel:'Flex',cor:'Vermelho',motor:'1.8 16V',portas:4,placaFinal:'1',carroceria:'Picape',categoria:'Picape intermediária',entradaSugerida:25000,views:117,
        descricao:'Toro Freedom automática, única dona. Caçamba com capota marítima e protetor. Pronta para trabalho e lazer.',
        opcionais:['Capota marítima','Central multimídia 7"','Volante multifuncional','Controle de tração','Sensor de ré','Rodas de liga leve']}),
      V({id:6,marca:'Volkswagen',modelo:'T-Cross',versao:'Comfortline 1.0 TSI',anoFab:2023,anoMod:2023,preco:119900,km:22100,cambio:'Automático',combustivel:'Flex',cor:'Azul',motor:'1.0 TSI',portas:4,placaFinal:'5',carroceria:'SUV',categoria:'SUV compacto',entradaSugerida:28000,status:'reservado',views:203,
        descricao:'T-Cross Comfortline seminovo, ainda na garantia de fábrica. Baixíssima quilometragem, estado de zero.',
        opcionais:['VW Play 10"','Ar digital','ACC piloto adaptativo','Detector de fadiga','Rodas 17"','Sensor dianteiro e traseiro']}),
      V({id:7,marca:'Honda',modelo:'Civic',versao:'EXL 2.0 CVT',anoFab:2019,anoMod:2019,preco:109900,km:71400,cambio:'Automático CVT',combustivel:'Flex',cor:'Cinza',motor:'2.0 16V',portas:4,placaFinal:'8',carroceria:'Sedã',categoria:'Sedã médio',entradaSugerida:22000,status:'vendido',views:96,
        descricao:'Civic EXL completo com bancos em couro e teto solar. Vendido para cliente da região — temos outros sedãs disponíveis.',
        opcionais:['Bancos em couro','Teto solar','Honda Sensing','Central multimídia','Câmera de ré','Chave presencial']})
    ],
    contatos:[],
    acessos:327
  };
}


module.exports = { seedDB };
