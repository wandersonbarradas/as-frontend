"use client";

import { Button } from "@/components/admin/Button";
import { InputField } from "@/components/admin/InputField";
import { useState } from "react";
import * as api from "@/api/admin";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const Page = () => {
    const router = useRouter();

    const [passwordInput, setPasswordInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState("");

    const handleLoginButton = async () => {
        if (passwordInput) {
            setWarning("");
            setLoading(true);
            const token = await api.login(passwordInput);
            setLoading(false);

            if (!token) {
                setWarning("Acesso negado!");
            } else {
                setCookie("token", token);
                router.push("/admin");
            }
        }
    };

    return (
        <div className="text-center py-4">
            <p className="text-lg">Qual a senha secreta?</p>
            <div className="mx-auto max-w-lg">
                <InputField
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Digite a senha"
                    disabled={loading}
                />
                <Button
                    value={loading ? "Carregando..." : "Entrar"}
                    onClick={handleLoginButton}
                    disabled={loading}
                />
                {warning && (
                    <div className="border border-dashed border-red-600 text-red-600 p-3">
                        {warning}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
