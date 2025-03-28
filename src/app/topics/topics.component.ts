import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionChanges,
  doc,
  Firestore,
  getDoc,
  onSnapshot,
} from '@angular/fire/firestore';
import { Topic } from '../models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-topic',
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css',
})
export class TopicsComponent implements OnInit {
  private firestore = inject(Firestore);
  public title: string = '';
  public content: string = '';
  private auth = inject(Auth);
  public topicID = 'zJGFiHIzkQl3BCncTe7X';
  public topics: Topic[] = [];

  public ngOnInit() {
    const refCollection = collection(this.firestore, 'Topic');
    onSnapshot(refCollection, (topics) => {
      this.topics = topics.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Topic, 'id'>),
      }));
    });
  }

  public newTopic() {
    const today = new Date();
    const refCollection = collection(this.firestore, 'Topic');
    addDoc(refCollection, {
      title: this.title,
      content: this.content,
      author: this.auth.currentUser?.uid,
      date: today,
    }).then((docRef) => console.log('Written docID is:', docRef.id));
  }
}
