import {
  ChangeDetectorRef,
  Component,
  EffectRef,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { BgWrapperComponent } from '../../shared/components';
import { AppStore } from '../../shared/services';
import { firstValueFrom } from 'rxjs';
import { BaseDocGenerator } from './models';
import {
  AffidavitOfLossComponent,
  AffidavitOfLossFieldsComponent,
} from './components';

@Component({
  selector: 'app-document-generator',
  standalone: true,
  imports: [
    BgWrapperComponent,
    AffidavitOfLossComponent,
    AffidavitOfLossFieldsComponent,
  ],
  templateUrl: './document-generator.component.html',
  styleUrl: './document-generator.component.scss',
})
export class DocumentGeneratorComponent implements OnDestroy {
  readonly effects: EffectRef[] = [];
  readonly formVal = signal<unknown>({});

  scale: string = 'scale(1)';

  private readonly store = inject(AppStore);
  private pageWith!: number;

  @ViewChild('view') view!: ElementRef;
  @ViewChild('generator') generator!: BaseDocGenerator;
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.effects.forEach((item) => item.destroy());
  }

  async generatePDF(): Promise<void> {
    this.store.setGlobalLoading(true);
    this.generator.generatePDF();
    await firstValueFrom(this.generator.completed);
    this.store.setGlobalLoading(false);
  }

  scaleChildToFitParent(width?: number) {
    this.pageWith = width || this.pageWith;
    if (!this.pageWith) return;
    const parentWidth = this.view.nativeElement?.offsetWidth;
    this.scale = `scale(${parentWidth / this.pageWith || 1})`;
  }

  @HostListener('window:resize', ['$event'])
  private handleResize(): void {
    this.scaleChildToFitParent();
  }
}
