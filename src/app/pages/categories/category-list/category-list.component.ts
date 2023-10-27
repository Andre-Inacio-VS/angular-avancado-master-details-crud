import { Component, OnInit } from '@angular/core';

import { Category } from "../shared/category.model";
import { CategoryService } from "../shared/category.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categorySerice: CategoryService) {

  }

  ngOnInit() {
    this.categorySerice.getAll().subscribe(
      categories => this.categories = categories,
      error => alert('ERRO AO CARREGAR A LISTA')
    )
  }

}
