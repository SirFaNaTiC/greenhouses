import { Component, inject } from '@angular/core';
import { Topic, Comment } from '../models';
import { ActivatedRoute } from '@angular/router';
import { addDoc, collection, doc, Firestore, onSnapshot, query, where } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css',
})
export class TopicComponent {
  constructor(private route: ActivatedRoute) {}
  public topic: Topic | undefined;
  public id: string = '';
  private db = inject(Firestore);
  public content: string = '';
  private auth = inject(Auth);
  public comments: Comment[] = [];
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
      const topicRef = doc(this.db, 'Topic', this.id);
      onSnapshot(topicRef, (topic) => {
        this.topic = topic.data() as Topic;
        console.log(this.topic);

      });
    });

    const refCollection = collection(this.db, 'Comment');
    const q = query(refCollection, where('topicId', '==', this.id));
    onSnapshot(q, (comments) => {
      this.comments = comments.docs.map((doc) => doc.data() as Comment);
      console.log(comments);
    });
  }
  public newComment() {
    const today = new Date();
    const refCollection = collection(this.db, 'Comment');
    addDoc(refCollection, {
        content: this.content,
        author: this.auth.currentUser?.uid,
        date: today,
        topicId: this.id,
    }).then((docRef) => console.log('Written docID is:', docRef.id ))
  }

}
