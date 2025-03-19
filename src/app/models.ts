import { User } from "@angular/fire/auth";
import { Timestamp } from "@angular/fire/firestore";

export interface Plant {
    id: number;
    common_name: string;
    scientific_name: string;
    image_url: string;

}

export interface Topic {
    id: number;
    title: Text;
    content: Text;
    author: User;
    date: Timestamp;   
}

export interface Comment {
    id: number;
    content: Text;
    author: User;
    date: Date;
    topic: Topic;   

}