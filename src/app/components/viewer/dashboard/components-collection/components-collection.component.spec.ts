import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsCollectionComponent } from './components-collection.component';

describe('ComponentsCollectionComponent', () => {
  let component: ComponentsCollectionComponent;
  let fixture: ComponentFixture<ComponentsCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentsCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
