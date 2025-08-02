interface LayoutProps {
  children: React.ReactNode;
  modal?: React.ReactNode;
}
export default function Layout({ children, modal }: LayoutProps) {
  console.log("Modal:", modal);
  return (
    <div>
      <div>{children}</div>
      {modal}
    </div>
  );
}
