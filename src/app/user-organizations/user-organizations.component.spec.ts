import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrganizationsComponent } from './user-organizations.component';

describe('UserOrganizationsComponent', () => {
  let component: UserOrganizationsComponent;
  let fixture: ComponentFixture<UserOrganizationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserOrganizationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
