import Footer from "@/Components/footer.jsx";
import Navbar from "../Components/Navbar.jsx";

export default function UserLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
}
