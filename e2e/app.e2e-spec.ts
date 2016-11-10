import { VehiclesPage } from './app.po';

describe('vehicles App', function() {
  let page: VehiclesPage;

  beforeEach(() => {
    page = new VehiclesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
