import { Injectable } from "@angular/core";
import { Firestore, collection, collectionData, DocumentData, CollectionReference} from "@angular/fire/firestore";
import { Topic } from "../app/models";

@Injectable()
export class TopicService {
    topicCollection: CollectionReference<Topic>
    constructor(public afs: Firestore){
        this.topicCollection = collection(this.afs, 'topics') as CollectionReference<Topic>;
    }
}