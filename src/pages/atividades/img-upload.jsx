import React from 'react';
import NavBarMenu from '../../components/navbar/navbar-menu/NavBarMenu';

const ImgUpload = () => {
  return (
    <div className='flex justify-center'>
      <NavBarMenu />
      <div className='w-full p-4 flex flex-col gap-4 justify-center items-center'>
        <div className='bg-base-100 h-[600px] md:w-[650px] w-full rounded-xl mt-[50px] shadow'>
          <div className="bg-[#2e3440] h-[25px] rounded-t-xl"></div>
          <div className="bg-[#d8dee9] h-[75px] text-4xl flex items-center justify-center">
            <h1>Tarefa 7 - POO</h1>
          </div>
          <div className='flex justify-center'>
            <div className='overflow-y-scroll w-full pt-[20px] pl-[20px] h-[480px]'>
            	<p className="h-[400px]">1. Crie uma classe chamada “Círculo” que possua um atributo para armazenar o raio e métodos para calcular a área e o perímetro do círculo.<br />
              2. Implemente uma classe chamada “ContaBancária” que possua atributos para armazenar o número da conta, nome do titular e saldo. Adicione métodos para realizar depósitos e saques.<br />
              3. Crie uma classe chamada “Retângulo” que possua atributos para armazenar a largura e a altura. Implemente métodos para calcular a área e o perímetro do retângulo.<br />
              4. Implemente uma classe chamada “Aluno” que possua atributos para armazenar o nome, a matrícula e as notas de um aluno. Adicione métodos para calcular a média das notas e verificar a situação do aluno (aprovado ou reprovado).<br />
              5. Crie uma classe chamada “Funcionário” com atributos para armazenar o nome, o salário e o cargo do funcionário. Implemente métodos para calcular o salário líquido, considerando descontos de impostos e benefícios.<br />
              6. Implemente uma classe chamada “Produto” que possua atributos para armazenar o nome, o preço e a quantidade em estoque. Adicione métodos para calcular o valor total em estoque e verificar se o produto está disponível.<br />
              7. Crie uma classe chamada “Triângulo” com atributos para armazenar os três lados do triângulo. Implemente métodos para verificar se é um triângulo válido e calcular sua área.<br />
              8. Implemente uma classe chamada “Carro” com atributos para armazenar a marca, o modelo e a velocidade atual do carro. Adicione métodos para acelerar, frear e exibir a velocidade atual.<br />
              9. Crie uma classe chamada “Paciente” que possua atributos para armazenar o nome, a idade e o histórico de consultas de um paciente. Implemente métodos para adicionar uma nova consulta ao histórico e exibir as consultas realizadas.<br />
              10. Implemente uma classe chamada “Livro” com atributos para armazenar o título, o autor e o número de páginas do livro. Adicione métodos para emprestar o livro, devolvê-lo e verificar se está disponível.<br />
            	</p>

            </div>
          </div>
          
          
        </div>
        <div className='h-[50px] md:w-[650px] w-full rounded-xl flex justify-between'>
          <div className='bg-base-100 h-[25px] w-[300px] rounded-xl shadow flex'>
            
          </div>
	  <button className='w-[150px] h-full bg-[#5181ac] text-base-100 rounded-xl'>Enviar</button>
	  

        </div>
        

      </div>


      <div className="z-[-1]">
        <svg className="fixed bottom-0 left-0 w-full h-1/3">
          <ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill="#d8dee9"/>
          <rect x="0" y="50%" width="100%" height="50%" fill="#d8dee9"/>
        </svg>
      </div>
    </div>
  );
};

export default ImgUpload;
