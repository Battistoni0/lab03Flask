import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTxtComponent } from './input-txt.component';

describe('InputTxtComponent', () => {
  let component: InputTxtComponent;
  let fixture: ComponentFixture<InputTxtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTxtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTxtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
