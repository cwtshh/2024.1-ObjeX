import NavBar from '../../components/navbar/navbar-login/NavBarLoginAdmin';

const AtividadeDeImagem = () => {
    return (
        <div>

            <NavBar />

            <div className='flex justify-center'>
                <div className='w-full p-4 flex flex-col lg:flex-row gap-4 justify-center'>
                    <div className='bg-base-100 h-[720px] lg:w-[650px] w-full rounded-xl mt-[30px] shadow'>
                        <div className="bg-[#2e3440] h-[25px] rounded-t-xl"></div>
                        <div className="bg-[#d8dee9] h-[75px] text-4xl flex items-center justify-center">
                            <h1>Diagrama de Classes POO</h1>
                        </div>
                        <div className='flex justify-center'>
                            <div className='overflow-y-scroll w-full pt-[20px] pl-[20px] h-[600px]'>
                                <p className="h-[500px]">
                                    Objetivo:Desenhar um diagrama de classes que represente as principais entidades de um sistema, demonstrando sua compreensão da modelagem orientada a objetos.
                                    Instruções:
                                    Escolha do Sistema: Selecione um sistema simples para modelar, como uma biblioteca, uma loja online, ou um sistema de reservas.
                                    Identificação das Classes: Defina as classes principais do sistema (por exemplo, Usuário, Produto, Pedido).
                                    Atributos e Métodos: Para cada classe, identifique os atributos e métodos mais importantes.
                                    Relacionamentos: Estabeleça as relações entre as classes (associação, herança, agregação) e indique multiplicidades, se necessário.
                                    Criação do Diagrama: Use uma ferramenta de modelagem (Lucidchart, Draw.io, etc.) ou faça à mão e digitalize.
                                    Envio: Exporte o diagrama como uma imagem (JPEG, PNG, PDF) e envie-o pela plataforma até a data limite.
                                    Data de Entrega: [Insira a data aqui]
                                </p>
                            </div>
                        </div>

                        <div className='flex justify-center mt-8'>
                            <input type="file" className="file-input w-full max-w-xs" />

                            <button className='w-[90px] h-[50px] bg-[#2e3450] text-base-100 rounded-xl ml-20 '>Enviar</button>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default AtividadeDeImagem
