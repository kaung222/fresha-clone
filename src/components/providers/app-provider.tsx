"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';


const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (

    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PhotoProvider>
          {children}
        </PhotoProvider>
      </Provider>
    </QueryClientProvider>

  );
};

export default AppProvider;
