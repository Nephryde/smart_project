import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'app/services/project.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'app/services/task.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  myForm: FormGroup;
  taskId: number;
  
  constructor(private fb: FormBuilder, private taskService: TaskService, private route: Router, private toastr: ToastrService) { }

  ngOnInit() {
    const urlArr = this.route.url.split("/");
    this.taskId = Number(urlArr[3]);
    this.initForm();
  }

  initForm() {
    this.myForm = this.fb.group({
      taskId :[this.taskId],
      Content :['', Validators.required],
    });
  }

  addComment() {
    this.taskService.postComment(this.myForm).subscribe(
      (res:any) => {
        console.log(res);
        if(res){
          this.myForm.reset();        
          window.location.reload();
        } else {
            console.log("błąd");
        }
      },
      err => {
        this.toastr.error('Niepowodzenie', 'Wystąpił błąd.');
        console.log(err);
      }
    );
  }

}
