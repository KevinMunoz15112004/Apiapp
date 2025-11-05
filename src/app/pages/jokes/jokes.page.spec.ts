import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JokesPage } from './jokes.page';

describe('JokesPage', () => {
  let component: JokesPage;
  let fixture: ComponentFixture<JokesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JokesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
