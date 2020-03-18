import { Component, OnInit } from '@angular/core';
import { UploadFileService } from './upload-file.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files: Set<File>;

  constructor(private service: UploadFileService) { }

  ngOnInit(): void {
  }

  onChange(event) {
    console.log(event);

    const selectedFiles = <FileList>event.srcElement.files;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }

    document.getElementById('customFileLabel').innerHTML = fileNames.join(' ,');
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service.upload(this.files, 'http://localhost:8000/saveFile')
      .subscribe(data => {
        console.log(data);
        document.getElementById('customFileLabel').innerHTML = 'Choose file';
        this.files = new Set();
        Swal.fire(
          'Sucesso',
          'Arquivo salvo com sucesso!',
          'success'
        );
      }, er => {
        Swal.fire(
          'Opss..',
          'Erro ao salvar o arquivo!',
          'error'
        );
      });
    }
  }

}
