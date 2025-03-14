import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

export default async function Dashboard() {
  const { userId } = await auth();
  if (!userId) {
    return;
  }
  const results = await db
    .select()
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(eq(Invoices.userId, userId));

  const invoices = results.map(({ invoices, customers }) => ({
    ...invoices,
    customer: customers,
  }));
  return (
    <main className="h-full text-center gap-6 my-12">
      <Container>
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p>
            <Button variant={"ghost"} className="inline-flex gap-2" asChild>
              <Link href="invoices/new">
                <CirclePlus className="size-4" />
                Create Invoice
              </Link>
            </Button>
          </p>
        </div>

        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] p-4">Date</TableHead>
              <TableHead className="p-4">Customer</TableHead>
              <TableHead className="p-4">Email</TableHead>
              <TableHead className="text-center p-4">Status</TableHead>
              <TableHead className="text-right p-4">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => {
              return (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium text-left">
                    <Link
                      href={`/invoices/${invoice.id}`}
                      className="font-semibold p-4"
                    >
                      {new Date(invoice.createTS).toLocaleDateString()}
                    </Link>
                  </TableCell>
                  <TableCell className="text-left">
                    <Link
                      href={`/invoices/${invoice.id}`}
                      className="font-semibold p-4"
                    >
                      {invoice.customer.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-left">
                    <Link href={`/invoices/${invoice.id}`} className="p-4">
                      {invoice.customer.email}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">
                    <Link
                      href={`/invoices/${invoice.id}`}
                      className="font-semibold p-4"
                    >
                      <Badge className="rounded-full">{invoice.status}</Badge>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/invoices/${invoice.id}`}
                      className="font-semibold p-4"
                    >
                      ${(invoice.value / 100).toFixed(2)}
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Container>
    </main>
  );
}
