"use client";

import { escapeCPF } from "@/utils/escapeCPF";
import { useState } from "react";

type Props = {
    onSearchButton: (cpf: string) => void;
    loading: boolean;
};

export const SearchForm = ({ onSearchButton, loading }: Props) => {
    const [cpfInput, setCpfInput] = useState("");

    return (
        <div>
            <label className="block mb-3 text-xl" htmlFor="cpfInptu">
                Qual seu CPF?
            </label>
            <input
                type="text"
                inputMode="numeric"
                name="cpfInptu"
                id="cpfInptu"
                placeholder="Digite seu CPF"
                className="w-full p-3 bg-white text-black text-center text-4xl outline-none rounded-lg disabled:opacity-20"
                autoFocus
                value={cpfInput}
                onChange={(e) => setCpfInput(escapeCPF(e.target.value))}
                disabled={loading}
            />
            <button
                className="w-full p-3 mt-3 rounded-lg bg-blue-800 text-white text-4xl border-b-4 border-blue-600 active:border-0 disabled:opacity-20"
                onClick={() => onSearchButton(cpfInput)}
                disabled={loading}
            >
                {loading ? "Buscando" : "Buscar"}
            </button>
        </div>
    );
};
