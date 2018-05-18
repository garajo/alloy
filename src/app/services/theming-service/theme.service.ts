/*
 * Copyright Keysight Technologies, All Rights Reserved
 * Keysight Confidential
 */
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';

// Would love to just use the native support for enums
// World claims that typescript 2.4+ supports it but most people aren't getting it to work unless they go to Angular 5
// https://github.com/dherges/ng-packagr/issues/206
// export enum AlloyThemes {
//     Light = 'light',
//     Dark = 'dark'
// }

// Workaround to simulate string enums until they actually work
export type AlloyThemes = 'light' | 'dark';
export const AlloyThemes = {
    Light: 'light' as AlloyThemes,
    Dark: 'dark' as AlloyThemes
};



@Injectable()
export class AlloyThemingService {

    private renderer: Renderer2;

    /** The current theme. Use the subject as the backing variable  */
    public themeSubject = new BehaviorSubject<AlloyThemes>(AlloyThemes.Dark);

    // Use of this RendererFactory2 allows us to access the DOM even from this the injected service from some other consuming module
    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    /** Get the active theme name */
    public get theme(): AlloyThemes { return this.themeSubject.getValue(); }

    /** Set the active theme name */
    public set theme(value: AlloyThemes) {

        switch (value) {
            case AlloyThemes.Dark:
                // I know it looks strange. The Dark theme is declared by the absence of the 'light' class on the body tag
                this.renderer.removeClass(document.body, AlloyThemes.Light);
                break;

            case AlloyThemes.Light:
                this.renderer.addClass(document.body, AlloyThemes.Light);
                break;

            default:
                console.warn('Warning: Did not recognize the requested theme "' + this.theme + '". Retaining the existing theme.');
                return;
        }

        this.themeSubject.next(value);
    }

    public toggleTheme(): void {

        switch (this.theme) {
            case AlloyThemes.Dark:
                this.theme = AlloyThemes.Light;
                break;

            case AlloyThemes.Light:
                this.theme = AlloyThemes.Dark;
                break;

            default:
                console.warn('Warning: Did not recognize the target theme "' + this.theme + '" used to toggle the color theme.' );
                return;

        }
    }

    public onThemeChange(): Observable<AlloyThemes> {

        return this.themeSubject.asObservable();
    }

}
