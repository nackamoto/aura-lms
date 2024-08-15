type LayoutProps = {
  children: React.ReactNode;
};
export default async function LayoutAuth({ children }: LayoutProps) {
  return (
    <main className="flex h-screen items-center justify-center">
      {children}
    </main>
  );
}
