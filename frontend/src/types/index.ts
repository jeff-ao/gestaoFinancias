export interface User {
  uuid: string;
  nome: string;
}

export interface Task {
  id: number;
  task: string;
  category: string;
  completed: boolean;
}
export interface TasksProp {
  tasks: Task[];
}

export interface notification {
  variant: "default" | "destructive" | null | undefined;
  title: string;
  description: string;
}

export interface AlertModalProps {
  notification: notification;
}

export interface onCreateTaskProp {
  onCreateTask: (userId: number, task: string, category: string) => void;
}
export interface onEditTaskProp {
  onEditTask: (id: number, task: string, category: string) => void;
}
export interface onEditCompletedTaskProp {
  onEditCompletedTask: (id: number) => void;
}
export interface onDeletetTaskProp {
  onDeletetTask: (id: number) => void;
}

export interface Transacao {
  uuid: string;
  valor: number;
  tipo: "entrada" | "saida";
  descricao: string;
  data: Date;
  categoria: string;
}

export interface Dados {
  uuid: string;
  entrada: number;
  saida: number;
  saldo: number;
  mes: number;
  ano: number;
  transacoes: Transacao[];
}
