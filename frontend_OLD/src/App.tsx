import { RouterProvider } from "react-router";
import { AuthProvider } from "./security/AuthProvider";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={AppRouter} />
    </AuthProvider>
  );
};

export default App
