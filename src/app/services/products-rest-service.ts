import {computed, Injectable} from '@angular/core';
import {HttpErrorResponse, httpResource} from '@angular/common/http';
import {ProductApiResponse} from '../interfaces/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsRestService {
  private username = "estudiante";
  private password = "cambiar-esta-clave";
  private credentials = btoa(`${this.username}:${this.password}`);

  productsResource = httpResource<ProductApiResponse>(() => ({
      url: `http://127.0.0.1:3000/api/v1/products`,
      method: 'GET',
      headers: {
        'Authorization': `Basic ${this.credentials}`,
      }
    })
  );

  errorMessage = computed(() => {
    const data = this.productsResource.error();

    if (data instanceof HttpErrorResponse) {
      switch (data.status) {
        case 401:
          return "Verifica las credenciales";
        case 404:
          return "El recurso no existe";
        default:
          return "Ha ocurrido un error en la petición";
      }
    }

    return "Ocurrió un error inesperado.";
  })


}
