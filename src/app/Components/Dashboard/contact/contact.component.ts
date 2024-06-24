import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_DASHBOARD } from '../../../Constants/path';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private router:Router){}

  handleSubmitContact(){
    this.router.navigate([PATH_DASHBOARD])
  }

}
