import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.page.html',
  styleUrls: ['./master.page.scss'],
})
export class MasterPage implements OnInit {

  constructor(private firestoreService:FirestoreService) { }

  ngOnInit() {
    this.firestoreService.uploadDatabase();
  }

}
