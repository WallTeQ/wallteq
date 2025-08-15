export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  suspended?: boolean;
  authorProfile?: {
    id: string;
    name: string;
  };
}

export interface UserRowProps {
  user: User;
  index: number;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onSuspend: (user: User) => void;
}
