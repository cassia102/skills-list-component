import { Dispatch, SetStateAction } from "react";
import { SuggestedSkillsProps } from "../utils/types"

export default function SuggestedSkills({ suggestedSkills, topFive, setTopFive }: { suggestedSkills: SuggestedSkillsProps; topFive: string[]; setTopFive: Dispatch<SetStateAction<string[]>> }) {

    const handleAdd = (e: string) => {
        const newTopFive = e;

        if(newTopFive && topFive.length < 5) {
            setTopFive((prevTopFive) => {
                if(!prevTopFive.includes(newTopFive)) {
                    return [...prevTopFive, newTopFive]
                }

                return prevTopFive;
            }
        )}
    }

    return (
        <div className="suggested-skills-list">
            <p className="suggested-skills--title">Suggested Skills</p>
            <ul className="suggested-skills--unordered-list">
                {suggestedSkills.map(suggested => (
                    <li key={suggested.id}>
                        <button onClick={() => handleAdd(suggested.name)}>+</button>
                        {suggested.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}