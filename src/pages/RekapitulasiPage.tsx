import Container from "@/components/container/container";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Plus, TrashIcon } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

// Di atas function RekapitulasiPage
type Rekap = {
  id: number;
  nominal: number;
  deskripsi: string;
  tipe: "income" | "spend";
  tanggal: string;
};

const RekapitulasiPage = () => {
  const [rekap, setRekap] = useState<Rekap[]>([]);
  const [rekapIdToDelete, setRekapIdToDelete] = useState<number | null>(null);


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("rekapitulasi") || "[]");
    setRekap(data);
  }, []);

  const income = rekap.filter((r) => r.tipe === "income");
  const spend = rekap.filter((r) => r.tipe === "spend");

  const totalIncome = income.reduce((sum, r) => sum + r.nominal, 0);
  const totalSpend = spend.reduce((sum, r) => sum + r.nominal, 0);

  const handleDelete = (id: number) => {
    const newData = rekap.filter((r) => r.id !== id);
    localStorage.setItem("rekapitulasi", JSON.stringify(newData));
    setRekap(newData);
  };

  return (
    <>
      <Container>
        <div className="flex flex-col items-center min-h-screen relative">
          {/* Banner */}
          <div className="bg-[url('/src/assets/Banner.svg')] bg-cover bg-center bg-no-repeat w-full h-[120px] rounded-lg absolute top-1 left-0">
            <div className="flex flex-col items-start justify-center h-full ml-3 gap-1">
              <p className="text-gray-200 text-sm">Total Saldo</p>
              <h4 className="text-2xl font-semibold text-gray-200">Rp. {(totalIncome - totalSpend).toLocaleString("id-ID")}</h4>
            </div>
          </div>
          {/* End Banner */}

          {/* Indikator */}
          <div className="mt-35 w-full grid grid-cols-2 gap-2">
            {/* Income */}
            <Card>
              <CardHeader>
                <CardDescription>Pemasukan</CardDescription>
                <CardTitle>Rp. {totalIncome.toLocaleString("id-ID")}</CardTitle>
                <CardAction>
                  <ArrowDown className="w-4 h-4 cursor-pointer text-green-600" />
                </CardAction>
              </CardHeader>
            </Card>
            {/* End Income */}

            {/* Spend */}
            <Card>
              <CardHeader>
                <CardDescription>Pengeluaran</CardDescription>
                <CardTitle>Rp. {totalSpend.toLocaleString("id-ID")}</CardTitle>
                <CardAction>
                  <ArrowUp className="w-4 h-4 cursor-pointer text-red-600" />
                </CardAction>
              </CardHeader>
            </Card>
            {/* End Spend */}
          </div>
          {/* End Chart */}

          {/* Content */}
          <div className="mt-5 flex justify-between w-full items-center">
            <p className="text-md font-semibold text-foreground">Histori Rekapitulasi</p>
            {/* <Button className="cursor-pointer" size={"sm"}>
              See All
            </Button> */}
          </div>
          {/* Card */}
          <div className="mt-6 w-full space-y-3">
            {rekap.map((item) => (
              <Card key={item.id} className={`border ${item.tipe === "income" ? "border-green-600" : "border-red-600"}`}>
                <CardHeader>
                  <CardTitle>{item.deskripsi}</CardTitle>
                  <CardDescription>{item.tanggal}</CardDescription>
                  <CardAction>Rp {item.nominal != null ? item.nominal.toLocaleString("id-ID") : "Rp0"}</CardAction>
                </CardHeader>
                <CardFooter>
                  <div className="flex gap-3">
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <TrashIcon className="w-4 h-4 cursor-pointer" onClick={() => setRekapIdToDelete(item.id)} />
                      </AlertDialogTrigger>
                      {rekapIdToDelete !== null && (
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Apakah kamu yakin ingin menghapus?</AlertDialogTitle>
                            <AlertDialogDescription>Data akan dihapus secara permanen</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                if (rekapIdToDelete !== null) {
                                  handleDelete(rekapIdToDelete);
                                  setRekapIdToDelete(null);
                                  toast.success("Data berhasil dihapus");
                                }
                              }}
                            >
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      )}
                    </AlertDialog>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          {/* End Card */}
          {/* End Content */}
        </div>
      </Container>
      {/* Add Rekapitulasi */}
      <div className="w-full sticky bottom-0">
        <div className="flex items-center justify-center mx-auto bg-white shadow-md py-2 max-w-md">
          <Link to={"/create-rekapitulasi"}>
            <Button className="cursor-pointer" size={"lg"}>
              Tambah
              <Plus />
            </Button>
          </Link>
        </div>
      </div>
      {/* End Add Rekapitulasi */}
    </>
  );
};

export default RekapitulasiPage;
