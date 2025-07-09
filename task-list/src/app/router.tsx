import { ROUTES } from "../shared/model/routes";
import { createBrowserRouter, redirect } from "react-router-dom";
import { App } from "./app";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: ROUTES.TASKS,
        lazy: () => import("@/features/tasks-list/tasks-list.page"),
      },
      {
        path: ROUTES.TASK,
        lazy: () => import("@/features/task/task.page"),
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.TASKS),
      },
    ],
  },
]);
