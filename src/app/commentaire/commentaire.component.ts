import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { addDoc, collection, collectionChanges, doc, Firestore, getDoc, onSnapshot } from '@angular/fire/firestore';
import { Comment } from '../models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrl: './commentaire.component.css'
})

export class CommentaireComponent implements OnInit{
  private firestore = inject(Firestore);
  public content: string = '';
  private auth = inject(Auth);
  public comments: Comment[] = [];
  
  public ngOnInit(){
    const refCollection = collection(this.firestore, 'Comment');
    onSnapshot(refCollection, (comments)=>{
      this.comments = (comments.docs.map(doc => doc.data() as Comment))
    })
  }

  public newComment() {
    const today = new Date();
    const refCollection = collection(this.firestore, 'Comment');
    addDoc(refCollection, {
        content: this.content,
        author: this.auth.currentUser?.uid,
        date: today,
    }).then((docRef) => console.log('Written docID is:', docRef.id ))
  }
}

