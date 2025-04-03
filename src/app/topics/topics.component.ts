import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  Firestore,
  onSnapshot,
} from '@angular/fire/firestore';
import { Topic } from '../models';
import { DatePipe } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css',
})
export class TopicsComponent implements OnInit {

  constructor(private firebaseService:FirebaseService){}

  private firestore = inject(Firestore);
  public title: string = '';
  public content: string = '';
  private auth = inject(Auth);
  public topicID = 'zJGFiHIzkQl3BCncTe7X';
  public topics: Topic[] = [];

  public ngOnInit() {
    const refCollection = collection(this.firestore, 'Topic');
    onSnapshot(refCollection, (topics) => {
      this.topics = topics.docs
        .map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Topic, 'id'>),
        }))
        .sort((a, b) => b.date.toMillis() - a.date.toMillis());
    });    
  }

  newTopic() {
    const uid = this.auth.currentUser?.uid;
    if (uid) {
      this.firebaseService.newTopic(this.title, this.content, uid);
    }
  }
  
}
