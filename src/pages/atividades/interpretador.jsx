import React, { useEffect, useState } from 'react';
import NavBarMenu from '../../components/navbar/navbar-menu/NavBarMenu';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Editor, { useMonaco } from '@monaco-editor/react';
import { toast, ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { API_BASE_URL, CODE_API_BASE_URL } from '../../util/constants';
import axios from 'axios';


const Interpretador = () => {
  const [ code, setCode ] = useState('');
  const [ output, setOutput ] = useState('');
  const monaco = useMonaco();
  const { id } = useParams();
  const [ atividade, setAtividade ] = useState({});

  const getAtividade = async() => {
    await axios.get(`${API_BASE_URL}/atividade?id=${id}`).then((res) => {
      setAtividade(res.data);
    }).catch(err => {
      console.log(err);
    });
  };

  const runCode = async() => {
    await axios.post(`${CODE_API_BASE_URL}/interpreter`, {
      atividade_id: id,
      code: code,
      usuario_id: '66c71c6c07f10275203ee060'
    }).then((res) => {
      setOutput(res.data.message);
    }).catch((err) => {
      console.log(err);
    })
  }

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

  useEffect(() => {
    getAtividade();
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
            <h1>{atividade.nome}</h1>
          </div>
          <div className='flex justify-center'>
            <div className='overflow-y-scroll w-full pt-[20px] p-[20px] h-[600px]'>
            	<p className="h-[500px]">{atividade.enunciado}</p>
            </div>
          </div>
        </div>
        <div className='h-[690px] lg:w-[650px] w-full rounded-xl lg:mt-[90px] flex flex-col gap-4'>
          <div className='bg-base-100 h-[450px] w-full rounded-xl shadow flex'>
            <div className='bg-[#2e3440] w-[25px] h-full rounded-l-xl'>
              
            </div>
	          <div className="w-full flex flex-col">
            	<div className='bg-[#d8dee9] h-[30px] w-full rounded-tr-lg flex justify-end items-center pr-[10px]'>
              	<button onClick={() => runCode()} className='w-[90px] h-[24px] bg-[#5e81ac] text-base-100 rounded-xl'>Enviar</button>

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
              <p className='text-base-100'>output/: {output}</p>
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
