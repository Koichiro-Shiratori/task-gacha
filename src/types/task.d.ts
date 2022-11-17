export type Task = {
  url: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  title: string;
  state: string;
  body: string | null;
  assignee: User | null;
  assignees: User[] | [];
  user: User;
  labels: [
    {
      id: number;
      name: string;
      color: string;
    }
  ];
};
