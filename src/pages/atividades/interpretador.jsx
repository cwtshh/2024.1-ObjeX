import React, { useEffect, useState } from 'react';
import NavBarMenu from '../../components/navbar/navbar-menu/NavBarMenu';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Editor, { useMonaco } from '@monaco-editor/react';
import { toast, ToastContainer } from 'react-toastify';


const Interpretador = () => {
  const [ code, setCode ] = useState('');
  const monaco = useMonaco();

  const notify = (status, message) => {
    if(status === 'success') {
      toast.success(`${message}`, {
        position: "center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if(status === 'error') {
      toast.error(`${message}`, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Tab') { 
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      console.log(start, end)
      setCode(code.substring(0, start) + '\t' + code.substring(end));

      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 1;
      }, 0);
    }
  };

  

  const filterImports = (code) => {
    // Regex para capturar importações
    const importRegex = /^(import\s+\w+(\s+as\s+\w+)?|from\s+\w+\s+import\s+[\w\s,()]+(\s+as\s+\w+)?)/gm;
    const forbiddenImports = [
      'import os', 'import subprocess', 'import shutil', 'import socket', 'import requests',
      'import eval', 'import exec', 'import multiprocessing', 'import ctypes', 'import pdb'
    ];
    const allowedImports = ['import numpy', 'import pandas'];

    // Captura todas as importações
    const imports = code.match(importRegex) || [];
    let filteredCode = code;

    imports.forEach(imp => {
      // Verifica se a importação é permitida
      if (!allowedImports.some(allowed => imp.startsWith(allowed))) {
        // Se for uma importação proibida, remove do código e notifica
        if (forbiddenImports.some(forbidden => imp.startsWith(forbidden))) {
          notify('error', `Você não pode importar ${imp}`);
        }
        filteredCode = filteredCode.replace(imp, '');
      }
    });

    return filteredCode;
  }


  useEffect(() => {
    if(monaco) {
      monaco.editor.defineTheme('myTheme', {
        base: 'vs',
        inherit: true,
        rules: [
          { token: 'keyword', foreground: '#5E81AC', fontStyle: 'bold' }, // Keywords em #5E81AC e negrito
          // Adicione mais regras conforme necessário
        ],
        colors: {
          'editor.background': '#FFFFFF', // Cor de fundo branca
          'editor.foreground': '#000000', // Cor do texto normal preta
        },
      });

      monaco.languages.registerCompletionItemProvider('python', {
        provideCompletionItems: () => ({
          suggestions: [
            {
              label: 'print',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'print()',
              documentation: 'Prints a message to the console',
            },
            {
              label: 'if',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'if ${1:condition}:\n\t${2:pass}',
              documentation: 'If statement',
            },
            {
              label: 'for',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'for ${1:item} in ${2:iterable}:\n\t${3:pass}',
              documentation: 'For loop',
            },
            {
              label: 'while',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'while ${1:condition}:\n\t${2:pass}',
              documentation: 'While loop',
            },
          ],
        }),
      });
      monaco.editor.setTheme('myTheme');
    };


    if(code.includes('import numpy') || code.includes('import numpy as np')) {
      return;
    } 
    if(code.includes('import sys')) {
      notify('error', 'Você não pode importar sys');
      setCode(code.replace('import sys', ''));
    }
    if(code.includes('import os')) {
      notify('error', 'Você não pode importar os');
      setCode(code.replace('import os', ''));
    }
    if(code.includes('import subprocess')) {
      notify('error', 'Você não pode importar subprocess');
      setCode(code.replace('import subprocess', ''));
    }
    if(code.includes('import shutil')) {
      notify('error', 'Você não pode importar shutil');
      setCode(code.replace('import shutil', ''));
    }
    if(code.includes('import requests')) {
      notify('error', 'Você não pode importar requests');
      setCode(code.replace('import requests', ''));
    }
    if(code.includes('import json')) {
      notify('error', 'Você não pode importar json');
      setCode(code.replace('import json', ''));
    }
    if(code.includes('import socket')) {
      notify('error', 'Você não pode importar socket');
      setCode(code.replace('import socket', ''));
    }

  }, [monaco, code]);

  return (
    <div className='flex justify-center'>
      <NavBarMenu />
      <div className='w-full p-4 flex flex-col lg:flex-row gap-4 justify-center'>
        <div className='bg-base-100 h-[720px] lg:w-[650px] w-full rounded-xl mt-[65px] shadow'>
          <div className="bg-[#2e3440] h-[25px] rounded-t-xl"></div>
          <div className="bg-[#d8dee9] h-[75px] text-4xl flex items-center justify-center">
            <h1>Tarefa 7 - POO</h1>
          </div>
          <div className='flex justify-center'>
            <div className='overflow-y-scroll w-full pt-[20px] p-[20px] h-[600px]'>
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
        <div className='h-[690px] lg:w-[650px] w-full rounded-xl lg:mt-[90px] flex flex-col gap-4'>
          <div className='bg-base-100 h-[450px] w-full rounded-xl shadow flex'>
            <div className='bg-[#2e3440] w-[25px] h-full rounded-l-xl'>
              
            </div>
	          <div className="w-full flex flex-col">
            	<div className='bg-[#d8dee9] h-[30px] w-full rounded-tr-lg flex justify-end items-center pr-[10px]'>
              	<button onClick={() => console.log(code)} className='w-[90px] h-[24px] bg-[#5e81ac] text-base-100 rounded-xl'>Enviar</button>

            	</div>
              <div className="h-[600px] w-full">
                <Editor
                  height='100%'
                  defaultLanguage='python'
                  defaultValue='// Digite seu código aqui...'
                  value={code}
                  onChange={value => setCode(value)}
                />
              </div>
	          </div>
          </div>
          <div className='bg-base-100 h-[240px] w-full rounded-xl shadow flex items-center p-[10px]'>
            <div className='h-full w-full p-2 rounded-xl bg-[#2e3440]'>
              <p className='text-base-100'>output/:</p>
            </div>
          </div>
        </div>
      </div>


      <div className="z-[-1]">
        <svg className="fixed bottom-0 left-0 w-full h-1/3">
          <ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill="#d8dee9"/>
          <rect x="0" y="50%" width="100%" height="50%" fill="#d8dee9"/>
        </svg>
      </div>

     <ToastContainer />
    </div>
  );
};

export default Interpretador;
