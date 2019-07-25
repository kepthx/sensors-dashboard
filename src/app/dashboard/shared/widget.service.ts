import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ChartWidgetModalComponent } from './chart-widget-modal/chart-widget-modal.component';
import { ChartWidget } from './chart-widget';
import { Subject } from 'rxjs';

const CLOSE_EVENTS = [
  'backdrop-click',
  'esc'
];

@Injectable()
export class WidgetService {
  created: Subject<ChartWidget> = new Subject();
  updated: Subject<ChartWidget> = new Subject();
  removed: Subject<ChartWidget> = new Subject();
  bsModalRef: BsModalRef;

  constructor(private bsModalService: BsModalService) { }

  openWidgetModal(widget?: ChartWidget) {
    const initialState = {
      ...widget || {}
    };
    this.bsModalRef = this.bsModalService.show(ChartWidgetModalComponent, { initialState });

    const subscription = this.bsModalService.onHidden.subscribe((reason: string) => {
      subscription.unsubscribe();
      const content = this.bsModalRef.content;
      if (!content.title || CLOSE_EVENTS.includes(reason)) {
        return false;
      } 
      if (!widget || !widget.id) {
        return this.created.next(new ChartWidget(content));
      }

      if (widget.id !== content.id) return false;

      if (content.removed) {
        return this.removed.next(widget);
      }
      
      widget.fromModalContent(content);
      this.updated.next(widget);
    });
  }

  onCreate() {
    return this.created.asObservable();
  }

  onUpdate() {
    return this.updated.asObservable();
  }

  onRemove() {
    return this.removed.asObservable();
  }
}
