# Wormhole

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Architecture
Standalone components only (no NgModule), zoneless change detection, signals, `@use` Sass, no Angular Material.

## Theme
Visual identity inspired by the Netflix series *Dark*: Winden palette (void black, fog grey, raincoat yellow), serif uppercase titles, film grain, vignette, drifting fog and the triquetra symbol. Titles use Cinzel (OFL, bundled in `assets/fonts`). Design tokens live in Sass maps (colors named by role: primary, secondary, accent, success, warning, error, plus a grey scale; spaces, sizes for font sizes, radius, tracking, fonts, shadows): global styles read the maps directly with `map.get`, while components consume the generated CSS custom properties (`--wormhole-*`), also shared with the micro frontends.

## Dialogs
`DialogService` (`core/dialog`) follows the approach of `angular-develop-universe`: `createDialog(Component, { id, className, dialogData })` builds a container hosting a native `<dialog>` opened with `showModal()`, injects the component with an `dialogData` input binding and exposes `whenOpen/whenOpened/whenClose/whenClosed`; then `show()` / `hide(data)`. Styling via `--wormhole-dialog-*` variables.

## Feature
- Carbon footprint: carbon intensity of the electricity grid, generation mix and a kWh to gCO2 calculator (free [Carbon Intensity API](https://carbonintensity.org.uk), no key required)
- Cast: micro FE (TVmaze API) with the paginated cast of Dark, exposing standalone routes (`./Routes`)
- Weather: micro FE components
- City-Weather: micro FE component with signals
- Lorentz event bus: library for communication between micro frontends
- Loader: Http interceptor with ngrx and signals
- Http error: Http interceptor opening an error dialog through `DialogService`
- Compodoc
