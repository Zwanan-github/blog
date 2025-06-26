export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="max-w-screen-lg h-[calc(90vh)] md:w-4/6 w-full sm:w-6/7 mx-auto">
            <div className="p-2 w-full h-full">
                {children}
            </div>
        </main>
    )
}