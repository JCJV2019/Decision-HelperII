import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pregunta } from 'src/app/shared/clases/preguntas';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  //public lasPreguntas$: Observable<any>;
  public lasPreguntas: any;
  public idUser: string;
  public nombreUsuario: string;

  public pregunta: Pregunta = {
    id: '',
    question: '',
    user: ''
  };

  public preguntaData: Pregunta = {
    id: '',
    question: '',
    user: ''
  };

  constructor(private api: ApiService, private auth: AuthService, private routeOut: Router) {}

  ngOnInit() {
    this.idUser = this.auth.getUser();
    this.nombreUsuario = this.auth.getName();
    console.log("ngOnInit",this.idUser,this.nombreUsuario);
    this.lasPreguntas = [];
    this.getPreguntas();
  }

  getPreguntas() {
    this.api.getPreguntas$(this.idUser).subscribe((serv: any) => {
      console.log("getPreguntas",serv);
      this.lasPreguntas = serv;
    // tslint:disable-next-line: no-unused-expression
    }), (err: any) => { console.log(err); };
  }

  editQuestion(item) {
    this.preguntaData.id = item._id;
    this.preguntaData.question = item.question;
    this.preguntaData.user = item.user;
    this.api.editPregunta$(this.preguntaData).subscribe(response => {
      this.getPreguntas();
    },(err) => { console.log(err); });
  }

  deleteQuestion(item) {
    this.deletePregunta(item).then(_ => {
      this.deletePositivos(item);
      this.deleteNegativos(item);
    });

    this.routeOut.onSameUrlNavigation = 'reload';
    this.routeOut.navigate(['/question-list']);
    // otra forma de hacerlo, hace el onInit
    //this.routeOut.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() =>
    //this.routeOut.navigate(['/question-list']));
  }

  async deletePregunta(item) {
    await this.api.deletePregunta$(item).toPromise().then(data => {
      console.log('DeletePregunta', data);
    }).catch((err) => { console.log(err); });
  }

  deletePositivos(item) {
    this.api.deletePositivos$(item).subscribe(data => {
    }), (err) => { console.log(err); };
  }

  deleteNegativos(item) {
    this.api.deleteNegativos$(item).subscribe(data => {
    }), (err) => { console.log(err); };
  }

  selectQuestion(item) {
    this.auth.setQuestion(item);
    this.routeOut.navigate(['/member-list']);
  }

  newQuestion() {
    sessionStorage.removeItem('currentQuestion');
    this.routeOut.navigate(['/member-list']);
  }

}
