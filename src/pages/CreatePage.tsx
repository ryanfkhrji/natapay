import Container from "@/components/container/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import Footer from "@/components/footer/footer";
import toast from "react-hot-toast";
import { ButtonLoading } from "@/components/ui/ButtonLoading";

// Format Rupiah
const formatRupiah = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  const number = parseInt(cleaned, 10);

  if (isNaN(number)) return "";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

const CreatePage = () => {
  const [nominal, setNominal] = useState<string>("");
  const [deskripsi, setDeskripsi] = useState<string>("");
  const [tipe, setTipe] = useState<"income" | "spend">("income");
  const navigate = useNavigate();
  const [backPath, setBackPath] = useState<string>("/");
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeskripsiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeskripsi(event.target.value);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("rekapitulasi") || "[]");
    if (Array.isArray(data) && data.length > 0) {
      setBackPath("/rekapitulasi");
    } else {
      setBackPath("/");
    }
  }, []);

  const handleNominalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const cleaned = input.replace(/\D/g, ""); // remove non-digit
    setNominal(formatRupiah(cleaned));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanedNominal = nominal.replace(/\D/g, "");

    const rekap = {
      id: Date.now(),
      nominal: parseInt(cleanedNominal, 10),
      deskripsi,
      tipe,
      tanggal: new Date().toISOString().split("T")[0],
    };

    // Ambil data lama, push data baru
    const dataLama = JSON.parse(localStorage.getItem("rekapitulasi") || "[]");
    dataLama.push(rekap);
    localStorage.setItem("rekapitulasi", JSON.stringify(dataLama));

    setLoading(true);

    toast.success("Rekapitulasi berhasil dibuat!");
    window.location.href = "/rekapitulasi";
  };

  return (
    <Container>
      <div className="flex flex-col items-center justify-center h-screen relative">
        <Button className="absolute top-4 left-0 cursor-pointer" size={"sm"} onClick={() => navigate(backPath)}>
          <ArrowLeft />
        </Button>
        <h1 className="text-md font-semibold mb-6 text-foreground">Buat Rekapitulasi</h1>
        <div className="flex flex-col items-center gap-2 w-full">
          {/* Form Inputan */}
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="nominal" className="text-sm leading-6">
                Nominal
                <Input type="text" id="nominal" placeholder="Rp. 1.000" className="mt-2" value={nominal} onChange={handleNominalChange} autoComplete="off" required />
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="deskripsi" className="text-sm leading-6">
                Deskripsi
                <Input type="text" id="deskripsi" placeholder="Input Deskripsi" className="mt-2" value={deskripsi} onChange={handleDeskripsiChange} autoComplete="off" required />
              </label>
            </div>
            <div className="mb-4">
              <label className="text-sm">Tipe Transaksi</label>
              <select className="w-full p-2 mt-1 rounded-md border text-sm" value={tipe} onChange={(e) => setTipe(e.target.value as "income" | "spend")} required >
                <option value="income">Pemasukan</option>
                <option value="spend">Pengeluaran</option>
              </select>
            </div>
            <Button size={"lg"} className="w-full mt-4 cursor-pointer">
              {loading? <ButtonLoading /> : "Simpan Rekapitulasi"}
            </Button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </Container>
  );
};

export default CreatePage;
