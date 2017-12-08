import {
  Input,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { MatDialogRef} from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'alloy-about-box',
  templateUrl: './about-box.html',
  styleUrls: ['./about-box.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AlloyAboutBox implements OnInit {

    /** About box application name */
    private _appName = '';
    
    /** About box content */
    private _content = '';

    /** About box copyright */
    private _copyright = '';
    
    /** About box icon */
    private _iconSource = '';

    /** Keysight Logo */
    private _logoSource = '';

    /** About box title */
    private _title = '';

    /** About box version */
    private _version = '';

  constructor(public dialogRef: MatDialogRef<AlloyAboutBox>) {
  }

  ngOnInit() {
  }
    
    /** About box appName to be shown */
    @Input()
    get appName() { return this._appName; }
    set appName(value: string) {
        this._appName = value;
    }

    /** About box content to be shown */
    @Input()
    get content() { return this._content; }
    set content(value: string) {
        this._content = value;
    }
    
    /** About box copyright to be shown */
    @Input()
    get copyright() { return this._copyright; }
    set copyright(value: string) {
        this._copyright = value;
    }
    
    /** About box icon to be shown */
    @Input()
    get icon() { return this._iconSource; }
    set icon(value: string) {
        this._iconSource = value;
    }

    /** About box title to be shown */
    @Input()
    get title() { return this._title; }
    set title(value: string) {
        this._title = value;
    }

    /** About box version to be shown */
    @Input()
    get version() { return this._version; }
    set version(value: string) {
        this._version = value;
    }

  close() {
    this.dialogRef.close();
  }
}
