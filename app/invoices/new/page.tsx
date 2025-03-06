import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewInvoice() {
  return (
    <main className="flex flex-col justify-center h-full gap-6 max-w-5xl mx-auto my-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Create Invoice</h1>
      </div>

      <form className="grid gap-4 max-w-sm">
        <div>
          <Label className="block font-semibold text-sm mb-2">
            Billing Name
          </Label>
          <Input type="text" />
        </div>
        <div>
          <Label className="block font-semibold text-sm mb-2">
            Billing Email
          </Label>
          <Input type="email" />
        </div>
        <div>
          <Label className="block font-semibold text-sm mb-2">Value</Label>
          <Input type="number" />
        </div>
        <div>
          <Label className="block font-semibold text-sm mb-2">
            Description
          </Label>
          <Textarea></Textarea>
        </div>
      </form>
    </main>
  );
}
