import { AngularHookSrcPage } from './app.po';

describe('angular-hook-src App', function() {
  let page: AngularHookSrcPage;

  beforeEach(() => {
    page = new AngularHookSrcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
