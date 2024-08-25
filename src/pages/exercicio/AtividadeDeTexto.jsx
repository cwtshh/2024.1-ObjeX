import NavBar from '../../components/navbar/navbar-login/NavBarLoginAdmin';

const AtividadeDeTexto = () => {
  return (
<div>

<NavBar/>

    <div className='flex justify-center'>
      <div className='w-full p-4 flex flex-col lg:flex-row gap-4 justify-center'>
        <div className='bg-base-100 h-[720px] lg:w-[650px] w-full rounded-xl mt-[65px] shadow'>
          <div className="bg-[#2e3440] h-[25px] rounded-t-xl"></div>
          <div className="bg-[#d8dee9] h-[75px] text-4xl flex items-center justify-center">
            <h1>Tarefa 7 - POO</h1>
          </div>
          <div className='flex justify-center'>
            <div className='overflow-y-scroll w-full pt-[20px] pl-[20px] h-[600px]'>
            	<p className="h-[500px]">1. Crie uma classe chamada “Círculo” que possua um atributo para armazenar o raio e métodos para calcular a área e o perímetro do círculo.<br />
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

        <div className='h-[720px] lg:w-[650px] w-full rounded-xl lg:mt-[68px] flex flex-col gap-4'>
        <div className='bg-base-100 h-[740px] w-full rounded-xl shadow relative flex'>
          <div className='bg-[#2e3440] w-[25px] h-full rounded-l-xl'>
          </div>
          
              <textarea
                  className='w-full h-full p-4 rounded-xl border-t-0 border-b-0 border-r border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-[#5e81ac]'
                  placeholder='Digite a sua resposta aqui...'
               ></textarea>

          <div className='absolute bottom-0 right-0 m-4'>
            <button className='w-[90px] h-[24px] bg-[#5e81ac] text-base-100 rounded-xl'>Enviar</button>
          </div>
        </div>
      </div>

      </div>

    </div>
    </div>
  );
}

export default AtividadeDeTexto;
