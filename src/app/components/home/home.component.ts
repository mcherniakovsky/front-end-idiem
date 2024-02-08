import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ProductService } from 'src/app/services/product-service.service';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Product } from 'src/app/interface/product-interface';
import { NewProductComponent } from '../new-product/new-product.component';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<Product>;
  @ViewChild(MatSort) sort = {} as MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );
  product: Product = {
    disabled: false,
    _id: '',
    code: '',
    name: '',
    description: '',
    category: '',
    urlImage: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    id: '',
  };
  page = 1;
  pageIndex = 0;
  columnsToOrder = [
    { nombre: 'code', trad: 'Código' },
    { nombre: 'name', trad: 'Nombre' },
    { nombre: 'category', trad: 'Categoría' },
    { nombre: 'createdAt', trad: 'Creación' },
    { nombre: 'disabled', trad: 'Activo' },
  ];
  orderBy = '';
  orden = 1;
  dataSource = new MatTableDataSource();
  columnsToDisplay = [
    'code',
    'name',
    'category',
    'createdAt',
    'view',
    'edit',
    'disabled',
  ];
  category: string[] = [];
  total: any;
  constructor(
    private productService: ProductService,
    private dialogModel: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getConfig().then((res) => {
      this.category = res.data;
    });
  }

  ngAfterViewInit(): void {
    this.dialogModel
      .open(ProgressSpinnerComponent)
      .afterOpened()
      .subscribe((res) => {
        this.productService
        .getAll(1, 15, '', 1)
        .then((res) => {
          res.subscribe((res) => {
            this.total = res.data.total;
            console.log(this.total)
            this.dataSource = new MatTableDataSource(res.data.data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.table.renderRows();
            {
              if (res.data.done == true) this.dialogModel.closeAll();
            }
          });
        })
        .catch((err) => {});
      });
  }

  newProduct() {
    const dialogRef = this.dialogModel.open(NewProductComponent, {
      disableClose: true,
      data: { new: true, title: 'Crear Nuevo Producto' },
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.dialogModel
        .open(ProgressSpinnerComponent)
        .afterOpened()
        .subscribe((res) => {
          this.getInfo(this.page, 15, this.orderBy, this.orden);
        });
    });
  }

  editProduct(product: Product) {
    const dialogRef = this.dialogModel.open(NewProductComponent, {
      disableClose: true,
      data: { new: false, title: 'Editar Producto', product: product },
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.dialogModel
        .open(ProgressSpinnerComponent)
        .afterOpened()
        .subscribe((res) => {
          this.getInfo(this.page, 15, this.orderBy, this.orden);
        });
    });
  }

  disableProduct(product: Product) {
    product.disabled = !product.disabled;
    this.productService.editProduct(product).then((res) => {
      console.log(res.data);
      this.dialogModel
        .open(ProgressSpinnerComponent)
        .afterOpened()
        .subscribe((res) => {
          this.getInfo(this.page, 15, this.orderBy, this.orden);
        });
    });
  }

  getInfo(page: number, limit: number, sidx: string, sort: number) {
    this.productService
      .getAll(page, limit, sidx, sort)
      .then((res) => {
        res.subscribe((res) => {
          this.total = res.data.total;
          this.dataSource.data = res.data.data;
          this.paginator.nextPage();          {
            if (res.data.done == true) this.dialogModel.closeAll();
          }
        });
      })
      .catch((err) => {});
  }
  view(row: Product) {
    this.router.navigate(['/products', row.id]);
  }

  sortBy() {
    this.dialogModel
      .open(ProgressSpinnerComponent)
      .afterOpened()
      .subscribe((res) => {
        this.getInfo(1, 15, this.orderBy, this.orden);
      });
  }

  pageChange($event: any) {
    const pageIndex = $event.pageIndex;
    const previusPageIndex = $event.previousPageIndex;
    if (pageIndex < previusPageIndex) {
          this.page = this.page - 1;
          this.pageIndex = this.pageIndex - 1;
    } else {
      this.dialogModel
        .open(ProgressSpinnerComponent)
        .afterOpened()
        .subscribe((res) => {
          this.page = this.page + 1;
          this.pageIndex = this.pageIndex + 1;
          this.productService
            .getAll(this.page, 15, this.orderBy, this.orden)
            .then((res) => {
              res.subscribe((res) => {
                const data: Product[] = this.dataSource.data as Product[];
                res.data.data.forEach((element: Product) => {
                  if(data.find(e => e.id == element.id)){
                  }else{
                    data.push(element);
                  }
                });
                this.dataSource.data = data;
                {
                  if (res.data.done == true) this.dialogModel.closeAll();
                }
              });
            });
        });
    }
  }
}
