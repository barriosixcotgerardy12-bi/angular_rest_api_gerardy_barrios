import {Component, inject} from '@angular/core';
import {ProductsRestService} from '../../services/products-rest-service';
import {JsonPipe} from "@angular/common";

@Component({
    selector: 'app-products-list',
    imports: [JsonPipe],
    templateUrl: './products-list.html',
    styleUrl: './products-list.css',
})
export class ProductsList {

    readonly productService = inject(ProductsRestService);
}
