import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-files',
  templateUrl: './send-files.component.html',
  styleUrls: ['./send-files.component.scss']
})
export class SendFilesComponent implements OnInit {
  projectId: number;
  constructor(private route: Router) { }
  url: string;

  ngOnInit() {
    const urlArr = this.route.url.split("/");
    this.projectId = Number(urlArr[3]);
    this.projectId.toString();
    this.url = "http://localhost:53042/api/Files/Upload/" + this.projectId;
    console.log(this.url);
  }

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.txt,.pdf,.docx",
    maxSize: "1",
    uploadAPI:  {
      url:"http://localhost:53042/api/Files/Upload/" + this.getProjectId(),
      method:"POST",
    },
    theme: "dragNDrop",
    hideProgressBar: false,
    hideResetBtn: false,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Wybierz plik',
      resetBtn: 'Reset',
      uploadBtn: 'Prześlij',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Załącz pliki...',
      afterUploadMsg_success: 'Pomyślnie przesłano pliki',
      afterUploadMsg_error: 'Przesyłanie zakończone niepowodzeniem'
    }
  };

  getProjectId() {
    const urlArr = this.route.url.split("/");
    return Number(urlArr[3]).toString();
  }

  goBack() {
    window.history.back();
  }

}
