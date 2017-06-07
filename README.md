<img src="http://ngx-form.wwwdev.io/color_logo_transparent_background.png" alt="ngx-form logo" title="ngx-form" align="right" width="128" />

# @ngx-form/element
Angular 2+ component to dynamically create html form element using data attribute with previously configured component with element name

## Table of contents
* [Demo](#demo)
* [Installation](#installation)
* [Usage](#usage)
* [Versioning](#versioning)
* [Git commit](#git-commit)
* [License](#license)
* [Donate](#donate)


## Demo

Usage demonstration of a @ngx-form/element package coming soon

## Installation

To install, run:

```bash
npm install --save @ngx-form/element @ngx-form/material
```

## Usage
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// internal
import { FormElementModule } from '@ngx-form/element';
import { FormMaterialModule, FormMaterialInputComponent, FormMaterialSelectComponen } from '@ngx-form/material';

@NgModule({
  imports: [
    // external
    BrowserModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,

    // internal
    FormElementModule.forRoot({
      types: [
        {
          type: 'input',
          component: FormMaterialInputComponent
        },
        {
          type: 'select',
          component: FormMaterialSelectComponent
        }
      ]
    }),
    FormMaterialModule
  ],
  declarations: [ ]
})
export class ExampleModule { }
```

## Versioning
Semantic Versioning 2.0.0 http://semver.org/

**Given a version number MAJOR.MINOR.PATCH, increment the:**   
MAJOR version when you make incompatible API changes,  
MINOR version when you add functionality in a backwards-compatible manner, and  
PATCH version when you make backwards-compatible bug fixes.  
Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

**FAQ**   
How should I deal with revisions in the 0.y.z initial development phase?  
>The simplest thing to do is start your initial development release at 0.1.0 and then increment the minor version for each subsequent release.

How do I know when to release 1.0.0?

>If your software is being used in production, it should probably already be 1.0.0. If you have a stable API on which users have come to depend, you should be 1.0.0. If you’re worrying a lot about backwards compatibility, you should probably already be 1.0.0.

## GIT commit
- AngularJS Git Commit Message Conventions https://gist.github.com/stephenparish/9941e89d80e2bc58a153
- http://karma-runner.github.io/0.10/dev/git-commit-msg.html

## License

MIT © ngx-form

## Donate
[Click to donate](https://donorbox.org/help-creating-open-source-software)
