import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAuthenticationPage } from './user-authentication.page';

describe('UserAuthenticationPage', () => {
  let component: UserAuthenticationPage;
  let fixture: ComponentFixture<UserAuthenticationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserAuthenticationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
