"use client";
import { Event } from "@/types/Event";
import { useState } from "react";
import { EventTabInfo } from "./EventTabInfo";
import { EventTabGroups } from "../groups/EventTabGroups";
import { EventTabPeople } from "../people/EventTabPeople";

type TabNames = "info" | "groups" | "people";
type Props = {
    event: Event | undefined;
    refreshAction: () => void;
};
export const EventEdit = ({ event, refreshAction }: Props) => {
    if (!event) return;
    const [tab, setTab] = useState<TabNames>("info");
    return (
        <div>
            <div className="flex text-center border-b border-gray-500 cursor-pointer">
                <div
                    className={`flex-1 p-3 hover:bg-gray-700 ${
                        tab === "info" ? "bg-gray-600" : ""
                    }`}
                    onClick={() => setTab("info")}
                >
                    Informações
                </div>
                <div
                    className={`flex-1 p-3 hover:bg-gray-700 ${
                        tab === "groups" ? "bg-gray-600" : ""
                    }`}
                    onClick={() => setTab("groups")}
                >
                    Grupos
                </div>
                <div
                    className={`flex-1 p-3 hover:bg-gray-700 ${
                        tab === "people" ? "bg-gray-600" : ""
                    }`}
                    onClick={() => setTab("people")}
                >
                    Pessoas
                </div>
            </div>
            <div>
                {tab === "info" && (
                    <EventTabInfo event={event} refreshAction={refreshAction} />
                )}
                {tab === "groups" && <EventTabGroups eventId={event.id} />}
                {tab === "people" && <EventTabPeople eventId={event.id} />}
            </div>
        </div>
    );
};
