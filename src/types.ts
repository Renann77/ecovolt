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
  
 
  export interface ApiResponse {
    data: User[]; 
    status: number; 
  }
  
  
  export interface CadastroProps {
    apiUrl: string; 
  }
  




  // pagina de gastos, manipulação dos comentarios dos clientes.
export interface Comment {
  id: string;
  author: string;
  content: string;
  rating: number; 
}

export interface FormCommentData {
  author: string;
  content: string;
  rating: number;
}
