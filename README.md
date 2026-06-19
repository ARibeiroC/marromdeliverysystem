# Marrom Delivery System

> Sistema inteligente para gestão, controle de fluxo de saídas de entregas e monitoramento financeiro mensal.

O **Marrom Delivery System** é uma aplicação desenvolvida para otimizar e gerir o fluxo de saídas de entregas de uma empresa ao longo do mês. O sistema conta com um fluxo de caixa simples, porém robusto, que contabiliza e exibe visualmente o total de saídas e o montante a receber, tudo isso controlado por um sistema de filtros dinâmicos por intervalo de períodos.

---

## 🚀 Funcionalidades Chave

* **Gestão de Entregas:** Registro e monitoramento do fluxo de saídas de mercadorias/entregadores.
* **Fluxo de Caixa Integrado:** Visualização rápida do total de saídas financeiras da operação.
* **Controle de Recebíveis:** Exibição exata dos valores pendentes a receber dentro do mês.
* **Filtro por Período:** Busca avançada por intervalos de datas para análise de métricas e relatórios sob demanda.

---

## 🛠️ Tecnologias Utilizadas (Stack)

O projeto foi construído utilizando tecnologias modernas do ecossistema JavaScript, focando em performance, componentização e facilidade de manutenção:

* **[React](https://react.dev/):** Biblioteca principal para a construção da interface do usuário baseada em componentes.
* **[Vite](https://vitejs.dev/):** Ferramenta de build ultra-rápida para o ambiente de desenvolvimento.
* **JavaScript (ES6+):** Linguagem base para toda a lógica da aplicação.
* **CSS Modules / Estilização Modular:** Abordagem de escopo local por componente. Cada componente possui seu próprio arquivo de estilo dedicado, garantindo que o CSS não vaze para outras partes da aplicação, facilitando a manutenção e aproximando a folha de estilo do arquivo `.jsx`.

---

## 📂 Arquitetura de Estilização

A estrutura de componentes e estilos segue o padrão modular para isolamento de escopo:

```text
src/
 └── components/
      ├── DeliveryCard/
      │    ├── DeliveryCard.jsx
      │    └── DeliveryCard.css  <-- Estilo isolado e modular
      └── FilterBar/
           ├── FilterBar.jsx
           └── FilterBar.css
```
## 💻 Como Executar o Projeto Localmente
Por ser um projeto com TypeScript, você precisará apenas compilar os arquivos de script (ou rodar em modo watch) se decidir fazer alterações no código fonte.

Pré-requisitos
Antes de começar, certifique-se de ter o Node.js e o TypeScript instalados globalmente ou as dependências do projeto inicializadas.

1. Clone o repositório:
```
git clone [https://github.com/seu-usuario/marrom-delivery-system.git](https://github.com/seu-usuario/marrom-delivery-system.git)
```

2. Acesse a pasta do projeto:
```
cd marrom-delivery-system
```

3. Instale as dependências:
```
npm install
# ou se usar yarn
yarn
```

4. Inicie o servidor de desenvolvimento:
```
npm run dev
# ou se usar yarn
yarn dev
```

## 📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

Desenvolvido por Seu Nome 🚀

