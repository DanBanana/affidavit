import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EffectRef,
  ElementRef,
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
export class DocumentGeneratorComponent implements AfterViewInit, OnDestroy {
  readonly effects: EffectRef[] = [];
  readonly formVal = signal<unknown>({});

  scale: string = 'scale(1)';

  private readonly store = inject(AppStore);

  @ViewChild('view') view!: ElementRef;
  @ViewChild('pagesWrapper') pagesWrapper!: ElementRef;
  @ViewChild('generator') generator!: BaseDocGenerator;
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.scaleChildToFitParent();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.effects.forEach((item) => item.destroy());
  }

  async generatePDF(): Promise<void> {
    this.store.setGlobalLoading(true);
    this.generator.generatePDF();
    await firstValueFrom(this.generator.completed);
    this.store.setGlobalLoading(false);
  }

  private scaleChildToFitParent() {
    const parentWidth = this.view.nativeElement?.offsetWidth;
    const childWidth = this.pagesWrapper.nativeElement?.offsetWidth;
    const scaleFactor = parentWidth / childWidth;
    this.scale = `scale(${scaleFactor || 1})`;
  }
}
