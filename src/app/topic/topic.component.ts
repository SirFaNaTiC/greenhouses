import { Component, inject, OnInit } from '@angular/core';
import { Topic, Comment } from '../models';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { addDoc, collection, deleteDoc, doc, Firestore, onSnapshot, query, where } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css',
})
export class TopicComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router , private firebaseService:FirebaseService) {}

  public topic: Topic | undefined;
  public id: string = '';
  private db = inject(Firestore);
  public content: string = '';
  public auth = inject(Auth);
  public comments: Comment[] = [];
  ngOnInit() {
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
       }))
       .sort((a, b) => b.date.toMillis() - a.date.toMillis());
      console.log(comments);
    });
  }
  
  newComment() {
    const uid = this.auth.currentUser?.uid;
    if (uid) {
      this.firebaseService.newComment( this.content, uid , this.id);
    }
  }

  public deleteTopic() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      deleteDoc(doc(this.db, 'Topic', this.id));
      this.router.navigate(['/topics']);
    });
  }

  public deleteComment(id: string) {
    deleteDoc(doc(this.db, 'Comment', id));
  }
}
