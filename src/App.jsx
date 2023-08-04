import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./shared/Router";

const queryClient = new QueryClient();
// new QueryClient는 index.js에서 해줬어야 하는거고
// App.js에서는 useQueryClient로 가져온대. 근데 넌 저거 어디다 했었냐?? 각 컴포넌트에 했었네
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <Router />
    </QueryClientProvider>
  );
};

export default App;
