import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ycd-config-side-bar',
  templateUrl: './config-side-bar.component.html',
  styleUrls: ['./config-side-bar.component.scss'],
})
export class ConfigSideBarComponent implements OnInit, OnDestroy {
  @Input() width = 400;
  isOpen: boolean;
  configForm: UntypedFormGroup;
  @Output() valueChanged = new EventEmitter();
  @Output() toggled = new EventEmitter();
  componentAlive: boolean;
  constructor(private fb: UntypedFormBuilder) {
  }

  initForm() {
    this.configForm = this.fb.group({
      nextBtnText: ['Next', []],
      prevBtnText: ['Previous', []],
      showWeekNumbers: [false, []],
      hideHeader: [false, []],
      weekStartsOn: [0, []]
    });

    this.configForm.valueChanges
      .pipe(
        takeWhile(() => (!!this.componentAlive)),
      )
      .subscribe((val) => {
        this.valueChanged.emit(val);
      });
  }

  ngOnInit() {
    this.isOpen = false;
    this.componentAlive = true;
    this.initForm();
  }

  toggleOpenState() {
    this.isOpen = !this.isOpen;
    this.toggled.emit(this.isOpen);
  }

  ngOnDestroy() {
    this.componentAlive = false;
  }

}
