
export interface LoginProps {
    email: string;
    password: string;
}

export interface LoginFormProps {
    onLogin: (data: LoginProps) => void; 
}
