// external
import { NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';

// internal
import { DynamicComponent } from './dynamic.component';
import { TestComponent } from './test.component';
import { TestModule } from './test.module';

beforeAll(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
});

describe('TestComponent', () => {

  let comp: TestComponent;
  let debugElement: any;
  let fixture: ComponentFixture<TestComponent>;
  let nativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule]
    }).compileComponents();
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);

    // get from fixture
    comp = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    debugElement = fixture.debugElement;
  });

  it('should be defined', async(() => {
    expect(fixture).toBeDefined();
    expect(comp).toBeTruthy();
  }));
  it('should have div', async(() => {
    expect(nativeElement.querySelector('div')).toBeTruthy();
  }));
  it('should have `component()` method null', async(() => {
    expect(comp.component()).toBeNull();
  }));
  it('should have div container', async(() => {
    // fixture.detectChanges();
    expect(nativeElement.querySelector('div')).not.toBeNull();
    expect(debugElement.query(By.css('div'))).not.toBeNull();
  }));
  it('should have create`DynamicComponent` and defined `__component` property', async(() => {
    comp.create(DynamicComponent);
    expect(comp.component()).toBeDefined();
  }));
  it('should have #container viewChild', async(() => {
    comp.create(DynamicComponent);
    expect(comp.container).toBeDefined();
  }));
  it('should have `__component` instance property `model` defined', async(() => {
    comp.create(DynamicComponent);
    expect(comp.component().instance.model).toBeDefined();
  }));
  it('should have property `model` changed', async(() => {
    comp.create(DynamicComponent);
    comp.model = { test: 'changed' };
    expect(comp.model).toEqual({ test: 'changed' });
  }));
  it('should have `__component` instance property `model` should be changed', async(() => {
    comp.create(DynamicComponent);
    comp.model = { defined: false };
    comp.set('model');
    expect(comp.component().instance.model).toEqual({ defined: false });
  }));
  it('should have `__component` instance property `model` and property `key` provided by array argument changed', async(() => {
    comp.create(DynamicComponent);
    comp.model = { defined: false };
    comp.set([
      'key',
      'model'
    ]);
    expect(comp.component().instance.key).toBe('notdefined');
    expect(comp.component().instance.model).toEqual({ defined: false });
  }));
  it('should have working subscribe to property `event` EventEmitter and emit result "event"', async(() => {
    comp.create(DynamicComponent);
    comp.subscribe('event',
      (generatorOrNext: any) => {
        expect(generatorOrNext).toBe('event');
      },
      (error: any) => { },
      (complete: any) => { }
    );
    comp.component().instance.emit();
  }));
  it('should have working method subscribe to property `event` EventEmitter and emit complete', async(() => {
    comp.create(DynamicComponent);
    comp.subscribe('event',
      (result: any) => { },
      (error: any) => { },
      (complete: any) => {
      }
    );
    comp.component().instance.emitComplete();
  }));
  it('should have `__component` as null', async(() => {
    comp.create(DynamicComponent);
    comp.destroy();
    expect(comp.component()).toBeNull();
  }));
});
