// external
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// internal
import { FormElementTestComponent } from './ngx-form-element.class.test';
import { FormElementService } from './ngx-form-element.service';
import { FormElementModule } from './ngx-form-element.module';
import { ValidatorService } from './validator.service';
import { ErrorService } from './error.service';
import { InputComponent } from './../test/input.component';

beforeAll(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
});

describe('FormElementComponent', () => {

  let comp: FormElementTestComponent;
  let fixture: ComponentFixture<FormElementTestComponent>;
  let nativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormElementModule.forRoot({
          elements: [
            { name: 'input', component: InputComponent }
          ],
          errorMessages: { }
        }),
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        FormElementTestComponent
      ],
      providers: [
        ErrorService,
        FormElementService,
        ValidatorService
      ]
    }).compileComponents();
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(FormElementTestComponent);
    nativeElement = fixture.debugElement.nativeElement;
    comp = fixture.componentInstance;
  });
  it('should create test component', async(() => {
    expect(fixture).toBeDefined();
    expect(comp).toBeTruthy();
  }));
});
