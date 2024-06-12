import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { SkillsListProps } from "../utils/types";

export default function SkillsList({ skills, topFive, setTopFive }: { skills: SkillsListProps; topFive: string[]; setTopFive: Dispatch<SetStateAction<string[]>> }) {
    const [filter, setFilter] = useState("");

    const handleSelect = (e: string) => {
        const newTopFive = e;

        if (newTopFive && topFive.length < 5) {
            setTopFive((prevTopFive) => {
                if (!prevTopFive.includes(newTopFive)) {
                    return [...prevTopFive, newTopFive];
                }
                return prevTopFive;
            });
        }
    };

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value.toLowerCase());
    };

    const handleDropdown = () => {
        const dropdown = document.getElementById('skills-dropdown-options');
        dropdown?.classList.toggle('active');
    };

    const handleDelete = (e: string) => {
        setTopFive(prevTopFive => prevTopFive.filter(skill => skill !== e));
    };

    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(topFive);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTopFive(items);
    };

    useEffect(() => {
        const addSkill = document.getElementById('add-skill-wrapper');
        if (topFive.length >= 5) {
            addSkill?.classList.add('is-hidden');
        } else {
            addSkill?.classList.remove('is-hidden');
        }
    }, [topFive]);

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="topFive">
                {(provided) => (
                    <div
                        className="top-skills-list"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        <ul>
                            {topFive.map((top, index) => (
                               
                                <Draggable key={top} draggableId={top} index={index}>
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <p>{index + 1}. {top}</p>
                                            <button onClick={() => handleDelete(top)}>+</button>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>

                        <div id="add-skill-wrapper" className="dropdown-wrapper">
                            <input type="text" onInput={handleFilter} value={filter} placeholder="Add Skill" />
                            <button onClick={handleDropdown}><i className="icon-angle-down"></i></button>
                            <div id="skills-dropdown-options" className="skills-dropdown-options">
                                {skills.filter((skill) => skill.name.toLowerCase().includes(filter)).map((skill) => (
                                    <a key={skill.id} onClick={() => handleSelect(skill.name)}>{skill.name}</a>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
