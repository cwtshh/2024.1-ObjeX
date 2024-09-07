module.exports = {
    apps: [
      {
        name: "api-code",            // Nome do processo
        script: "app.js",  // Arquivo principal da sua aplicação
        instances: "max",       // Usa todas as CPUs disponíveis
        exec_mode: "cluster",   // Modo cluster para maximizar o uso da CPU
        env_production: {
          NODE_ENV: "production",  // Ambiente de produção
        },
      },
    ],
  };