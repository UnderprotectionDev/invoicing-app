import { Customers, Invoices } from "@/db/schema";
import { Container } from "@/components/container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, CreditCard, Ellipsis, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AVAILABLE_STATUSES } from "@/data/invoices";
import { deleteInvoiceAction, updateStatusAction } from "@/actions";
import { useOptimistic } from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { and, eq, isNull } from "drizzle-orm";
import { notFound } from "next/navigation";

type PaymentPageProps = {
  params: Promise<{
    invoiceId: string;
  }>;
  searchParams: Promise<{
    session_id: string;
    status: string;
  }>;
};

export default async function Invoice({
  params,
  searchParams,
}: PaymentPageProps) {
  const { userId, orgId } = await auth();
  if (!userId) {
    return;
  }
  const invoiceId = parseInt((await params).invoiceId);

  const sessionId = (await searchParams).session_id;
  const isSuccess = sessionId && (await searchParams).status === "success";
  const isCanceled = (await searchParams).status === "canceled";
  let isError = isSuccess && !sessionId;

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

  return (
    <main className="w-full h-full">
      <Container>
        {isError && (
          <p className="bg-red-100 text-sm text-red-800 text-center px-3 py-2 rounded-lg mb-6">
            Something went wrong, please try again!
          </p>
        )}
        {isCanceled && (
          <p className="bg-yellow-100 text-sm text-yellow-800 text-center px-3 py-2 rounded-lg mb-6">
            Payment was canceled, please try again.
          </p>
        )}
        <div className="grid grid-cols-2">
          <div>
            <div className="flex justify-between mb-8">
              <h1 className="flex items-center gap-4 text-3xl font-semibold">
                Invoice {invoices.id}
                <Badge
                  className={cn(
                    "rounded-full capitalize",
                    invoices.status === "open" && "bg-blue-500",
                    invoices.status === "paid" && "bg-green-600",
                    invoices.status === "void" && "bg-zinc-700",
                    invoices.status === "uncollectible" && "bg-red-600"
                  )}
                >
                  {invoices.status}
                </Badge>
              </h1>
            </div>

            <p className="text-3xl mb-3">
              ${(invoices.value / 100).toFixed(2)}
            </p>

            <p className="text-lg mb-8">{invoices.description}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Invoice</h2>
            {invoices.status === "open" && (
              <form action={createPayment}>
                <input type="hidden" name="id" value={invoices.id} />
                <Button className="flex gap-2 font-bold bg-green-700">
                  <CreditCard className="w-5 h-auto" />
                  Pay Invoice
                </Button>
              </form>
            )}
            {invoices.status === "paid" && (
              <p className="flex gap-2 items-center text-xl font-bold">
                <Check className="w-8 h-auto bg-green-500 rounded-full text-white p-1" />
                Invoice Paid
              </p>
            )}
          </div>
        </div>

        <h2 className="font-bold text-lg mb-4">Billing Details</h2>

        <ul className="grid gap-2">
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice ID
            </strong>
            <span>{invoices.id}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice Date
            </strong>
            <span>{new Date(invoices.createTS).toLocaleDateString()}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Name
            </strong>
            <span>{invoices.customer.name}</span>
          </li>
        </ul>
      </Container>
    </main>
  );
}
