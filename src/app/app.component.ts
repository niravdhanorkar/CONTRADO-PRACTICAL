import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'contrado-practical';
  searchText: string;
  selectedRows: number;
  userList: any = [];
  repoList: any = [];

  @ViewChild('searchTextRef') searchElement: ElementRef;

  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  ngAfterViewInit(): void {
    this.searchElement.nativeElement.focus();
  }

  searchUsers(): void {
    if (this.searchText) {
      // check searchText user exist in list or not.
      if (this.userList.some((obj) => obj.login === this.searchText)) {
        this.toastr.info('User already searched and it is exist in list.');
        return;
      }

      this.apiService.getUserByName(this.searchText).subscribe(
        (data: any) => {
          this.userList.push(data);
          this.searchRepo(data.repos_url, this.userList.length - 1);
          this.searchText = '';
        },
        (error) => {
          this.toastr.error(`User ${error.statusText}`);
          console.log(error);
        }
      );
    }
  }

  searchRepo(reposUrl: string, selRowIndex: number): void {
    this.apiService.getRepolistFromUrl(reposUrl).subscribe(
      (data: any) => {
        // displaying top 5 records of having star count in decending order
        this.repoList = data
          .sort((a, b) => {
            if (a.stargazers_count > b.stargazers_count) {
              return -1;
            }
            if (a.stargazers_count < b.stargazers_count) {
              return 1;
            }
            return 0;
          })
          .slice(0, 5);
        this.selectedRows = selRowIndex;
      },
      (error) => {
        this.toastr.error(`Repo ${error.statusText}`);
      }
    );
  }
}
