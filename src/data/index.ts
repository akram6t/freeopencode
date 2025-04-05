import { PROGRAMMING_LANGUAGES_DATA, ProgrammingLaguage } from "./languages";
import { Platform, PLATFORMS_DATA } from "./platforms";
import { TECHNOLOGIES_DATA, Technology, TECHNOLOGY_TYPES_DATA } from "./technologies"

export const getTechnologies = (): Technology[] => TECHNOLOGIES_DATA;
export const getTechnologyTypes = (): Technology[] => TECHNOLOGY_TYPES_DATA;
export const getPlatforms = (): Platform[] => PLATFORMS_DATA;
export const getProgrammingLanguages = (): ProgrammingLaguage[] => PROGRAMMING_LANGUAGES_DATA;


export const getTechnologiesByIds = (ids: string[]): Technology[] => {
    return TECHNOLOGIES_DATA.filter(
        (technology: Technology) => ids.includes(technology.id.toString())
    );
};

export const getTechnologyTypesByIds = (ids: string[]): Technology[] => {
    return TECHNOLOGY_TYPES_DATA.filter(
        (technologyType: Technology) => ids.includes(technologyType.id.toString())
    );
};

export const getPlatformsByIds = (ids: string[]): Platform[] => {
    return PLATFORMS_DATA.filter(
        (platform: Platform) => ids.includes(platform.id.toString())
    );
};

export const getProgrammingLanguagesByIds = (ids: string[]): ProgrammingLaguage[] => {
    return PROGRAMMING_LANGUAGES_DATA.filter(
        (language: ProgrammingLaguage) => ids.includes(language.id.toString())
    );
};