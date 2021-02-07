import { Component, OnInit } from '@angular/core';
import { Fund } from '../fund';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.css']
})
export class FundComponent implements OnInit {
  displayCol: string[] = ['position', 'name', 'weight', 'balance'];
  dataSource : Fund[] = [
    {deposit:1000,capital:1,interest:0.02,balance:1000,date:new Date()},
    {deposit: 2000,capital:1,interest:0.02,balance:1000,date:new Date()},
  ];

  constructor() { }
  
  ngOnInit(): void {
  }

}
