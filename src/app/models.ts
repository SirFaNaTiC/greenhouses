import { User } from "@angular/fire/auth";
import { Timestamp } from "@angular/fire/firestore";

export interface Plant {
    id: number;
    main_species_id: number;
    common_name: string;
    scientific_name: string;
    image_url: string;
    family?:{ name:string} ;
    genus?:{ name:string}
    species?:{ name:string}
    growth_habit?: string;
    native_status?: string;
    flower_color?: string;
    foliage_color?: string;
    toxicity?: string;
    medicinal?: boolean;
    edible?: boolean;
}

export interface Greenhouse {
    id: string;
    name: string;
    plants:  [{id:number}];
}

export interface GreenhouseSelected {
    name: string;
    selectedName: string;
}


export interface Favorites {
    id: string;
    plants:  [{id:number}];
}

export interface Greenhouses{
    greenhouses: Greenhouse[];
}

export interface Topic {
    id: string;
    title: Text;
    content: Text;
    author: string;
    date: Timestamp;   
}

export interface Comment {
    id: string;
    content: string;
    author: string;
    date: Timestamp;
    topicId: Topic;   
}