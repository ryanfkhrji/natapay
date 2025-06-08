import Container from "@/components/container/container";
import { Button } from "@/components/ui/button";
import heroImage from "../assets/hero-image.svg";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import Footer from "@/components/footer/footer";
import { useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const sudahRekap = localStorage.getItem("rekapitulasi");
    if (sudahRekap && JSON.parse(sudahRekap)?.length > 0) {
      navigate("/rekapitulasi");
    }
  }, [navigate]);

  return (
    <Container>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-md font-semibold mb-10 text-foreground">NataPay</h1>
        <img src={heroImage} alt="NataPay" className="grayscale mb-4" />
        <div className="flex flex-col items-center gap-2 w-full">
          <h4 className="text-lg font-semibold text-foreground">Belum Punya Rekapitulasi</h4>
          <p className="text-sm text-gray-500 text-center max-w-xs">Daftar rekapitulasi uang Anda sekarang. Silakan mulai membuat rekapitulasi.</p>
          <Link to={"/create-rekapitulasi"}>
            <Button className="mt-4 cursor-pointer" size={"lg"}>
              Buat Rekapitulasi <Plus />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </Container>
  );
};

export default HomePage;
