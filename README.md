# RecipeFinder

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Development Design Framework 
The used FrameWork For The Design Is FrameWork For More Speed & Smooth Styling

## Project Architecture  
   Core 
        Data => Which Has the cached version of the recipes in case api quota is expired
        Models => the model i use to map on it in the listing
        Services => the service used to inject in it the observable used in the search
   Features
        Favorites => The Favorites Recipes Module
        Home => The Home Module
        SingleRecipe => The SingleRecipe Module
   Shared
        components
                   emptyState => The Component For The Handling of empty state
                   navbar => The Shared Navbar Across The App
                   pagination => The Pagination Component Used in the list Recipe View
        Directives 
                   cutTextDirective => Directive that cut the text to specific length with ability to click on the element to show all the text truncated         





