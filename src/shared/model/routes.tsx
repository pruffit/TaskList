export const ROUTES = {
  HOME: '/',
  TASKS: '/tasks',
  TASK: '/tasks/:taskId',
} as const;

export type PathParams = {
  [ROUTES.TASK]: {
    boardId: string;
  };
};
