import { Container } from "./container";

export function Footer() {
  return (
    <footer className="mt-12 mb-8">
      <Container className="flex justify-between gap-4">
        <p className="text-sm">
          Invoicipedia &copy; {new Date().getFullYear()}
        </p>
        <p className="text-sm">Next.js, Xata, and Clerk</p>
      </Container>
    </footer>
  );
}
