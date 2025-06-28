import { Injectable, Type } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UiService {
  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  openDialog<T>(component: Type<any>, config: any): Observable<T> {
    const ref: DynamicDialogRef = this.dialogService.open(component, config);
    return new Observable<T>((observer) => {
      ref.onClose.subscribe((result: T) => {
        if (result) observer.next(result);
        observer.complete();
      });
    });
  }

  showMessage(summary: string, detail: string, severity: 'info' | 'error' | 'success') {
    this.messageService.add({ severity, summary, detail });
  }

  confirmAction(config: {
    message: string;
    header: string;
    accept: () => void;
    reject?: () => void;
  }) {
    this.confirmationService.confirm({
      message: config.message,
      header: config.header,
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary', outlined: true },
      accept: config.accept,
      reject: config.reject ?? (() => this.showMessage('Denegado', 'Has cancelado la acción', 'error')),
    });
  }
}
