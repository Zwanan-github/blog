export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <main className="max-w-screen-lg md:w-4/6 w-full sm:w-6/7 mx-auto">
                <div className="p-6">
                    {children}
                </div>
            </main>
        </>
    )
}