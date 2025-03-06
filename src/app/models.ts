import { User } from "@angular/fire/auth";

export interface Plant {
    id: number;
    common_name: string;
    scientific_name: string;
}

export interface Topic {
    id: number;
    title: Text;
    content: Text;
    author: User;
    date: Date;   
}

export interface Comment {
    id: number;
    content: Text;
    author: User;
    date: Date;
    topic: Topic;   
}