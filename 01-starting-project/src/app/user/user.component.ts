import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  // imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent{
  @Input() avatar!: string;
  @Input() name!: string;

  get imagePath(){
    return 'assets/users/'+this.avatar;
  }

  onSelectUser(){

  }
}













// import { Component, computed, signal } from '@angular/core';

// import {DUMMY_USERS} from '../dummy-users';

// const randomIndex = Math.floor(Math.random()*DUMMY_USERS.length);
// @Component({
//   selector: 'app-user',
//   standalone: true,
//   // imports: [],
//   templateUrl: './user.component.html',
//   styleUrl: './user.component.css'
// })
// export class UserComponent {

//   // selectedUser = DUMMY_USERS[randomIndex];
//   selectedUser = signal(DUMMY_USERS[randomIndex]);

//   // get imagePath(){
//   //   return 'assets/users/'+this.selectedUser.avatar;
//   // }

//   imagePath = computed(()=> 'assets/users/'+this.selectedUser().avatar )

//   onSelectUser(){
//     // console.log("Clicked!");
//     const randomIndex = Math.floor(Math.random()*DUMMY_USERS.length);
//     this.selectedUser.set(DUMMY_USERS[randomIndex]);
//   }
// }
