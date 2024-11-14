"use client";

import { useState, useEffect } from 'react';
import chatData from '../../../typebot-export-chatbot-de-duvidas-xg1hitj (2).json';
import Link from 'next/link'; // Importando o Link do Next.js

// Tipos para o fluxo de dados (mesmos tipos que já estão definidos)
interface RichTextItem {
  type: 'p';
  children: { text: string }[];
}

interface TextContent {
  richText: RichTextItem[];
}

interface TextBlock {
  id: string;
  type: 'text';
  content: TextContent;
}

interface ChoiceItem {
  id: string;
  content: string;
  outgoingEdgeId?: string;
}

interface ChoiceInputBlock {
  id: string;
  type: 'choice input';
  items: ChoiceItem[];
}

interface TextInputBlock {
  id: string;
  type: 'text input';
  options: {
    labels: { placeholder: string };
    variableId: string;
    isLong: boolean;
  };
}

interface EmailInputBlock {
  id: string;
  type: 'email input';
  options: {
    variableId: string;
  };
}

type Block = TextBlock | ChoiceInputBlock | TextInputBlock | EmailInputBlock;

interface Group {
  id: string;
  title: string;
  blocks: Block[];
}

interface Event {
  id: string;
  type: 'start' | 'end';
  outgoingEdgeId?: string;
}

interface Edge {
  id: string;
  from: {
    eventId?: string;
    blockId?: string;
    itemId?: string;
  };
  to: {
    groupId: string;
    blockId?: string;
  };
}

interface Variable {
  id: string;
  name: string;
  isSessionVariable: boolean;
}

interface ChatBot {
  version: string;
  id: string;
  name: string;
  events: Event[];
  groups: Group[];
  edges: Edge[];
  variables: Variable[];
}

const chatbotData: ChatBot = chatData as ChatBot;

const ChatBotComponent: React.FC = () => {
  const startEdge = chatbotData.edges.find(edge => edge.from.eventId === chatbotData.events[0].id);
  const initialGroupId = startEdge ? startEdge.to.groupId : null;

  const [currentGroupId, setCurrentGroupId] = useState<string | null>(initialGroupId);
  const [userResponses, setUserResponses] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [sessionVariables, setSessionVariables] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  const getGroup = (groupId: string) => {
    return chatbotData.groups.find(group => group.id === groupId) || null;
  };

  const handleChoice = (choice: ChoiceItem) => {
    setUserResponses([...userResponses, choice.content]);
    const nextEdge = chatbotData.edges.find(edge => edge.from.blockId === choice.id);
    if (nextEdge) {
      setCurrentGroupId(nextEdge.to.groupId); 
    } else {
      const nextBlockId = choice.outgoingEdgeId;
      if (nextBlockId) {
        const nextEdge = chatbotData.edges.find(edge => edge.id === nextBlockId);
        if (nextEdge) {
          setCurrentGroupId(nextEdge.to.groupId);
        }
      }
    }
  };

  const handleTextInputSubmit = (variableId: string) => {
    setIsLoading(true); 
    setUserResponses([...userResponses, inputValue]);
    setSessionVariables(prev => ({ ...prev, [variableId]: inputValue }));
    setInputValue('');
    
    const nextEdge = chatbotData.edges.find(edge => edge.from.blockId === variableId);
    setTimeout(() => {
      if (nextEdge) {
        setCurrentGroupId(nextEdge.to.groupId);
      }
      setIsLoading(false); 
    }, 1000);
  };

  const handleEmailInputSubmit = (variableId: string) => {
    setIsLoading(true);
    setUserResponses([...userResponses, inputValue]);
    setSessionVariables(prev => ({ ...prev, [variableId]: inputValue }));
    setInputValue('');
    
    const nextEdge = chatbotData.edges.find(edge => edge.from.blockId === variableId);
    setTimeout(() => {
      if (nextEdge) {
        setCurrentGroupId(nextEdge.to.groupId);
      }
      setIsLoading(false);
    }, 1000);
  };

  const renderGroup = () => {
    if (!currentGroupId) return <div className="animate-pulse text-center text-gray-500">Carregando...</div>;

    const group = getGroup(currentGroupId);
    if (!group) return <div className="animate-pulse text-center text-gray-500">Carregando...</div>;

    return group.blocks.map((block, index) => {
      if (block.type === 'text') {
        return (
          <p key={index} className="bg-teal-600 p-4 rounded-lg shadow-lg text-white mb-4 transition-all transform hover:scale-105">
            {block.content.richText.map(r => r.children[0].text).join(' ')}
          </p>
        );
      }

      if (block.type === 'choice input') {
        return (
          <div key={index} className="flex flex-col space-y-2">
            {block.items.map(item => (
              <button
                key={item.id}
                onClick={() => handleChoice(item)}
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all transform hover:scale-105"
              >
                {item.content}
              </button>
            ))}
          </div>
        );
      }

      if (block.type === 'text input') {
        return (
          <div key={index} className="mb-4">
            <input
              type="text"
              placeholder={block.options?.labels?.placeholder || 'Digite aqui'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-2 border border-teal-300 rounded-lg mb-2 focus:ring-teal-500 transition-all"
            />
            <button
              onClick={() => handleTextInputSubmit(block.options.variableId)}
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all transform hover:scale-105"
            >
              Enviar
            </button>
          </div>
        );
      }

      if (block.type === 'email input') {
        return (
          <div key={index} className="mb-4">
            <input
              type="email"
              placeholder="Digite seu email"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-2 border border-teal-300 rounded-lg mb-2 focus:ring-teal-500 transition-all"
            />
            <button
              onClick={() => handleEmailInputSubmit(block.options.variableId)}
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all transform hover:scale-105"
            >
              Enviar
            </button>
          </div>
        );
      }

      return null;
    });
  };

  // Detecta quando a conversa termina
  useEffect(() => {
    const lastGroup = chatbotData.groups.find(group => group.blocks.some(block => block.type === 'text' && block.content.richText[0].children[0].text.includes("relatório")));
    if (!currentGroupId) return;

    // Após a conclusão da conversa, mostrar link para a home
    if (currentGroupId === lastGroup?.id) {
      setTimeout(() => {
        alert("O relatório será enviado para seu email.");
      }, 2000);
    }
  }, [currentGroupId]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg animate-fadeIn">
      <h2 className="text-3xl font-bold mb-6 text-center text-teal-600">Chatbot de Dúvidas</h2>
      {isLoading ? (
        <div className="text-center text-teal-600 animate-pulse">Carregando...</div>
      ) : (
        <div>{renderGroup()}</div>
      )}
      {/* Link para redirecionamento para a home após a conversa */}
      <div className="mt-6 text-center">
        <Link href="/" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all transform hover:scale-105">
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
};

export default ChatBotComponent;
