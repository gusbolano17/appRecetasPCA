import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarUsuariosPage } from './buscar-usuarios.page';

describe('BuscarUsuariosPage', () => {
  let component: BuscarUsuariosPage;
  let fixture: ComponentFixture<BuscarUsuariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
