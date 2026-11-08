import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "AMINAH | An Institution for Quranic Knowledge",
  description: "Guided by Revelation. Building a Safer Tomorrow.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        {/* Everything wrapped in CartProvider */}
        <CartProvider>
          <Header />
          
          <div className="flex-grow">
            {children}
          </div>
          
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}