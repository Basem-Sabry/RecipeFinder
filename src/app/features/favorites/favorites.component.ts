import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CutTextDirective } from 'src/app/shared/directives/cut-text.directive';
import { environment } from 'src/environments/environment.development';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MainService } from 'src/app/core/services/main.service';
import { RouterModule } from '@angular/router';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    CutTextDirective,
    RouterModule,EmptyStateComponent
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  recipes: any[] = []
  originalData: any[] = []


  constructor(private http: HttpClient, private angularFireStore: AngularFirestore, private service: MainService) {

    this.getMyFireStoreRecipes()
    service.searchPipe.subscribe(res => {
      if (res) {
        this.filterRecipes(res)
      }
      else {
        this.recipes = this.originalData
      }
    })
  }

  /**
   * Function That remove the recipe from the favorite list
   *
   * @param {*} recipe
   * @memberof FavoritesComponent
   */
  deleteFavorite(recipe: any) {
    this.angularFireStore.doc('/recipes/' + recipe.primaryKey).delete()
  }
  /**
   * Function To get The List of Favorite Recipes
   *
   * @memberof FavoritesComponent
   */
  getMyFireStoreRecipes() {
    this.angularFireStore.collection('/recipes').snapshotChanges().subscribe(res => {
      this.recipes = res.map(e => {
        var recipeInfo: any = e.payload.doc.data();
        recipeInfo.primaryKey = e.payload.doc.id;
        return recipeInfo
      })
      this.originalData = res.map(e => {
        var recipeInfo: any = e.payload.doc.data();
        recipeInfo.primaryKey = e.payload.doc.id;
        return recipeInfo
      })
    })

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
}
