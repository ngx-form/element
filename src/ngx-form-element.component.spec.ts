// external
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';

// internal
import { FormElementComponent } from './ngx-form-element.component';
import { FormElementService } from './ngx-form-element.service';
import { ValidatorService } from './ngx-form-element-validator.service';

beforeAll(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
});

describe('FormElementComponent', () => {

  let comp: FormElementComponent;
  let fixture: ComponentFixture<FormElementComponent>;
  let nativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        FormElementComponent
      ],
      providers: [
        FormElementService,
        ValidatorService
      ]
    }).compileComponents();
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(FormElementComponent);
    nativeElement = fixture.debugElement.nativeElement;
    comp = fixture.componentInstance;
  });

  it('should create test component', async(() => {
    expect(fixture).toBeDefined();
    expect(comp).toBeTruthy();
  }));
  it('should have div', async(() => {
    expect(nativeElement.querySelector('div')).toBeTruthy();
  }));
});
