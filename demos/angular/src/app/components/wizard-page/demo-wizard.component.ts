import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IAlloyDialogData, AlloyDialogService, ALLOY_DIALOG_DATA } from '@keysight/alloy';

@Component({
    selector: 'app-demo-wizard',
    styleUrls: ['demo-wizard.component.scss'],
    templateUrl: './demo-wizard.component.html'
})
export class WizardDemoComponent implements OnInit {
  overviewFormGroup: FormGroup;
  configureFormGroup: FormGroup;
  measureFormGroup: FormGroup;
  saveFormGroup: FormGroup;

  progressValue = 0;
  status = '';
  orientationHorizontal = false;

  constructor(
    private formBuilder: FormBuilder,
    private alloyDialogService: AlloyDialogService,
    @Inject(ALLOY_DIALOG_DATA) public data: IAlloyDialogData) {
    this.orientationHorizontal = !data.content.orientVertical;
  }

  ngOnInit() {
    this.overviewFormGroup = this.formBuilder.group({
     // overview: ['', Validators.required]
    });
    this.configureFormGroup = this.formBuilder.group({
      power: ['Power Meter', Validators.required],
      startFreq: ['', Validators.required],
      stopFreq: ['', Validators.required],
      numSteps: ['', Validators.required],
      correctionType: ['VXI-11', Validators.required],
      ipAddress: ['', Validators.required],
      deviceName: ['', Validators.required],
      powerMeterChannel: ['A', Validators.required],
    });
    this.measureFormGroup = this.formBuilder.group({
      complete: ['', Validators.requiredTrue]
    });
    this.saveFormGroup = this.formBuilder.group({
      save: ['', Validators.required]
    });
  }

  async onMeasure() {
    this.status = 'Measurement in progress...';
    for (this.progressValue = 0; this.progressValue < 100; this.progressValue += 10) {
      await this.shimTimer(100);
    }

    this.status = 'Measurement Complete';
    this.measureFormGroup.controls['complete'].setValue(true);
  }

  shimTimer(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  onFinish(data: any) {
    console.log(`data blob: ${JSON.stringify(data)}`);
  }

  onCancel() {
    console.log(`wizard cancelled`);
  }
}
