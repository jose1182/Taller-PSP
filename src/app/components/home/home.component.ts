import { Component, OnInit } from '@angular/core';
import { UserResponseModel } from '../../model/user.respond.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  page: number;
  totalPages: number;
  loading: boolean = true;

  uResponse!: UserResponseModel;


  constructor(private userService: UsersService) {

    this.page = 0;
    this.totalPages = 0;

   }

  ngOnInit(): void {

    this.updateData();
  }

  updateData(): void{
    this.loading = true;
    this.userService.getUsers(this.page).subscribe(r=>{
      console.log('respond: ', r)
      this.uResponse = r;
      this.totalPages = this.uResponse.total_pages *10;
      this.loading = false;
    })
  }

}
