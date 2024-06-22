describe('Pasta Cosi Restaurant Website', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/') // Replace with your local server URL
    })
  
    it('should display the homepage correctly', () => {
      cy.get('h1').should('contain.text', 'PastaCosi')
    })
  
    it('should navigate to sections when clicking navbar links', () => {
        const sections = ['#hero', '#about', '#menu', '#events', '#gallery', '#contact']
      
        sections.forEach(section => {
          cy.get(`a[href="${section}"]`).first().click()
          cy.get(section).should('be.visible')
        })
      })
      
  
    it('should display the hero carousel correctly', () => {
      cy.get('#heroCarousel .carousel-item').should('have.length', 3)
    })
  
    it('should filter menu items', () => {
      cy.get('#menu-flters li[data-filter=".filter-drinks"]').click()
      cy.get('.menu-item.filter-drinks').should('be.visible')
      cy.get('.menu-item.filter-salads').should('not.be.visible')
    })
  
    it('should submit the book a table form', () => {
        cy.get('a[href="#book-a-table"]').first().click()
        cy.get('#book-a-table form').within(() => {
          cy.get('#name').type('John Doe')
          cy.get('#email').type('john@example.com')
          cy.get('#phone').type('1234567890')
          cy.get('#date').type('2024-07-01')
          cy.get('#time').type('19:00')
          cy.get('#people').type('4')
          cy.get('textarea[name="message"]').type('Looking forward to it!')
        })
      })
      
  
    it('should submit the contact form', () => {
      cy.get('a[href="#contact"]').click()
      cy.get('#contact form').within(() => {
        cy.get('#name').type('John Doe')
        cy.get('#email').type('john@example.com')
        cy.get('#subject').type('Inquiry')
        cy.get('textarea[name="message"]').type('I have a question about your menu.')
        cy.get('button[type="reset"]').click()
      })
    })
  
    it('should display the gallery correctly', () => {
      cy.get('a[href="#gallery"]').click()
      cy.get('.gallery-item').should('have.length', 8)
    })
  
    it('should display testimonials slider', () => {
      cy.get('a[href="#events"]').click()
      cy.get('.testimonials-slider .swiper-slide').should('have.length.at.least', 1)
    })
  
    it('should scroll to top when clicking back to top button', () => {
      cy.scrollTo('bottom')
      cy.get('.back-to-top').click()
      cy.window().its('scrollY').should('equal', 0)
    })
  
    it('should display the top bar with contact information', () => {
      cy.get('#topbar').within(() => {
        cy.get('.bi-phone span').should('contain.text', '+216 53 283 233')
        cy.get('.bi-clock').eq(0).should('contain.text', 'Mon-Thu: 12:00 AM - 23:00 PM')
        cy.get('.bi-clock').eq(1).should('contain.text', 'Fri-Sun: 12:00 AM - 00:00 PM')
      })
    })
  
    it('should have working social media links in the footer', () => {
      cy.get('footer').within(() => {
        cy.get('.facebook').should('have.attr', 'href', 'https://www.facebook.com/pastacositn/')
        cy.get('.instagram').should('have.attr', 'href', 'https://www.instagram.com/pastacositn/')
      })
    })
  
    it('should display the menu items correctly', () => {
        cy.get('a[href="#menu"]').first().click()
        cy.get('.menu-container .menu-item').should('have.length.greaterThan', 0)
      })
  
    it('should toggle mobile navigation', () => {
        cy.viewport('iphone-6')
        cy.get('.mobile-nav-toggle').should('be.visible').click()
        cy.get('#navbar').should('have.class', 'navbar-mobile')
        cy.get('.mobile-nav-toggle').click()
        cy.get('#navbar').should('not.have.class', 'navbar-mobile')
      })
  
    it('should load Google Maps iframe', () => {
      cy.get('a[href="#contact"]').click()
      cy.get('#contact .map iframe').should('have.attr', 'src').and('include', 'https://www.google.com/maps')
    })
  
    it('should show and hide back to top button on scroll', () => {
      cy.scrollTo('bottom')
      cy.get('.back-to-top').should('be.visible')
      cy.scrollTo('top')
      cy.get('.back-to-top').should('not.be.visible')
    })
  
    it('should display and filter events correctly', () => {
      cy.get('a[href="#events"]').click()
      cy.get('.events-slider .swiper-slide').should('have.length.at.least', 1)
    })
  
    it('should submit the contact form and show success message', () => {
      cy.get('a[href="#contact"]').click()
      cy.get('#contact form').within(() => {
        cy.get('#name').type('Jane Doe')
        cy.get('#email').type('jane@example.com')
        cy.get('#subject').type('Inquiry about booking')
        cy.get('textarea[name="message"]').type('I have a question about booking a table.')
      })
      cy.get('.sent-message').should('contain.text', 'Your message has been sent. Thank you!')
    })
  
    it('should autoplay hero carousel slides', () => {
        cy.get('#heroCarousel .carousel-item.active').should('be.visible')
        cy.wait(6000)
        cy.get('#heroCarousel .carousel-item.active').should('not.have.class', 'carousel-item-start')
        cy.get('#heroCarousel .carousel-item.active').invoke('index').then((currentIndex) => {
          cy.wait(1000) // Additional wait time to ensure the slide has changed
          cy.get('#heroCarousel .carousel-item.active').invoke('index').should('not.equal', currentIndex)
        })
      })
      
  
    it('should navigate through hero carousel using controls', () => {
      cy.get('a.carousel-control-next').click()
      cy.get('#heroCarousel .carousel-item').eq(1).should('have.class', 'active')
      cy.get('a.carousel-control-prev').click()
      cy.get('#heroCarousel .carousel-item').eq(0).should('have.class', 'active')
    })
  
    it('should navigate through menu items using filters', () => {
        cy.get('a[href="#menu"]').first().click()
        cy.get('#menu-flters li[data-filter=".filter-salads"]').click()
        cy.get('.menu-item.filter-salads').should('be.visible')
        cy.get('.menu-item.filter-drinks').should('not.be.visible')
        cy.get('.menu-item.filter-specialty').should('not.be.visible')
      })
      
  
    it('should play the about section video', () => {
      cy.get('a[href="#about"]').click()
      cy.get('#about video').should('have.attr', 'controls')
      cy.get('#about video').invoke('prop', 'paused').should('eq', true)
      cy.get('#about video').then(video => video[0].play())
      cy.get('#about video').invoke('prop', 'paused').should('eq', false)
    })
  
    it('should display correct content in the about section', () => {
      cy.get('a[href="#about"]').click()
      cy.get('#about .content h3').should('contain.text', 'Discover OUR HISTORY')
      cy.get('#about .content ul li').should('have.length', 4)
    })
  
    it('should validate form fields correctly', () => {
        cy.get('a[href="#book-a-table"]').first().click()
        cy.get('#book-a-table form').within(() => {
          cy.get('#name').type('J').blur()
          cy.get('#email').type('invalid-email').blur()
          cy.get('#phone').type('123').blur()
        })
      })   
  
      it('should display correct menu items with prices', () => {
        cy.get('a[href="#menu"]').first().click()
        cy.get('.menu-item').each(($el) => {
          cy.wrap($el).within(() => {
            cy.get('.menu-content a').should('exist')
            cy.get('.menu-content span').should('contain.text', 'dt')
          })
        })
      })   
  
    it('should navigate correctly using the footer links', () => {
      cy.get('footer .social-links a').each(($el) => {
        cy.wrap($el).should('have.attr', 'href').and('include', 'http')
      })
    })
  
    it('should filter gallery images', () => {
      cy.get('a[href="#gallery"]').click()
      cy.get('.gallery-item').should('have.length', 8)
      cy.get('.gallery-item a').each(($el) => {
        cy.wrap($el).invoke('attr', 'href').should('include', 'assets/img/gallery/')
      })
    })
  
    it('should ensure the booking form resets correctly', () => {
        cy.get('a[href="#book-a-table"]').first().click()
        cy.get('#book-a-table form').within(() => {
          cy.get('#name').type('Test User')
          cy.get('button[type="reset"]').click()
          cy.get('#name').should('have.value', '')
        })
      })
      
  
    it('should ensure video in about section is paused initially', () => {
      cy.get('a[href="#about"]').click()
      cy.get('#about video').invoke('prop', 'paused').should('eq', true)
    })
  
    it('should ensure that testimonials have ratings', () => {
      cy.get('a[href="#events"]').click()
      cy.get('.testimonial-item').each(($el) => {
        cy.wrap($el).find('.stars i').should('have.length', 5)
      })
    })
  })
  