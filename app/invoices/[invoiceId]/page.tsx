import { notFound } from "next/navigation";
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

  if (isNaN(invoiceId)) {
    throw new Error("Invalid invoice ID");
  }

  const [invoice] = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  if (!invoice) {
    notFound();
  }

  return (
    <main className="flex flex-col justify-center h-full text-center gap-6 max-w-5xl mx-auto my-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Invoices #{invoiceId}</h1>
        <p className="text-3xl mb-3">${(invoice.value / 100).toFixed(2)}</p>

        <p className="text-lg mb-8">{invoice.description}</p>

        <h2 className="font-bold text-lg mb-4">Billing Details</h2>

        <ul className="grid gap-2">
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice ID
            </strong>
            <span>{invoice.id}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice Date
            </strong>
            <span>{new Date(invoice.createTS).toLocaleDateString()}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Name
            </strong>
            <span>John Doe</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Email
            </strong>
            <span>john.doe@example.com</span>
          </li>
        </ul>
      </div>
    </main>
  );
}
