interface AppProps {
  children: React.ReactNode;
}


export const Layout = ({children}: AppProps) => {
  return (
    <div className="bg-gray-900 text-white h-[calc(100vh-4rem)]">
      <main className="h-5/6 px-28 py-10">{children}</main>
    </div>
  )
}
