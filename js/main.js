'use strict'
console.log('Starting up');

function renderPortfolioRows() {

    var elPortfolio = document.querySelector('.row-cards')
    console.log('elPortfolio',elPortfolio);
    var subjects = ['Threads', 'Explore', 'Finish', 'Lines', 'Southwest', 'Window']
    var portfolioStr = ''
    var modalStr = ''
    for (var i = 0; i < subjects.length; i++) {

        portfolioStr += `
        <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${i + 1}">
        <div class="portfolio-hover">
        <div class="portfolio-hover-content">
        <i class="fa fa-plus fa-3x"></i>
        </div>
        </div>
        <img class="img-fluid" src="img/portfolio/0${i + 1}-full.jpeg" alt="">
        </a>
        <div class="portfolio-caption">
        <h4>${subjects[i]}</h4>
        <p class="text-muted">Illustration</p>
        </div>
        </div>
        `
        modalStr = `
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
              <div class="lr">
                <div class="rl"></div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-lg-8 mx-auto">
                  <div class="modal-body">
                    <!-- Project Details Go Here -->
                    <h2>Project Name</h2>
                    <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                    <img class="img-fluid d-block mx-auto" src="img/portfolio/0${i+1}-full.jpeg" alt="">
                    <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est
                      blanditiis
                      dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae
                      cupiditate,
                      maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                    <ul class="list-inline">
                      <li>Date: January 2017</li>
                      <li>Client: ${subjects[i]}</li>
                      <li>Category: Illustration</li>
                    </ul>
                    <button class="btn btn-primary" data-dismiss="modal" type="button">
                      <i class="fa fa-times"></i>
                      Close Project</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
        document.querySelector(`#portfolioModal${i + 1}`).innerHTML = modalStr
    }
    // console.log('portfolioStr',portfolioStr);
    elPortfolio.innerHTML = portfolioStr
}