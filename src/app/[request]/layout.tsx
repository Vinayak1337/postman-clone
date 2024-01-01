export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-grow flex border-t relative z-0 top-10">
      {children}
    </div>
  );
}
