import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import  axios  from 'axios';
import { Product } from '../interface/product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getConfig(){
    return axios({
      method: 'get',
      url: 'http://146.83.11.239:3000/api/prueba-tecnica/product/config',
      responseType: 'json'
    }).then((res) => {
      return res.data
    })
  }

  async getAll( page: number, limit:number, sidx?: number | string , sort?: number){
    return axios({
      method: 'get',
      url: `http://146.83.11.239:3000/api/prueba-tecnica/product/get?page=${page}&limit=${limit}&sidx=${sidx}&sord=${sort}`,
      maxBodyLength: Infinity,
      responseType: 'json'
    }).then((res) => {
      return of(res);
    })
  }

  createProduct(product:Product){
    return axios({
        method: 'post',
        url: `http://146.83.11.239:3000/api/prueba-tecnica/product/create`,
        data: {
          code: product.code.toString(),
          name: product.name,
          description: product?.description,
          urlImage: product.urlImage,
          category: product?.category
        },
        responseType: 'json'
        }
      ).then((res) => {
        return res.data;
      }).catch(res =>{
        return res.response.data
      })
  }

  editProduct(product:Product){
    return axios({
        method: 'put',
        url: `http://146.83.11.239:3000/api/prueba-tecnica/product/update/${product.id}`,
        data: {
          code: product.code.toString(),
          name: product.name,
          description: product?.description,
          urlImage: product.urlImage,
          category: product?.category,
          disabled: product?.disabled
        },
        responseType: 'json'
        }
      ).then((res) => {
        return res.data;
      }).catch(res =>{
        return res.response.data
      })
  }

  getProductById(id:string){
    //http://146.83.11.239: 3000/api/prueba-tecnica/product/get/:id
    return axios({
      method: 'get',
      url: `http://146.83.11.239:3000/api/prueba-tecnica/product/get/${id}`,
      maxBodyLength: Infinity,
      responseType: 'json'
    }).then((res) => {
      return res;
    })
  }
}
