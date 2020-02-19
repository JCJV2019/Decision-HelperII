import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Positive } from 'src/app/shared/clases/positives';
import { Negative } from 'src/app/shared/clases/negatives';
import { Pregunta } from 'src/app/shared/clases/preguntas';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  //public itemsPositivos$: Observable<any>;
  //public itemsNegativos$: Observable<any>;
  public itemsPositivos: any;
  public itemsNegativos: any;

  public descripcion: string = '';
  public theQuestion: string = '';
  public puntos: number;
  public valorPuntos: any;
  public resultado: string = '';
  public puntuacionP: number = 0;
  public puntuacionN: number = 0;
  public inputQuestion = false;
  public messagePlace: string = '';
  public semaforo: number = 2;
  public options: any;

  public laPregunta: any;
  public idQuestion: string;
  public idUser: string;

  public itemPData: Positive = {
    id: '',
    desc: '',
    point: 0,
    question: '',
    user: ''
  };

  public itemNData: Negative = {
    id: '',
    desc: '',
    point: 0,
    question: '',
    user: ''
  };

  public itemP: Positive = {
    id: '',
    desc: '',
    point: 0,
    question: '',
    user: ''
  };

  public itemN: Negative = {
    id: '',
    desc: '',
    point: 0,
    question: '',
    user: ''
  };

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

  constructor(private api: ApiService, private auth: AuthService, private routeOut: Router) {
    this.valorPuntos = {
      O1: {
        label: '1',
        value: '1',
        name: 'valorPuntos'
      },
      O2: {
        label: '2',
        value: '2',
        name: 'valorPuntos'
      },
      O3: {
        label: '3',
        value: '3',
        name: 'valorPuntos'
      },
      O4: {
        label: '4',
        value: '4',
        name: 'valorPuntos'
      }
    };
  }

  ngOnInit() {
    this.idUser = this.auth.getUser();
    this.idQuestion = this.auth.getQuestion();
    this.itemsPositivos = [];
    this.itemsNegativos = [];

    this.getPregunta(this.idQuestion).then(_ => {
      this.getItemsPositivos(this.idQuestion);
      this.getItemsNegativos(this.idQuestion);
    });
  }

  newQuestion() {
    this.descripcion = '';
    this.theQuestion = '';
    this.puntos = 0;
    this.valorPuntos = 0;
    this.resultado = '';
    this.puntuacionP = 0;
    this.puntuacionN = 0;
    this.inputQuestion = false;

    this.deletePregunta(this.idQuestion).then(_ => {
      this.deletePositivos(this.idQuestion);
      this.deleteNegativos(this.idQuestion);
      this.idQuestion = null;
      this.itemsPositivos = [];
      this.itemsNegativos = [];
    });

    this.routeOut.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() =>
      this.routeOut.navigate(['/member-list']));
  }

  deletePositivos(item) {
    this.api.deletePositivos$(item).subscribe(data => {
    }), (err) => { console.log(err); };
  }

  deleteNegativos(item) {
    this.api.deleteNegativos$(item).subscribe(data => {
    }), (err) => { console.log(err); };
  }

  mirarQuestion() {
    if (this.theQuestion !== '' || this.theQuestion == undefined) {
      this.inputQuestion = true;
    }
  }

  async getPregunta(item) {
    await this.api.getPregunta$(item).toPromise().then((serv: any) => {
      this.laPregunta = serv;
      console.log('Pregunta', serv);
      if (serv._id) {
        this.idQuestion = serv._id;
        this.theQuestion = serv.question;
      }
      this.mirarQuestion();
    }).catch((err) => { console.log(err); });
  }

  getItemsPositivos(item) {
    if (item) {
      this.api.getItemsPositivos$(item).toPromise().then((serv: Array<any>) => {
        this.itemsPositivos = serv;
        if (serv.length > 0) {
          this.mirarQuestion();
        }
      }).catch((err) => { console.log(err); });
    }
  }

  getItemsNegativos(item) {
    if (item) {
      this.api.getItemsNegativos$(item).toPromise().then((serv: Array<any>) => {
        this.itemsNegativos = serv;
        if (serv.length > 0) {
          this.mirarQuestion();
        }
      }).catch((err) => { console.log(err); });
    }
  }

  async addPregunta() {
    this.pregunta.question = this.theQuestion;
    this.pregunta.user = this.idUser;
    this.preguntaData = Object.assign({}, this.pregunta);
    await this.api.addPregunta$(this.preguntaData).toPromise().then(response => {
      console.log('AddPregunta', response);
      this.idQuestion = response._id;
    }).catch((err) => { console.log(err); });
  }

  addPositivo() {
    if (this.verificarConcepto()) {
      this.itemP.desc = this.descripcion;
      this.itemP.point = this.puntos;
      this.itemP.user = this.idUser;
      if (!this.idQuestion) {
        // Grabamos la pregunta ya que no existe
        console.log('Antes de grabar q u', this.idQuestion, this.idUser);
        this.addPregunta().then(_ => {
          this.itemP.question = this.idQuestion;
          this.itemPData = Object.assign({}, this.itemP);
          this.api.addPositivo$(this.itemPData).subscribe(response => {
            this.getItemsPositivos(this.idQuestion);
            this.routeOut.navigate(['/member-list']);
          },(err) => { console.log(err); });
        });
      } else {
        this.itemP.question = this.idQuestion;
        this.itemPData = Object.assign({}, this.itemP);
        this.api.addPositivo$(this.itemPData).subscribe(response => {
          this.getItemsPositivos(this.idQuestion);
          this.routeOut.navigate(['/member-list']);
        },(err) => { console.log(err); });
      }
      this.descripcion = '';
      this.puntos = null;
    }
  }

  addNegativo() {
    if (this.verificarConcepto()) {
      this.itemN.desc = this.descripcion;
      this.itemN.point = this.puntos;
      this.itemN.question = this.idQuestion;
      this.itemN.user = this.idUser;
      if (!this.idQuestion) {
        // Grabamos la pregunta ya que no existe
        console.log('Antes de grabar q u', this.idQuestion, this.idUser);
        this.addPregunta().then(_ => {
          this.itemN.question = this.idQuestion;
          this.itemNData = Object.assign({}, this.itemN);
          this.api.addNegativo$(this.itemNData).subscribe(response => {
            this.getItemsNegativos(this.idQuestion);
            this.routeOut.navigate(['/member-list']);
          },(err) => { console.log(err); });
        });
      } else {
        this.itemN.question = this.idQuestion;
        this.itemNData = Object.assign({}, this.itemN);
        this.api.addNegativo$(this.itemNData).subscribe(response => {
          this.getItemsNegativos(this.idQuestion);
          this.routeOut.navigate(['/member-list']);
        },(err) => { console.log(err); });
      }
      this.descripcion = '';
      this.puntos = null;
    }
  }

  verificarConcepto() {
    if (this.descripcion == '' || this.descripcion == undefined || this.puntos == undefined) {
      this.messagePlace = 'todos los campos son obligatorios';
      return false;
    } else {
      this.messagePlace = '';
      return true;
    }
  }

  editPositivo(item) {
    if (this.verificarPuntuacion(item.point)) {
      this.itemPData.id = item._id;
      this.itemPData.desc = item.desc;
      this.itemPData.point = item.point;
      this.itemPData.question = item.question;
      this.itemPData.user = item.user;
      this.api.editPositivo$(this.itemPData).subscribe(response => {
        this.getItemsPositivos(this.idQuestion);
      },(err) => { console.log(err); });
    }
  }

  editNegativo(item) {
    if (this.verificarPuntuacion(item.point)) {
      this.itemNData.id = item._id;
      this.itemNData.desc = item.desc;
      this.itemNData.point = item.point;
      this.itemNData.question = item.question;
      this.itemPData.user = item.user;
      this.api.editNegativo$(this.itemNData).subscribe(response => {
        this.getItemsNegativos(this.idQuestion);
      },(err) => { console.log(err); });
    }
  }

  verificarPuntuacion(valorS: string) {
    const valor = parseInt(valorS, 10);
    if (valor >= 1 && valor <= 4) {
      return true;
    } else {
      console.log(valor);
      return false;
    }
  }

  async deletePregunta(item) {
    await this.api.deletePregunta$(item).toPromise().then(data => {
      console.log('DeletePregunta', data);
    }).catch((err) => { console.log(err); });
  }

  deletePositivo(item) {
    this.api.deletePositivo$(item).subscribe(data => {
      this.getItemsPositivos(this.idQuestion);
    },(err) => { console.log(err); });
  }

  deleteNegativo(item) {
    this.api.deleteNegativo$(item).subscribe(data => {
      this.getItemsNegativos(this.idQuestion);
    },(err) => { console.log(err); });
  }

  consejo() {
    let sumaP = 0;
    let sumaN = 0;
    for (let item of this.itemsPositivos) {
      sumaP += parseInt(item.point, 10);
    }
    for (let item of this.itemsNegativos) {
      sumaN += parseInt(item.point, 10);
    }

    const mediaG = (this.itemsPositivos.length + this.itemsNegativos.length) / 2;
    const mediaP = sumaP / mediaG; // this.itemsPositivos.length;
    const mediaN = sumaN / mediaG; // this.itemsNegativos.length;
    this.puntuacionP = parseFloat(((mediaP / (sumaP + sumaN)) * 100).toFixed(2));
    this.puntuacionN = parseFloat(((mediaN / (sumaP + sumaN)) * 100).toFixed(2));

    const diferencia = this.puntuacionP - this.puntuacionN;
    if (Math.abs(diferencia) > 1) {
      if (diferencia > 0) { this.semaforo = 3; } else { this.semaforo = 1; }
    } else {
      this.semaforo = 2;
    }
  }
}
