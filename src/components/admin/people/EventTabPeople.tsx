import * as api from "@/api/admin";
import { Group } from "@/types/Group";
import { useEffect, useState } from "react";
import { GroupItemNotFound, GroupItemPlaceholder } from "../groups/GroupItem";
import { PersonComplete } from "@/types/PersonComplete";
import {
    PersonItem,
    PersonItemNotFound,
    PersonItemPlaceholder,
} from "./PersonItem";
import { PersonAdd } from "./PersonAdd";
import { PersonEdit } from "./PersonEdit";

type Props = {
    eventId: number;
};

export const EventTabPeople = ({ eventId }: Props) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<number>(0);
    const [groupLoading, setGroupLoading] = useState<boolean>(true);
    const [people, setPeople] = useState<PersonComplete[]>([]);
    const [peopleLoading, setPeopleLoading] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<PersonComplete>();

    useEffect(() => {
        loadGroups();
    }, []);

    useEffect(() => {
        loadPeople();
    }, [selectedGroupId]);

    const loadGroups = async () => {
        setSelectedGroupId(0);
        setGroupLoading(true);
        const groupsList = await api.getGroups(eventId);
        setGroupLoading(false);
        setGroups(groupsList);
    };

    //PEOPLE
    const loadPeople = async () => {
        setSelectedPerson(undefined);
        if (selectedGroupId <= 0) return;
        setPeople([]);
        setPeopleLoading(true);
        const peopleList = await api.getPeople(eventId, selectedGroupId);
        setPeopleLoading(false);
        setPeople(peopleList);
    };

    const handleEditButton = (person: PersonComplete) => {
        setSelectedPerson(person);
    };
    return (
        <div>
            <div className="my-3">
                {!groupLoading && groups.length > 0 && (
                    <select
                        onChange={(e) =>
                            setSelectedGroupId(parseInt(e.target.value))
                        }
                        className="w-full bg-transparent text-white text-xl p-3 outline-none"
                    >
                        <option className="bg-gray-800" value={0}>
                            Selecione um grupo
                        </option>
                        {groups.map((item) => (
                            <option className="bg-gray-800" value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                )}
                {groupLoading && <GroupItemPlaceholder />}
                {!groupLoading && groups.length === 0 && <GroupItemNotFound />}
            </div>
            {selectedGroupId > 0 && (
                <>
                    <div className="border border-dashed p-3 my-3">
                        {!selectedPerson && (
                            <PersonAdd
                                eventId={eventId}
                                groupId={selectedGroupId}
                                refreshAction={loadPeople}
                            />
                        )}
                        {selectedPerson && (
                            <PersonEdit
                                person={selectedPerson}
                                refreshAction={loadPeople}
                            />
                        )}
                    </div>
                    {!peopleLoading &&
                        people.length > 0 &&
                        people.map((item) => (
                            <PersonItem
                                key={item.id}
                                item={item}
                                onEdit={handleEditButton}
                                refreshAction={loadPeople}
                            />
                        ))}
                    {peopleLoading && (
                        <>
                            <PersonItemPlaceholder />
                            <PersonItemPlaceholder />
                            <PersonItemPlaceholder />
                        </>
                    )}
                    {!peopleLoading && people.length === 0 && (
                        <PersonItemNotFound />
                    )}
                </>
            )}
        </div>
    );
};
