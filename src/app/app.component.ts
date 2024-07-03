import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NgClass,
    NgIf,
    NgFor,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calculator';
  display = '0';
  result = '';
  DarkMode = false;
  showHistory = false;
  LastOperations: string[] = [];

  toggleStory() {
    this.showHistory = !this.showHistory;
  }

  OperationHistory(operation: string) {
    this.LastOperations.unshift(operation);
    if (this.LastOperations.length > 3) {
      this.LastOperations.pop();
    }
  }

  toggleTheme() {
    this.DarkMode = !this.DarkMode;
  }

  calculate() {
    try {
      this.result = eval(this.display.replace('x', '*').replace('÷', '/')).toString();
      this.OperationHistory(this.display + ' =' + this.result);
    } catch (error) {
      alert(error);
    }
  }

  NumberProcess(numero: number) {
    if (this.display === '0') {
      this.display = numero.toString();
    } else {
      this.display += numero.toString();
    }
  }

  Operator(operator: string) {
    if (this.display === '0' && operator !== '+/-' && operator !== '/' && operator !== '÷') {
      return; // Eğer ekran değeri 0 ise ve eklenen operatör değiştirme işlemi değilse, işlem yapma
    }

    const lastChar = this.display[this.display.length - 1];
    if (['+', '-', '*', '÷'].includes(lastChar) && ['+', '-', '*', '÷'].includes(operator)) {
      this.display = this.display.slice(0, -1) + operator;
    } else {
      this.display += operator;
    }
  }

  clr() {
    this.display = '0';
    this.result = '';
  }

  toggleSign() {
    if (this.display === '0') {
      this.display = '0';
    } else if (this.display.startsWith('-')) {
      this.display = this.display.substring(1);
    } else {
      this.display = '-' + this.display;
    }
  }

  addZeroes() {
    if (this.display !== '0') {
      this.display += '00';
    }
  }
}
