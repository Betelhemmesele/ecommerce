"use client";

import Header from "@/components/Header";
// import Main from "@/components/Main";
import ReduxProvider from "@/store/ReduxProvider"
import '@/styles/globals.css'



export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Header />
          {children}</ReduxProvider></body>
    </html>
  )
}
