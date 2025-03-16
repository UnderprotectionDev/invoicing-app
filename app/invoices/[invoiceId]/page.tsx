import { notFound } from "next/navigation";
import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";
import { and, eq, isNull } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import Invoice from "./invoice";

type InvoicePageProps = {
  params: Promise<{
    invoiceId: string;
  }>;
};

export default async function InvoicePage({ params }: InvoicePageProps) {
  const { userId, orgId } = await auth();
  if (!userId) {
    return;
  }
  const invoiceId = parseInt((await params).invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error("Invalid invoice ID");
  }

  let invoice;
  if (orgId) {
    [invoice] = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(
        and(eq(Invoices.id, invoiceId), eq(Invoices.organizationId, orgId))
      )
      .limit(1);
  } else {
    [invoice] = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(
        and(
          eq(Invoices.id, invoiceId),
          eq(Invoices.userId, userId),
          isNull(Invoices.organizationId)
        )
      )
      .limit(1);
  }

  if (!invoice) {
    notFound();
  }

  const invoices = {
    ...invoice.invoices,
    customer: invoice.customers,
  };

  return <Invoice invoice={invoices} />;
}
