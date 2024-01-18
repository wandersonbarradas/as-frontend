import { Group } from "@/types/Group";
import { ItemButton } from "../ItemButton";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import * as api from "@/api/admin";

type Prop = {
    item: Group;
    refreshAction: () => void;
    onEdit: (group: Group) => void;
};
export const GroupItem = ({ item, refreshAction, onEdit }: Prop) => {
    const handleDeleteButton = async () => {
        if (
            confirm(
                "Tem certeza de que deseja excluir este grupo? Esta ação também excluirá todas as pessoas associadas a este grupo.",
            )
        ) {
            await api.deleteGroup(item.id_event, item.id);
            refreshAction();
        }
    };
    return (
        <div className="border border-gray-700 bg-gray-900 rounded p-3 mb-3 flex items-center">
            <div className="flex-1">{item.name}</div>
            <ItemButton IconElement={FaRegEdit} onClick={() => onEdit(item)} />
            <ItemButton
                IconElement={FaRegTrashAlt}
                onClick={handleDeleteButton}
            />
        </div>
    );
};

export const GroupItemPlaceholder = () => {
    return (
        <div className="w-full h-16 border border-gray-700 rounded mb-3 bg-gradient-to-r from-gray-900 to-gray-950 animate-pulse"></div>
    );
};

export const GroupItemNotFound = () => {
    return (
        <div className="text-center py-4 text-gray-500">
            Não há grupos neste eventos
        </div>
    );
};
