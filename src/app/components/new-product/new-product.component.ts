import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { Product } from 'src/app/interface/product-interface';
import { ProductService } from '../../services/product-service.service';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})


export class NewProductComponent implements OnInit{

  newProduct: Product = {
    disabled: false,
    _id: '',
    code: '',
    name: '',
    description: '',
    category: '',
    urlImage: '',
    createdAt: new Date(),
    updatedAt: new Date,
    id: ''
  };
  categories: [] = [];
newProducts: any;


  constructor(public dialog: MatDialog, private productService: ProductService, @Inject(MAT_DIALOG_DATA) public data:any ) {
    console.log(data)
    if(data.product){
      console.log('Entra en esta shit?')
      this.newProduct = data.product;
      console.log(data.product)
    }
   }

  ngOnInit():void{
    this.productService.getConfig().then(res => {
      this.categories = res.config.categoriesOfProduct
    });
  }

  openDialog(): void {
    console.log(this.data)
    const dialogRef = this.dialog.open(NewProductComponent, {disableClose: true, data: {new: false} });
    dialogRef.disableClose = true;
  }
  cancel(){
    this.dialog.closeAll();
  }
  enviar(){
    console.log(this.newProduct)
    this.productService.createProduct(this.newProduct).then(res =>{
      const dialogRef = this.dialog.open(ProgressSpinnerComponent);
      dialogRef.disableClose = true;
      if(res.done){
        alert(res.message)
        this.dialog.closeAll();
      }else if (res.errors){
        alert(res.errors)
        dialogRef.close();
      }else{
        alert(res.message);
        dialogRef.close();
      }
    }).catch(res => {
      alert(res.errors)
    })
  }
  editar(){
    console.log(this.newProduct)
    this.productService.editProduct(this.newProduct).then(res =>{
      const dialogRef = this.dialog.open(ProgressSpinnerComponent);
      dialogRef.disableClose = true;
      if(res.done){
        alert(res.message)
        this.dialog.closeAll();
      }else if (res.errors){
        alert(res.errors)
        dialogRef.close();
      }else{
        alert(res.message);
        dialogRef.close();
      }
    }).catch(res => {
      alert(res.errors)
    })
  }

/*   isValidUrl(url: string){
  try {
    new URL(url)
    return true;
  } catch (error) {
    return false
  }
  } */

}
