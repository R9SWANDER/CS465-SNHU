import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserLine } from './user-line';

describe('UserLine', () => {
  let component: UserLine;
  let fixture: ComponentFixture<UserLine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLine],
    }).compileComponents();

    fixture = TestBed.createComponent(UserLine);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
