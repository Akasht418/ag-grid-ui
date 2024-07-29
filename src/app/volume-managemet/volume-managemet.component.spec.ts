import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeManagemetComponent } from './volume-managemet.component';

describe('VolumeManagemetComponent', () => {
  let component: VolumeManagemetComponent;
  let fixture: ComponentFixture<VolumeManagemetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VolumeManagemetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VolumeManagemetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
