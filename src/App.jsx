import { ApiProvider } from "_services/api-context.jsx";
import { StoresProvider } from "_stores/stores-provider.jsx";
import AppRoutes from "_/routes/AppRoutes.jsx";

function App() {
  return (
    <ApiProvider>
      <StoresProvider>
        <AppRoutes />
      </StoresProvider>
    </ApiProvider>
  )
}

export default App
