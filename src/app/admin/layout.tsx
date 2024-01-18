import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Amigo Secreto - Admin",
};

type Props = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
    return (
        <div className="">
            <header className="bg-gray-800 text-center py-5">
                <h3 className="text-3xl mb-2">Amigo Secreto</h3>
                <h4 className="text-base">Painel de Controle</h4>
            </header>

            <main className="mx-auto w-full max-w-3xl p-3">{children}</main>
        </div>
    );
}
