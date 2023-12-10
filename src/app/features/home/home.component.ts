import { Component } from '@angular/core';
import { re } from '../../core/data/recipes'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainService } from 'src/app/core/services/main.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { CutTextDirective } from 'src/app/shared/directives/cut-text.directive';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    CutTextDirective,
    RouterModule, PaginationComponent,
    FormsModule,
    EmptyStateComponent

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  //Variable Declarations
  currentPage: number = 1
  pageSize: number = 5
  totalPages: number = Math.ceil(re.length / this.pageSize)
  pageSizes = [5, 10, 15, 20, 50, 100]
  recipes: any[] = re.slice(0, this.pageSize)
  originalData: any[] = []


  constructor(private http: HttpClient, private angularFireStore: AngularFirestore, private service: MainService) {
      //################################################################################
      // If The Api Quota Is Expired Please Replace the Next Two Lines With Each Other
      //################################################################################

    // this.originalData = re
    this.getRecipes()
    service.searchPipe.subscribe(res => {
      if (res) {
        this.filterRecipes(res)
      }
      else {
        this.recipes = this.originalData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
    })
  }
  /**
   * Function That Gets The All Recipes From The Spoonacular.com Api's
   *
   * @memberof HomeComponent
   */
  getRecipes() {
    this.http.get(`https://api.spoonacular.com/recipes/random?apiKey=${environment.api_key}&number=100`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe((res: any) => {
      this.originalData = res.recipes
      this.recipes = res.recipes.slice(0, this.pageSize)
    })
  }
  /**
   * Function Takes The Recipe To Submit it as favorite recipe To The Firebase
   *
   * @param {*} recipe
   * @memberof HomeComponent
   */
  setFavorite(recipe: any) {
    this.angularFireStore.collection('/recipes').add(recipe)
  }

  /**
   *Function That Filter The Recipes Results Based on the Search Parameter
   *
   * @param {string} searchText
   * @memberof HomeComponent
   */
  filterRecipes(searchText: string) {
    this.recipes = this.originalData.filter(el => el.title.toLowerCase().includes(searchText.toLowerCase()))
  }
  /**
   * Function To Change Pagination
   *
   * @param {number} e
   * @memberof HomeComponent
   */
  onPageChanged(e: number) {
    this.currentPage = e
    this.recipes = this.originalData.slice((e - 1) * this.pageSize, e * this.pageSize)

  }
  /**
   * Function To Reset The pagination on change the page size
   *
   * @memberof HomeComponent
   */
  getPaginator() {
    this.currentPage = 1
    this.totalPages = Math.ceil(this.originalData.length / this.pageSize)
    this.recipes = this.originalData.slice(0, this.pageSize)
  }
}
