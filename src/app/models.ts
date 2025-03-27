import { User } from "@angular/fire/auth";
import { Timestamp } from "@angular/fire/firestore";

export interface Plant {
    id: number;
    common_name: string;
    scientific_name: string;
    image_url: string;

}

export interface Topic {
    id: string;
    title: Text;
    content: Text;
    author: User;
    date: Timestamp;   
}

export interface Comment {
    content: string;
    author: User;
    date: Timestamp;
    topicId: Topic;   
}