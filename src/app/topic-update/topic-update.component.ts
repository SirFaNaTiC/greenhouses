import { Component, inject } from '@angular/core';
import { doc, Firestore, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from '../models';

@Component({
  selector: 'app-topic-update',
  templateUrl: './topic-update.component.html',
  styleUrl: './topic-update.component.css'
})
export class TopicUpdateComponent {
  title: Text | undefined;
  public topic: Topic | undefined;
  content: Text | undefined;
  id: string | null = null;
  private db = inject(Firestore);

  constructor(private route: ActivatedRoute, public router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
      if (this.id) {
        const topicRef = doc(this.db, 'Topic', this.id);
        onSnapshot(topicRef, (topic) => {
          this.topic = topic.data() as Topic;
          if (this.topic) {
            this.title = this.topic.title;
            this.content = this.topic.content;
          }
          console.log(this.topic);
        });
      }
    });
  }

  editTopic(): void {
    if (this.id) {
      const topicRef = doc(this.db, 'Topic', this.id);
      updateDoc(topicRef, {
        title: this.title,
        content: this.content
      }).then(() => {
        console.log('Topic mis à jour avec succès');
        this.router.navigate(['/topic', this.id]);
      }).catch(error => {
        console.error('Erreur lors de la mise à jour :', error);
      });
    }
  }
}
