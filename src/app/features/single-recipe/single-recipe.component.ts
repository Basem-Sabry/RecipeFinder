import { Component } from '@angular/core';
import { re } from '../../core/data/recipes';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-single-recipe',
  standalone: true,
  imports: [CommonModule,    HttpClientModule,
  ],
  templateUrl: './single-recipe.component.html',
  styleUrl: './single-recipe.component.css',
})
export class SingleRecipeComponent {
  recipeID: number = 0;
  singleRecipe: any;
  constructor(
    private route: ActivatedRoute,
    private angularFireStore: AngularFirestore,
    private http: HttpClient,
  ) {
    route.params.subscribe((res: any) => {
      this.recipeID = parseInt(res.id);
      //################################################################################
      // If The Api Quota Is Expired Please Replace the Next Two Lines With Each Other
      //################################################################################
      // this.singleRecipe = re.filter((el) => el.id == this.recipeID)[0];
      this.getSingleRecipe(this.recipeID)
    });
  }


  getSingleRecipe(recipeID:number) {
    this.http.get(`https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${environment.api_key}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe((res: any) => {
      console.log(res)
      this.singleRecipe = res
      this.singleRecipe.isLiked = false
      console.log(this.singleRecipe)

    })
  }
  /**
   * Function Takes The Recipe To Submit it as favorite recipe To The Firebase
   *
   * @param {*} recipe
   * @memberof HomeComponent
   */
  setFavorite(recipe: any) {
    this.angularFireStore.collection('/recipes').add(recipe);
  }
}
