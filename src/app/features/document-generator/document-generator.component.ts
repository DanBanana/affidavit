import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  inject,
} from '@angular/core';
import { BgWrapperComponent, ButtonComponent } from '../../shared/components';
import { AppStore } from '../../shared/services';
import { firstValueFrom } from 'rxjs';
import { BaseDocGenerator } from './models';
import { DocumentGeneratorStore } from './document-generator-store';
import {
  AffidavitOfLossComponent,
  AffidavitOfLossFieldsComponent,
} from './components';
import { FormControlStatus } from '@angular/forms';

@Component({
  selector: 'app-document-generator',
  standalone: true,
  imports: [
    BgWrapperComponent,
    ButtonComponent,
    AffidavitOfLossComponent,
    AffidavitOfLossFieldsComponent,
  ],
  providers: [DocumentGeneratorStore],
  templateUrl: './document-generator.component.html',
  styleUrl: './document-generator.component.scss',
})
export class DocumentGeneratorComponent {
  scale: string = 'scale(1)';

  private readonly store = inject(AppStore);
  private readonly generatorStore = inject(DocumentGeneratorStore);
  private pageWith!: number;

  get buttonDisabled(): boolean {
    return this.generatorStore.formStatus!() !== 'VALID';
  }

  @ViewChild('view') view!: ElementRef;
  @ViewChild('generator') generator!: BaseDocGenerator;
  constructor(private cd: ChangeDetectorRef) {}

  async generatePDF(): Promise<void> {
    this.generatorStore.setCurrentField();
    this.store.setGlobalLoading(true);
    this.scale = 'scale(1)';
    await new Promise<void>((resolve) => {
      setTimeout(async () => {
        this.generator.generatePDF();
        await firstValueFrom(this.generator.completed);
        resolve();
      });
    });
    this.store.setGlobalLoading(false);
    this.scaleChildToFitParent();
  }

  scaleChildToFitParent(width?: number) {
    this.pageWith = width || this.pageWith;
    if (!this.pageWith) return;
    const parentWidth = this.view.nativeElement?.offsetWidth;
    this.scale = `scale(${parentWidth / this.pageWith || 1})`;
    this.cd.detectChanges();
  }

  @HostListener('window:resize', ['$event'])
  private handleResize(): void {
    this.scaleChildToFitParent();
  }
}
