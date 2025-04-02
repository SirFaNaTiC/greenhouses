import { Component, inject } from '@angular/core';
import { Topic, Comment } from '../models';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { addDoc, collection, deleteDoc, doc, Firestore, onSnapshot, query, where } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css',
})
export class TopicComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}
  public topic: Topic | undefined;
  public id: string = '';
  private db = inject(Firestore);
  public content: string = '';
  public auth = inject(Auth);
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
      this.comments = comments.docs.map((doc) => ({
        id: doc.id,
      ...(doc.data() as Omit<Comment, 'id'>),
       }));
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

  public deleteTopic() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
      deleteDoc(doc(this.db, 'Topic', this.id));
      this.router.navigate(['/topics']);
    });
  }

  public deleteComment(id: string) {
    console.log(id);
    deleteDoc(doc(this.db, 'Comment', id));
  }
}
