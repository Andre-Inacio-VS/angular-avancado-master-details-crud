import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";

import { Category } from "./category.model";

@Injectable({
  providedIn: 'root'
})

// Define uma classe TypeScript chamada CategoryService e a torna disponível para exportação para que ela possa ser usada em outros módulos.
export class CategoryService {

  // Isso declara uma variável de membro privada chamada apiPath que armazena o caminho base da API relacionado às categorias. Isso é útil para construir URLs de solicitação HTTP.
  private apiPath: string = "api/categories"

  // O construtor da classe CategoryService recebe uma injeção de dependência do serviço HttpClient. Isso permite que o serviço faça solicitações HTTP para a API.
  constructor(private http: HttpClient) { }

  // Este método é responsável por recuperar todas as categorias da API. Ele retorna um Observable que emite uma matriz de objetos Category. O método utiliza o serviço HttpClient para fazer uma solicitação GET à URL apiPath e, em seguida, manipula a resposta usando os operadores catchError e map para lidar com erros e transformar os dados da resposta em objetos Category.
  getAll(): Observable<Category[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    )
  }

  // Este método é semelhante ao getAll(), mas é usado para recuperar uma categoria específica com base em um ID fornecido como argumento. Ele também retorna um Observable de uma única instância de Category.
  getById(id: number): Observable<Category> {
    const url - `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  }

  //  Este método é usado para criar uma nova categoria na API. Ele recebe um objeto Category como argumento e retorna um Observable que emite o objeto Category recém-criado.
  create(category: Category): Observable<Category> {
    return this.http.post(this.apiPath, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    )
  }

  // Este método é usado para atualizar uma categoria existente. Ele recebe um objeto Category como argumento e retorna um Observable que emite o objeto Category atualizado.
  update(category: Category): Observable<Category> {
    const url = `${this.apiPath}/${category.id}`;
    return this.http.put(url, category).pipe(
      catchError(this.handleError),
      map(() => category)
    )
  }

  // Este método é usado para excluir uma categoria com base em seu ID. Ele retorna um Observable que não emite um valor útil, apenas confirma que a exclusão foi bem-sucedida.
  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  // PRIVATE METHODS

  // Este método privado é usado para converter os dados recebidos da API em uma matriz de objetos Category.
  private jsonDataToCategories(jsonData: any[]): Category[] {
    const categories: Category[] = [];
    jsonData.forEach(element => categories.push(element as Category));
    return categories;
  }

  // Este método privado converte os dados de uma categoria específica em um objeto Category.
  private jsonDataCategory(jsonData: any): Category {
    return jsonData as Category;
  }

  // Este método privado lida com erros que podem ocorrer durante as solicitações HTTP. Ele registra o erro no console e emite o erro usando o operador throwError.
  private handleError(error: any): Observable<any>{
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(error);
  }

}