import Slideshow from "../../src/components/SlideShow_58_3"

describe('Slideshow', () => {
    const images = [
      'https://www.mercedes-benz.com/en/vehicles/mercedes-eq/eqs-suv/_jcr_content/root/verticalgallery_copy/parsys/verticalgalleryitem/image/MQ6-0-image-20220419101504/01-mercedes-benz-the-new-eqs-suv-x296-2021-1080x1350.jpeg',
      'https://www.mercedes-benz.com/en/vehicles/mercedes-eq/eqs-suv/_jcr_content/root/verticalgallery_copy/parsys/verticalgalleryitem_546277676/image/MQ6-0-image-20220819111550/02-mercedes-benz-the-new-eqs-suv-x296-2021-1680x1680.jpeg',
      'https://www.mercedes-benz.com/en/vehicles/mercedes-eq/eqs-suv/_jcr_content/root/verticalgallery_copy/parsys/verticalgalleryitem_354875624/image/MQ6-0-image-20220419101505/03-mercedes-benz-the-new-eqs-suv-x296-2021-1680x1680.jpeg'
    ];
    const interval = 5000; // 5 seconds
  
    //renders Slideshow.js before each test case
    beforeEach(() => {
      cy.mount(<Slideshow />)
    });
  
    //Verify that it should display first image by default
    it('should display first image by default', () => {
      cy.get('img').should('have.attr', 'src', images[0]);
    });
  
    //Verify that it should display the next image after each interval
    it('should display the next image after the interval', () => {
      cy.wait(interval);
      cy.get('img').should('have.attr', 'src', images[1]);
      cy.wait(interval);
      cy.get('img').should('have.attr', 'src', images[2]);
      cy.wait(interval);
      cy.get('img').should('have.attr', 'src', images[0]);
    });
  
    //Verify that it should loop through all images and restart at the beginning
    it('should loop through all images and restart at the beginning', () => {
      for (let i = 0; i < images.length-1; i++) {
        cy.wait(interval);
        cy.get('img').should('have.attr', 'src', images[i+1]);
      }
      cy.wait(interval);
      cy.get('img').should('have.attr', 'src', images[0]);
    });
  });
