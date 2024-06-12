import { useEffect, useState } from "react";

import { techStack } from '../utils/data';
import { TechStackItem } from "../utils/types";
import SuggestedSkills from "./SuggestedSkills";
import SkillsList from "./SkillsList";

export default function Wrapper() {
    const [skills, setSkills] = useState<TechStackItem[]>(techStack);
    const [suggestedSkills, setSuggestedSkills] = useState<TechStackItem[]>([]);
    const [topFive, setTopFive] = useState<string[]>([]);

    useEffect(() => {
        let isMounted = true;
        const suggestedArr: TechStackItem[] = [];

        do {
            const randomNumber: number = Math.floor(Math.random() * skills.length);
            const randomSkill = skills[randomNumber];

            const checkedDuplicates = suggestedArr.filter((e) => {
                return e.id === randomSkill.id
            })

            if(randomSkill && !checkedDuplicates.length) {
                suggestedArr.push(randomSkill)
            }

        } while (suggestedArr.length < 7)

        if (isMounted) {
            setSuggestedSkills(suggestedArr);
        }

        return () => {
            isMounted = false;
        }

    }, [skills])

    return (
        <>
            <div className="skills-list-wrapper">
                <SkillsList skills={skills} topFive={topFive} setTopFive={setTopFive}/>
            </div>
            <div className="suggested-skills-wrapper">
                <SuggestedSkills suggestedSkills={suggestedSkills} topFive={topFive} setTopFive={setTopFive}/>
            </div>
        </>
    )
}