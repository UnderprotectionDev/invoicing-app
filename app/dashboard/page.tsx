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
import { Invoices } from "@/db/schema";
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
    .where(eq(Invoices.userId, userId));
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
            {results.map((result) => {
              return (
                <TableRow key={result.id}>
                  <TableCell className="font-medium text-left">
                    <Link
                      href={`/invoices/${result.id}`}
                      className="font-semibold p-4"
                    >
                      {new Date(result.createTS).toLocaleDateString()}
                    </Link>
                  </TableCell>
                  <TableCell className="text-left">
                    <Link
                      href={`/invoices/${result.id}`}
                      className="font-semibold p-4"
                    >
                      John Doe
                    </Link>
                  </TableCell>
                  <TableCell className="text-left">
                    <Link href={`/invoices/${result.id}`} className="p-4">
                      @example.com
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">
                    <Link
                      href={`/invoices/${result.id}`}
                      className="font-semibold p-4"
                    >
                      <Badge className="rounded-full">{result.status}</Badge>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/invoices/${result.id}`}
                      className="font-semibold p-4"
                    >
                      ${(result.value / 100).toFixed(2)}
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
