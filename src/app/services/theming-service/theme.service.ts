/*
 * Copyright Keysight Technologies, All Rights Reserved
 * Keysight Confidential
 */
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Subject } from 'rxjs/Subject';

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

    /** The current theme  */
    private _theme: AlloyThemes;
    private renderer: Renderer2;
    public onThemeChanged = new Subject<AlloyThemes>();

    // Use of this RendererFactory2 allows us to access the DOM even from this the injected service from some other consuming module
    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);

        this.theme = AlloyThemes.Dark;
    }

    /** Get the active theme name */
    public get theme(): AlloyThemes { return this._theme; }

    /** Set the active theme name */
    public set theme(value: AlloyThemes) {

        this._theme = value;

        if (this._theme === AlloyThemes.Dark) {
            // I know it looks strange. The Dark theme is declared by the absence of the 'light' class on the body tag
            this.renderer.removeClass(document.body, AlloyThemes.Light);
        } else if (this._theme === AlloyThemes.Light) {
            this.renderer.addClass(document.body, AlloyThemes.Light);
        } else {
            console.log('Did not recognize the requested theme');
        }

        this.notifyOnThemingChanged(value);
    }

    public toggleTheme(): void {

        if (this.theme === AlloyThemes.Dark) {
            this.theme = AlloyThemes.Light;
        } else if (this.theme === AlloyThemes.Light) {
            this.theme = AlloyThemes.Dark;
        } else {
            console.log('Internal error: Did not recognize the theme ' + this.theme );
        }
    }

    public notifyOnThemingChanged(theme: AlloyThemes): void {
        this.onThemeChanged.next(theme);
    }

}
