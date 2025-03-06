import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

export default function NewInvoice() {
  return (
    <main className="flex flex-col justify-center h-full text-center gap-6 max-w-5xl mx-auto my-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Create Invoice</h1>
        <p>
          <Button variant={"ghost"} className="inline-flex gap-2" asChild>
            <Link href="invoices/new">
              <CirclePlus className="size-4" />
              Create Invoice
            </Link>
          </Button>
        </p>
      </div>
    </main>
  );
}
