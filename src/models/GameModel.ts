
export interface PcRequirements {
    minimum: string;
    recommended: string;
}

export interface MacRequirements {
    minimum: string;
    recommended: string;
}

export interface LinuxRequirements {
    minimum: string;
    recommended: string;
}

export interface Data {
    type: string;
    name: string;
    steam_appid: number;
    required_age: string;
    is_free: boolean;
    controller_support: string;
    dlc: number[];
    detailed_description: string;
    about_the_game: string;
    short_description: string;
    supported_languages: string;
    reviews: string;
    header_image: string;
    website: string;
    pc_requirements: PcRequirements;
    mac_requirements: MacRequirements;
    linux_requirements: LinuxRequirements;
    legal_notice: string;
    drm_notice: string;
}

export interface GameObject {
    success: boolean;
    data: Data;
}

