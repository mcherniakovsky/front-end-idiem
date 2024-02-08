import { Component, Injectable, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interface/product-interface';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService, private _Activatedroute:ActivatedRoute, private dialogModel: MatDialog, private router: Router) { }

  id=this._Activatedroute.snapshot.params["id"];

  product: Product | undefined;


  ngOnInit(): void {
    this.dialogModel.open(ProgressSpinnerComponent).afterOpened().subscribe(res => {
      this.productService.getProductById(this.id).then(res => {
        console.log(res.data)
        this.product = res.data.data;
        console.log(this.product)
        this.dialogModel.closeAll();
      }).catch(err => {
        alert(err);
        this.dialogModel.closeAll();
      })
      })
  }

  goBack(){
    this.router.navigate(['/home'])
  }

}
