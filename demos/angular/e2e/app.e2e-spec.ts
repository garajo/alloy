import { AngularLayoutAppPage } from './app.po';

describe('angular-layout-app App', () => {
  let page: AngularLayoutAppPage;

  beforeEach(() => {
    page = new AngularLayoutAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
