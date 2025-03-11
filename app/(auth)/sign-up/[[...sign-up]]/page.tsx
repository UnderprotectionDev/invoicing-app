import { Container } from "@/components/container";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <Container>
      <div className="flex justify-center items-center h-full">
        <SignUp />
      </div>
    </Container>
  );
}
