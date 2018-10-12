/*
 * Copyright Keysight Technologies, All Rights Reserved
 * Keysight Confidential
 */
import { InjectionToken, ValueProvider } from '@angular/core';

export const ALLOY_DIALOG_DATA = new InjectionToken<any>('AlloyDialogData'); // tslint:disable-line:no-any

export const DialogDataProvider: ValueProvider = { provide: ALLOY_DIALOG_DATA, useValue: ALLOY_DIALOG_DATA };
