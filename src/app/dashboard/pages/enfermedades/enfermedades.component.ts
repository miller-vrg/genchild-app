import { Component, OnInit, effect, inject, signal, output, input } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "@/shared/modules/shared/shared.module";
import { IEnfermedad, Meta } from '@/shared/types/interfaces';
import { EnfermedadService } from '@/shared/services';
import { EnfermedadComponent } from './components';
import { ModalCrudEnfermedadesComponent } from './components/modal-crud-enfermedades/modal-crud-enfermedades.component';
import { createLocalEnfermedad } from '@/shared/utils/createLocal';
import { DetallesEnfermedadVEComponent } from './components/detalles-enfermedad-ve/detalles-enfermedad-ve.component';
import { filtros } from './helpers/filtros';
import { AuthenticationService } from '@/auth/services/authentication.service';

@Component({
  selector: 'app-enfermedades',
  standalone: true,
  imports: [
    SharedModule,
    FormsModule,
    EnfermedadComponent,
    ModalCrudEnfermedadesComponent,
    DetallesEnfermedadVEComponent
  ],
  templateUrl: './enfermedades.component.html',
  styleUrls: ['./enfermedades.component.scss']
})
export class EnfermedadesComponent implements OnInit {

  private enfermedadService = inject(EnfermedadService);
  private authService = inject(AuthenticationService);
  isAdmin = this.authService.isAdmin();
  showDetalles = signal<boolean>(false);
  pages: number[] = [];
  enfermedades = signal<IEnfermedad[]>([]);
  enfermerdadSelect = this.enfermedadService.data;
  indexEnfermedadToEdit = signal<number>(-1);
  showModal = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  enfermedad = signal<IEnfermedad>(createLocalEnfermedad());
  onReset = output<void>();
  onSeach = output<{ filtro: string, value: string }>();
  opcions = filtros;
  filtroSearch = signal<{ filtroSearch: string }>({ filtroSearch: this.opcions[0].value });
  workToSearch: string = '';

  meta = signal<Meta>({
    page:            1,
    take:            10,
    itemCount:       10,
    pageCount:       1,
    hasNextPage:     false,
    hasPreviousPage: false
  });

  constructor() {
    effect(() => this.pages = Array.from({ length: this.meta()?.pageCount ?? 0 }).map((v, i) => i + 1));
  }

  ngOnInit(): void {
    this.loandEnfermedades();
  }

  updateData(enfermedad: IEnfermedad) {
    console.log({ enfermedad });
    if (!enfermedad.id) return;

    if (this.indexEnfermedadToEdit() === -1) {
      this.enfermedades.update(enfermedades => {
        enfermedades.unshift(enfermedad);
        enfermedades.pop();
        return [...enfermedades];
      });
    } else {
      this.enfermedades.update(enfermedades => {
        enfermedades[this.indexEnfermedadToEdit()] = enfermedad;
        return enfermedades;
      });
    }
  }

  startDetails(enfermedad: IEnfermedad = createLocalEnfermedad()) {
    this.showDetalles.update(oldValue => true);
    this.enfermedad.update(oldValue => ({ ...enfermedad }));
  }

  startModal(index: number = -1) {
    this.indexEnfermedadToEdit.update(indexOld => index);
    this.enfermerdadSelect.update(dataOld => ({ ...createLocalEnfermedad(), id: 0 }));
    this.showModal.update(dataOld => !dataOld);
  }

  startModalWhitData(enfermedad: IEnfermedad) {
    this.enfermerdadSelect.update(dataOld => enfermedad);
    this.showModal.update(dataOld => !dataOld);
  }

  async loandEnfermedades(query: string = '') {
    this.isLoading.update(dataOld => true);

    try {
      const { data, meta } = await lastValueFrom(this.enfermedadService.getAll(query));
      this.meta.update(dataOld => ({ ...meta }));
      this.enfermedades.update(dataOld => [...data]);
    } catch (error) {
      // Manejar el error
    } finally {
      this.isLoading.update(dataOld => false);
    }
  }

  async changePage(numPage: number) {
    this.enfermedadService.page.update(dataOld => numPage);
    await this.loandEnfermedades();
    this.meta.update( valueOld => ({...valueOld, page: numPage } as Meta))
  }

  async deleteEnfermedad(id: number | undefined) {
    if (!id) return;
    await lastValueFrom(this.enfermedadService.delet(id));
    this.enfermedades.update(enfermedades => enfermedades.filter(en => en.id !== id));
  }

  search(value: string) {
    if (!value.length) return;
    this.loandEnfermedades(`&nameFiel=${this.filtroSearch().filtroSearch}&valueFiel=${value}`);
  }

  limpiar(refInput: HTMLInputElement) {
    refInput.value = '';
    this.loandEnfermedades();
  }
}
