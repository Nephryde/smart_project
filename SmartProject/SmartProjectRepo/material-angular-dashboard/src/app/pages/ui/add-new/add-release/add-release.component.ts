import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'app/services/project.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-release',
  templateUrl: './add-release.component.html',
  styleUrls: ['./add-release.component.scss']
})
export class AddReleaseComponent implements OnInit {
  myForm: FormGroup;
  projectId: number;

  constructor(private fb: FormBuilder, private projectService: ProjectService, private route: Router, private toastr: ToastrService) { }

  ngOnInit() {
    const urlArr = this.route.url.split("/");
    this.projectId = Number(urlArr[3]);

    this.initForm();
  }

  initForm() {
    this.myForm = this.fb.group({
      Name :['', Validators.required],
      ProjectId :[this.projectId],
      DeadlineDate :[''],
    });
  }

  addNewRelease() {
    this.projectService.addRelease(this.myForm).subscribe(
      (res:any) => {
        console.log(res);
        if(res){
          this.myForm.reset();
          this.toastr.success('Projekt został pomyślnie dodany.', 'Sukces', );
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
