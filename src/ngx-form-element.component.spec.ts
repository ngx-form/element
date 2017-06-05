// external
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';

// internal
import { DynamicComponent } from './../test/dynamic.component';
import { FormElementComponent } from './ngx-form-element.component';
import { TestModule } from './../test/test.module';
import { inputs } from './../test/test.data';

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
      imports: [TestModule]
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
  it('should have properties defined equal to data', async(() => {
    comp.data = inputs[0];
    for (const property in inputs[0]) {
      if (property) {
        expect(comp[property]).toEqual(inputs[0][property]);
      }
    }
  }));
  it('should have property `elementComponent` defined', async(() => {
    comp.data = inputs[0];
    expect(comp.elementComponent).toBeDefined();
  }));
  it('should have properties defined in property `__component` instance', async(() => {
    comp.data = inputs[0];
    comp.ngOnInit();
    for (const property in inputs[0]) {
      if (property) {
        expect(comp.get('__component').instance[property]).toEqual(inputs[0][property]);
      }
    }
  }));
  it('should have subscribe to cancelled, changed, submitted EventEmitter', async(() => {
    comp.data = inputs[0];
    comp.ngOnInit();
    comp.subscribe('cancelled', (result: any) => {
      expect(result).toBe('cancelled !');
    }, (error: any) => {
    }, (complete: any) => {
    });
    comp.subscribe('changed', (result: any) => {
      expect(result).toBe('changed !');
    }, (error: any) => {
    }, (complete: any) => {
    });
    comp.subscribe('submitted', (result: any) => {
      expect(result).toBe('submitted !');
    }, (error: any) => {
    }, (complete: any) => {
    });
    comp.cancelled.subscribe((result: any) => {
      expect(result).toBe('cancelled !');
    }, (error: any) => {
    }, (complete: any) => {
    });
    comp.changed.subscribe((result: any) => {
      expect(result).toBe('changed !');
    }, (error: any) => {
    }, (complete: any) => {
    });
    comp.submitted.subscribe((result: any) => {
      expect(result).toBe('submitted !');
    }, (error: any) => {
    }, (complete: any) => {
    });
    comp.get('__component').instance['cancelled'].emit('cancelled !');
    comp.get('__component').instance['changed'].emit('changed !');
    comp.get('__component').instance['submitted'].emit('submitted !');
  }));
  it('should have subscribe to c  ustom EventEmitter', async(() => {
    comp.data = inputs[0];
    comp.ngOnInit();
    comp.subscribe('custom', (result: any) => {
      expect(result).toBe('customitted !');
    }, (error: any) => {
    }, (complete: any) => {
    });
    comp.get('__component').instance['custom'].emit('customitted !');
  }));

  it('should have properties defined in property `__component` instance', async(() => {
    comp.data = inputs[0];
    comp.ngOnInit();
    for (const property in inputs[0]) {
      if (property) {
        expect(comp.get('__component').instance[property]).toEqual(inputs[0][property]);
      }
    }
  }));
  /*
  it('should have properties defined `__component`', async(() => {
    comp.data = inputs[0];
    for (const property in inputs[0]) {
      if (property) {
        console.info(property , ` teeeeeeeeeest: ` , inputs[0][property] , ` === ` , comp.get('__component')[property]);
        // expect(comp.get('__component')[property]).toEqual(inputs[0][property]);
      }
    }
  }));
  it('in dynamically created component should have defined properties equal to data', async(() => {
    comp.data = inputs[0];
    for (const property in inputs[0]) {
      if (property) {
        console.info(`property: `, property, inputs[0][property], `===` , comp.createdElementComponent());
        expect(comp.createdElementComponent()).toEqual(inputs[0][property]);
      }
    }
  }));
  it('this.__component should be created', async(() => {
    comp.create(DynamicComponent);
    expect(comp.component()).toBeDefined();
  }));
  it('this.__component.instance model should be defined', async(() => {
    comp.create(DynamicComponent);
    expect(comp.component().ianstance.model).toBeDefined();
  }));
  it('this.model should be changed', async(() => {
    comp.create(DynamicComponent);
    comp.model = { test: 'changed' };
    expect(comp.model).toEqual({ test: 'changed' });
  }));
  it('`__component` instance property `model` should be changed', async(() => {
    comp.create(DynamicComponent);
    comp.model = { defined: false };
    comp.set('model');
    expect(comp.component().instance.model).toEqual({ defined: false });
  }));
  it('__component instance property `model` and `key` with array argument should be changed', async(() => {
    comp.create(DynamicComponent);
    comp.model = { defined: false };
    comp.set([
      'key',
      'model'
    ]);
    expect(comp.component().instance.key).toBe('notdefined');
    expect(comp.component().instance.model).toEqual({ defined: false });
  }));
  it('__component instance subscribe to event EventEmitter', async(() => {
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
  it('__component instance subscribe to event EventEmitter and emit complete', async(() => {
    comp.create(DynamicComponent);
    comp.subscribe('event',
      (result: any) => { },
      (error: any) => { },
      (complete: any) => {
        console.info(`complete`);
      }
    );
    comp.component().instance.emitComplete();
  }));
  it('this.__component should be destroyed', async(() => {
    comp.create(DynamicComponent);
    comp.destroy();
    expect(comp.component()).toBeNull();
  }));
  */
});
