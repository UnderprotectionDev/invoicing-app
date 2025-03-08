import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { eq } from "drizzle-orm";

type InvoicePageProps = {
  params: Promise<{
    invoiceId: string;
  }>;
};

export default async function InvoicePage({ params }: InvoicePageProps) {
  const invoiceId = parseInt((await params).invoiceId);
  const result = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.id, invoiceId))
    .limit(1);
  console.log(result);
  return (
    <main className="flex flex-col justify-center h-full text-center gap-6 max-w-5xl mx-auto my-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Invoices #{invoiceId}</h1>
        <p></p>
      </div>
    </main>
  );
}
