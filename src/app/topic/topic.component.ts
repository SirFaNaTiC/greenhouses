import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent {
  private firestore = inject(Firestore);
  private fireguard = inject(Firestore);
  public title: string = '';
  public content: string = '';
  private auth = inject(Auth);

  public newTopic() {
    const today = new Date();
    const refCollection = collection(this.firestore, 'topic');
    addDoc(refCollection, {
        title: this.title,
        content: this.content,
        author: this.auth.currentUser?.uid,
        date: today,
    }).then((docRef) => console.log('Written docID is:', docRef.id ))
  }





}
