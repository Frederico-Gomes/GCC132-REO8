import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weight: number;
  height: number;

  constructor(private toastController: ToastController) {}

  isFormValid() {
    return (this.height && this.weight && this.height > 0 && this.weight > 0);
  }

  onCalculate() {
    const imc = this.weight / (this.height * this.height);
    let message = " ";
    if(imc < 18.5){
      message = "MAGREZA";
    }else if(imc < 25){
      message = "NORMAL";
    }else if(imc < 30){
      message = "SOBREPESO";
    }else if(imc < 40){
      message = "OBESIDADE";
    }else{
      message = "OBESIDADE GRAVE";
    }

    this.showMessage(`IMC = ${imc.toFixed(2)} - ${message}`);
  }

  async showMessage(msg: string) {
    const previousToast = await this.toastController.getTop();
    if (previousToast) {
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create(
      {
        message: msg,
        color: 'light',
        buttons: [
          {
            icon: 'close'
          }
        ]
      }
    );
    toast.present();
  }
}
