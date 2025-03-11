import { Container } from "@/components/container";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <Container>
      <div className="flex justify-center items-center h-full">
        <SignIn />
      </div>
    </Container>
  );
}
