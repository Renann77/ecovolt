// Login


export interface LoginProps {
    email: string;
    password: string;
}

export interface LoginFormProps {
    onLogin: (data: LoginProps) => void; 
}




// Cadastro


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
  
