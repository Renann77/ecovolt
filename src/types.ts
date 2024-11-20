// Login
export type LoginType = {
	email: string,
	senha: string,
}

// Cadastro
export type ClienteType = {
	idCadastro: number,
	email: string,
	senha: string
}

export interface User {
    id: string; 
    nome: string; 
    email: string; 
  }
  
  export interface FormData {
    id: string; 
    nome: string; 
    email: string; 
  }
